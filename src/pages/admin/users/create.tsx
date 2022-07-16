/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-wrap-multilines */
import { Checkbox } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import Template from '../../../components/Admin';
import AdminMenu from '../../../components/Admin/Menu';
import Bread from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import InputMask from '../../../components/InputMask';
import InputToogle from '../../../components/InputToogle';
// eslint-disable-next-line prettier/prettier
import { creationToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
// import { post } from '../../../services/API';
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

const moduleName = 'users';
export default function Create() {
  const [cpfNumber, setCpfNumber] = useState(true);
  const [check, setChecked] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const router = useRouter();

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    activity: Yup.string().required('Atividade é obrigatória'),
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    rg: Yup.string().required('RG é obrigatório'),
    cpf_cnpj: Yup.string().required('CPF/CNPJ é obrigatório'),
  });

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
    [router, schema, addToast],
  );
  const breads = [
    { href: 'users', label: 'Usuários lista' },
    { href: '#', label: 'Usuários criar' },
  ];

  const CustomInput = props => (
    <Input {...props} style={{ width: 400, marginRight: 10 }} />
  );
  return (
    <Template slider={<AdminMenu />} group={<></>}>
      <Bread admin breads={breads} />
      <Form
        style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <CustomInput name="name" placeholder="Nome" />
        <CustomInput name="username" placeholder="Username" />
        <CustomInput name="activity" placeholder="Atividade" />
        <CustomInput name="complete_name" placeholder="Nome completo" />
        <CustomInput name="email" placeholder="E-mail" />
        <CustomInput name="rg" placeholder="RG" />
        <Checkbox
          variantColor="green"
          borderColor="#ed8936"
          style={{ marginLeft: 10, marginRight: 10 }}
          size="sm"
          onChange={handleOptionDocument}
          defaultIsChecked={check}
        >
          Mudar para CNPJ
        </Checkbox>
        <InputMask
          mask={cpfNumber ? '999.999.999-99' : '99.999.999/9999-99'}
          name="cpf_cnpj"
          placeholder={cpfNumber ? 'CPF' : 'CNPJ'}
          style={{ width: 400, marginRight: 10 }}
        />
        <CustomInput name="nick" placeholder="Apelido" />
        <InputToogle
          name="is_provider"
          placeholder="Fornecedor"
          style={{ width: 300, marginRight: 10 }}
        />
        <InputToogle
          name="inactive"
          placeholder="Inativo"
          style={{ width: 300, marginRight: 10 }}
        />

        <Button typeColor="create" type="submit">
          Inserir
        </Button>
      </Form>
    </Template>
  );
}
