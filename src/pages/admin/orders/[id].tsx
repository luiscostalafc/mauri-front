/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-wrap-multilines */
import { Heading } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as Yup from 'yup';
import Template from '../../../components/Admin';
import AdminMenu from '../../../components/Admin/Menu';
import Bread from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import SelectInput from '../../../components/SelectInput';
import { updateToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
// import { get, put } from '../../../services/API';
import { api } from '../../../services/API/index';
import { validateForm, validationErrors } from '../../../services/validateForm';

interface OrderProps {
  id: string;
  name: string;
  delivery: string;
  order_status: string;
}

interface FormData {
  user_id: number;
  provider_id: number;
  order_status_id: number;
  delivery_id: number;
}

const schema = Yup.object().shape({
  user_id: Yup.number().required('Usuário é obrigatório'),
  provider_id: Yup.number().required('Prestador obrigatório'),
  order_status_id: Yup.number().required('Status obrigatório'),
  delivery_id: Yup.number().required('Status obrigatório'),
});

const moduleName = '/api/orders';
export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const formRef = useRef<FormHandles>(null);

  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  const getUsers = useCallback(async () => {
    const response = await api.get('/api/users');
    const data = response.data as OrderProps[];
    const input = data.map((r: OrderProps) => {
      return {
        value: r.id,
        label: r.name,
      };
    });
    setUsers(input as SetStateAction<never[]>);
  }, []);

  const getProviders = useCallback(async () => {
    const response = await api.get('/api/users');
    const data = response.data as OrderProps[];
    const input = data.map((r: OrderProps) => {
      return {
        value: r.id,
        label: r.name,
      };
    });
    setProviders(input as SetStateAction<never[]>);
  }, []);

  const getStatus = useCallback(async () => {
    const response = await api.get('/api/order-statuses');
    const data = response.data as OrderProps[];
    const input = data.map((r: OrderProps) => {
      return {
        value: r.id,
        label: r.order_status,
      };
    });
    setOrderStatus(input as SetStateAction<never[]>);
  }, []);

  const getDeliveries = useCallback(async () => {
    const response = await api.get('/api/deliveries');
    const data = response.data as OrderProps[];
    const input = data.map((r: OrderProps) => {
      return {
        value: r.id,
        label: r.delivery,
      };
    });
    setDeliveries(input as SetStateAction<never[]>);
  }, []);

  useEffect(() => {
    getUsers();
    getProviders();
    getStatus();
    getDeliveries();
    if (id) {
      api
        .get(`${moduleName}/${id}`)
        .then(({ data }) =>
          formRef.current?.setData(data as Record<string, unknown>),
        );
    }
  }, [getDeliveries, getProviders, getStatus, getUsers, id]);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const { hasErrors, toForm, toToast } = await validateForm(schema, data);
      if (hasErrors) {
        formRef.current?.setErrors(toForm);
        toToast.map(({ path, message }) =>
          addToast(validationErrors({ path, message })),
        );
      }

      const { ok, messageErrors } = await api.put(`${moduleName}/${id}`, data);
      if (ok) {
        addToast(updateToast.success);
        router.push(`/admin/${moduleName}`);
      } else {
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [router, addToast, id],
  );
  const breads = [
    { href: 'orders', label: 'Pedidos lista' },
    { href: '#', label: 'Pedidos editar' },
  ];
  return (
    <Template slider={<AdminMenu />} group={<></>}>
      <Form style={{ maxWidth: '100%' }} ref={formRef} onSubmit={handleSubmit}>
        <Bread admin breads={breads} />
        <Heading>Pedidos</Heading>
        <SelectInput name="user_id" placeholder="Usuário" options={users} />
        <SelectInput
          name="provider_id"
          placeholder="Prestador"
          options={providers}
        />
        <SelectInput
          name="order_status_id"
          placeholder="Estatus Ordem"
          options={orderStatus}
        />
        <SelectInput
          name="delivery_id"
          placeholder="Entrega"
          options={deliveries}
        />

        <Button typeColor="create" type="submit">
          Editar
        </Button>
      </Form>
    </Template>
  );
}
