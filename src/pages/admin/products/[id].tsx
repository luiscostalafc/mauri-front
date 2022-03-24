/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  InputGroup,
  InputLeftAddon,
  Flex,
  Box
} from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import Template from '../../../components/Admin';
import AdminMenu from '../../../components/Admin/Menu';
import Bread from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import { updateToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
// import { get, put } from '../../../services/API';
import { api } from '../../../services/API/index';
import { validateForm, validationErrors } from '../../../services/validateForm';
import { translate } from '../../../utils/translater';

interface FormData {
  inactive: boolean;
  group_id: number;
  subgroup_id: number;
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

const schema = Yup.object().shape({
  group_id: Yup.string().required('Grupo é obrigatório'),
  subgroup_id: Yup.string().required('Sub Grupo obrigatório'),
});

const moduleName = '/api/products';
export default function Create() {
  const router = useRouter();
  const { id } = router.query;
  const [fields, setFields] = useState([])

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (id) {
      api
        .get(`${moduleName}/${id}`)
        .then(({ data }) => {
          const fields = Object.entries(data).map(([key, value]) => ({ [key]: typeof (value), value }))
          setFields(fields)
          formRef.current?.setData(data as Record<string, unknown>)
        },
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
    [router, addToast, id],
  );
  const breads = [
    { href: 'products', label: 'Produtos lista' },
    { href: '#', label: 'Produtos editar' },
  ];
  return (
    <Template slider={<AdminMenu />} group={<></>}>
      <Form style={{ width: '95%' }} ref={formRef} onSubmit={handleSubmit}>
        <Bread admin breads={breads} />
        <Heading>Produtos</Heading>
        <Flex wrap={'wrap'}>
          {fields.map(item => {
            const key = Object.keys(item)[0]
            const [datatype, value] = Object.values(item)
            if (key === 'id') return null
            switch (datatype) {
              case 'string': {
                return (
                  <InputGroup mt={2} ml={2} flexGrow={1}>
                    <InputLeftAddon children={translate(key)} />
                    <Input name={key} type={datatype} defaultValue={value} />
                  </InputGroup>
                )
              }
              case "number": {
                return (
                  <NumberInput mt={2} ml={2} defaultValue={value} min={0} max={9999999} flexGrow={1}>
                    <InputLeftAddon children={translate(key)} />
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )
              }

              default: {
                return (
                  <InputGroup mt={2} ml={2} flexGrow={1}>
                    <InputLeftAddon children={translate(key)} />
                    <Input name={key} type={datatype} defaultValue={value} />
                  </InputGroup>
                )
              }

            }

          })}
        </Flex>
        <Button typeColor="create" type="submit">
          Editar
        </Button>
        <Box height={20} />
      </Form>

    </Template>
  );
}
