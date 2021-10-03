/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Heading } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import * as Yup from 'yup';
import Template from '../../../components/Admin';
import AdminMenu from '../../../components/Admin/Menu';
import Bread from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import SelectInput from '../../../components/SelectInput';
import { creationToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
// import { get, post } from '../../../services/API';
import { api } from '../../../services/API/index';
import { validateForm, validationErrors } from '../../../services/validateForm';

interface FormData {
  user_id: number;
  provider_id: number;
  order_status_id: number;
  delivery_id: number;
}

interface OrderProps {
  id: string;
  name: string;
  delivery: string;
  order_status: string;
}

const schema = Yup.object().shape({
  user_id: Yup.number().required('Usuário é obrigatório'),
  provider_id: Yup.number().required('Prestador obrigatório'),
  order_status_id: Yup.number().required('Status obrigatório'),
  delivery_id: Yup.number().required('Status obrigatório'),
});

const moduleName = '/api/orders';
export default function Create() {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const router = useRouter();

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
  }, [getDeliveries, getProviders, getStatus, getUsers]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const { hasErrors, toForm, toToast } = await validateForm(schema, data);
      if (hasErrors) {
        formRef.current?.setErrors(toForm);
        toToast.map(({ path, message }) =>
          addToast(validationErrors({ path, message })),
        );
      }

      const { ok, messageErrors } = await api.post(`${moduleName}`, data);
      if (ok) {
        addToast(creationToast.success);
        router.push(`/admin/${moduleName}`);
      } else {
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [router, addToast],
  );
  const breads = [
    { href: 'operations', label: 'Operações lista' },
    { href: '#', label: 'Operações criar' },
  ];
  return (
    <Template
      content={
        <Form
          style={{ maxWidth: '100%' }}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Bread admin breads={breads} />
          <Heading size="md" justifyContent="center">
            Pedidos
          </Heading>

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
            Inserir
          </Button>
        </Form>
      }
      slider={<AdminMenu />}
      group={<></>}
    />
  );
}
