/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Heading } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import Template from '../../../components/Admin';
import AdminMenu from '../../../components/Admin/Menu';
import Bread from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import InputToogle from '../../../components/InputToogle';
// eslint-disable-next-line prettier/prettier
import { updateToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
// import { get, put } from '../../../services/API';
import { api } from '../../../services/API/index';
import { validateForm, validationErrors } from '../../../services/validateForm';

interface FormData {
  delivery: string;
  inactive: boolean;
}

const schema = Yup.object().shape({
  delivery: Yup.string().required('Entrega é obrigatória'),
});

const moduleName = '/api/deliveries';
export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (id) {
      api
        .get(`${moduleName}/${id}`)
        .then(({ data }) =>
          formRef.current?.setData(data as Record<string, unknown>),
        );
    }
  }, [id]);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      data.inactive = Boolean(data.inactive);
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
    [id, router, addToast],
  );
  const breads = [
    { href: 'deliveries', label: 'Entregas lista' },
    { href: '#', label: 'Entregas editar' },
  ];
  return (
    <Template slider={<AdminMenu />} group={<></>}>
      <Form style={{ width: '80vh' }} ref={formRef} onSubmit={handleSubmit}>
        <Bread admin breads={breads} />
        <Heading>Entregas</Heading>
        <Input name="delivery" placeholder="Entrega" />
        <InputToogle name="inactive" placeholder="Inativo" />
        <Button typeColor="create" type="submit">
          Editar
        </Button>
      </Form>
    </Template>
  );
}
