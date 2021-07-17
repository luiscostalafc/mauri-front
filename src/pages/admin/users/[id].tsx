/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Checkbox, Heading } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import AdminMenu from '../../../components/AdminMenu';
import Bread from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import InputMask from '../../../components/InputMask';
import InputToogle from '../../../components/InputToogle';
import Template from '../../../components/Template';
// eslint-disable-next-line prettier/prettier
import { updateToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
// import { get, put } from '../../../services/API';
import { api } from '../../../services/API/index';
import { validateForm, validationErrors } from '../../../services/validateForm';

interface FormData {
  name: string;
  username: string;
  activity: string;
  complete_name: string;
  email: string;
  rg: string;
  cpf_cnpj: string;
  nick: string;
  is_provider: boolean;
  inactive: boolean;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  activity: Yup.string().required('Atividade é obrigatória'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  rg: Yup.string().required('RG é obrigatório'),
  cpf_cnpj: Yup.string().required('CPF/CNPJ é obrigatório'),
});

const moduleName = '/api/users';
export default function Edit() {
  const [cpfNumber, setCpfNumber] = useState(true);
  const [check, setChecked] = useState(false);
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

  const handleOptionDocument = useCallback(() => {
    if (cpfNumber === true) {
      setCpfNumber(false);
      setChecked(true);
    } else {
      setCpfNumber(true);
      setChecked(false);
    }
  }, [cpfNumber]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      data.inactive = Boolean(data.inactive);
      data.is_provider = Boolean(data.is_provider);

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
    { href: 'users', label: 'Usuários lista' },
    { href: '#', label: 'Usuários editar' },
  ];
  return (
    <Template
      content={
        <Form style={{ width: '80vh' }} ref={formRef} onSubmit={handleSubmit}>
          <Bread admin breads={breads} />
          <Heading>Usuários</Heading>
          <Input name="name" placeholder="Nome" />
          <Input name="username" placeholder="Username" />
          <Input name="activity" placeholder="Atividade" />
          <Input name="complete_name" placeholder="Nome completo" />
          <Input name="email" placeholder="E-mail" />
          <Input name="rg" placeholder="RG" />
          <Checkbox
            variantColor="green"
            borderColor="#ed8936"
            size="sm"
            onChange={handleOptionDocument}
            defaultIsChecked={check}
          >
            Mudar para CNPJ
          </Checkbox>
          {cpfNumber ? (
            <InputMask
              mask="999.999.999-99"
              name="cpf_cnpj"
              placeholder="CPF"
            />
          ) : (
            <InputMask
              mask="99.999.999/9999-99"
              name="cpf_cnpj"
              placeholder="CNPJ"
            />
          )}
          <Input name="nick" placeholder="Apelido" />
          <InputToogle name="is_provider" placeholder="Fornecedor" />
          <InputToogle name="inactive" placeholder="Inativo" />

          <Button typeColor="create" type="submit">
            Editar
          </Button>
        </Form>
      }
      slider={<AdminMenu />}
      group={<></>}
    />
  );
}
