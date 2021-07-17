/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import AdminMenu from '../../../components/AdminMenu';
import Bread from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import InputToogle from '../../../components/InputToogle';
import Template from '../../../components/Template';
import { creationToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
// import { post } from '../../../services/API';
import { api } from '../../../services/API/index';
import { validateForm, validationErrors } from '../../../services/validateForm';

interface FormData {
  delivery: string;
  inactive: boolean;
}

const schema = Yup.object().shape({
  delivery: Yup.string().required('Entrega é obrigatória'),
});

const moduleName = 'deliveries';
export default function Create() {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const router = useRouter();

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
    { href: 'deliveries', label: 'Entregas lista' },
    { href: '#', label: 'Entregas criar' },
  ];
  return (
    <Template
      content={
        <Form style={{ width: '80vh' }} ref={formRef} onSubmit={handleSubmit}>
          <Bread admin breads={breads} />
          <h1>Entregas</h1>
          <Input name="delivery" placeholder="Entrega" />
          <InputToogle name="inactive" placeholder="Inativo" />
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
