/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import create from 'zustand';
import { Product } from '../types';

type ProductStore = {
  products: Product[];
  addProduct: (newProduct: Product) => any;
  removeProduct: (id: number) => any;
  increment: (id: number) => any;
  decrement: (id: number) => any;
};

const createIncrementSlice = set => ({
  increment: (id: number) =>
    set(state => ({
      ...state,
      products: state.products.map(product => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity === 0 ? 0 : product.quantity + 1,
          };
        }
        return product;
      }),
    })),
});

const checkIfAlreadyInCart = (newProduct: Product, productIncart: Product) => {
  if (newProduct.id === productIncart.id) {
    return { ...newProduct, quantity: productIncart.quantity + 1 };
  }

  return productIncart;
};

const createAddProductSlice = set => ({
  addProduct: (newProduct: Product) =>
    set(state => ({
      ...state,
      products: state.products.map(p => p.id).includes(newProduct.id)
        ? state.products.map(p => checkIfAlreadyInCart(newProduct, p))
        : [...state.products, { ...newProduct, quantity: 1 }],
    })),
});

const createRemoveSlice = set => ({
  removeProduct: (removeProductId: number) =>
    set(({ products }) => ({
      products: products.filter(p => p.id !== removeProductId),
    })),
});

const createDecrementSlice = set => ({
  decrement: (id: number) =>
    set(state => ({
      ...state,
      products: state.products.map(product => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      }),
    })),
});

export const useCartStore = create<ProductStore>(set => ({
  products: [],
  ...createRemoveSlice(set),
  ...createIncrementSlice(set),
  ...createAddProductSlice(set),
  ...createDecrementSlice(set),
}));
