import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import { useToast } from '../hooks/toast';
import api from '../services/api';
import { Product, Stock } from '../types';
import {
  ADD_PRODUCT_ERROR,
  NOT_IN_STOCK,
  REMOVE_PRODUCT_ERROR,
  UPDATE_QUANTITY_PRODUCT_ERROR,
} from '../constants/messages';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductQuantity {
  productId: number;
  quantity: number | any;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductQuantity: ({
    productId,
    quantity,
  }: UpdateProductQuantity) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = Cookies.get('@Liconnection:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const { addToast } = useToast();

  const prevCartRef = useRef<Product[]>();

  useEffect(() => {
    prevCartRef.current = cart;
  });

  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    if (cartPreviousValue !== cart) {
      Cookies.set('@Liconnection:cart', JSON.stringify(cart));
    }
  }, [cart, cartPreviousValue]);

  const addProduct = async (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productExists = updatedCart.find(
        product => product.id === productId,
      );

      const stock = await api.get<Stock>(`/stock/${productId}`);

      const stockQuantity = stock.data.quantity ?? 0;
      const currentQuantity = productExists ? productExists.quantity : 0;
      const quantity = currentQuantity + 1;

      if (quantity > stockQuantity) {
        addToast(NOT_IN_STOCK);
        return;
      }

      if (productExists) {
        productExists.quantity = quantity;
      } else {
        const product = await api.get(`/products/${productId}`);

        const newProduct = {
          ...product.data,
          quantity: 1,
        };

        updatedCart.push(newProduct);
      }

      setCart(updatedCart);
    } catch (error) {
      addToast(ADD_PRODUCT_ERROR);
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        product => product.id === productId,
      );

      if (productIndex > 0) {
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
      } else {
        throw new Error();
      }
    } catch (error) {
      addToast(REMOVE_PRODUCT_ERROR);
    }
  };

  const updateProductQuantity = async ({
    productId,
    quantity,
  }: UpdateProductQuantity) => {
    try {
      if (quantity <= 0) {
        return;
      }

      const stock = await api.get<Stock>(`/stock/${productId}`);

      const stockQuantity = stock.data.quality ?? 0;

      if (quantity > stockQuantity) {
        addToast(NOT_IN_STOCK);
        return;
      }

      const updatedCart = [...cart];
      const productExists = updatedCart.find(
        product => product.id === productId,
      );

      if (productExists) {
        productExists.quantity = quantity;
        setCart(updatedCart);
      } else {
        throw new Error();
      }
    } catch (error) {
      addToast(UPDATE_QUANTITY_PRODUCT_ERROR);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
