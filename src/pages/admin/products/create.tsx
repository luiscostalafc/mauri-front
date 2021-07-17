/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Heading } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import AdminMenu from '../../../components/AdminMenu';
import Bread from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Template from '../../../components/Template';
import { creationToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
// import { post } from '../../../services/API';
import { api } from '../../../services/API/index';
import { validateForm, validationErrors } from '../../../services/validateForm';

interface FormData {
  inactive: string;
  group_id: string;
  subgroup_id: string;
  automaker: string;
  model: string;
  year_start: string;
  year_end: string;
  engine: string;
  complement: string;
  quantity_used: string;
  quantity_package: string;
  size: string;
  height: string;
  width: string;
  lenth: string;
  weight: string;
  inner_diameter: string;
  external_diameter: string;
  title: string;
  name: string;
  type: string;
  position: string;
  system: string;
  color: string;
  material: string;
  obs: string;
}

const moduleName = 'products';
const schema = Yup.object().shape({
  group_id: Yup.string().required('Grupo é obrigatório'),
  subgroup_id: Yup.string().required('Sub Grupo obrigatório'),
});

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
    { href: 'products', label: 'Produtos lista' },
    { href: '#', label: 'Produtos criar' },
  ];
  return (
    <Template
      content={
        <Form style={{ width: '80vh' }} ref={formRef} onSubmit={handleSubmit}>
          <Bread admin breads={breads} />
          <Heading size="md">Produtos</Heading>
          <Input name="inactive" placeholder="inactive" />
          <Input name="group_id" placeholder="group_id" />
          <Input name="subgroup_id" placeholder="subgroup_id" />
          <Input name="automaker" placeholder="automaker" />
          <Input name="model" placeholder="model" />
          <Input name="year_start" placeholder="year_start" />
          <Input name="year_end" placeholder="year_end" />
          <Input name="engine" placeholder="engine" />
          <Input name="complement" placeholder="complement" />
          <Input name="quantity_used" placeholder="quantity_used" />
          <Input name="quantity_package" placeholder="quantity_package" />
          <Input name="size" placeholder="size" />
          <Input name="height" placeholder="height" />
          <Input name="width" placeholder="width" />
          <Input name="lenth" placeholder="lenth" />
          <Input name="weight" placeholder="weight" />
          <Input name="inner_diameter" placeholder="inner_diameter" />
          <Input name="external_diameter" placeholder="external_diameter" />
          <Input name="title" placeholder="title" />
          <Input name="name" placeholder="name" />
          <Input name="type" placeholder="type" />
          <Input name="position" placeholder="position" />
          <Input name="system" placeholder="system" />
          <Input name="color" placeholder="color" />
          <Input name="material" placeholder="material" />
          <Input name="obs" placeholder="obs" />

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
