/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Progress } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaCity } from 'react-icons/fa';
import { FiArrowLeft, FiMapPin } from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import { useToast } from '../../hooks/toast';
import { api } from '../../services/API/index';
import { getCEPData } from '../../services/apiCep.js';
import { validateForm, validationErrors } from '../../services/validateForm';
import {
  AnimationContainer,
  Background,
  Content,
  // eslint-disable-next-line prettier/prettier
  ImageCart,
} from '../../styles/pages/address-sign-up';

interface AddressFormData {
  user_id: string;
  cep: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement: string;
}

const AddressSignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [values, setValues] = useState({
    cep: '',
    city: '',
    neighborhood: '',
    service: '',
    state: '',
    street: '',
  });
  const [paramsState, setParamsState] = useState<any>();

  const { addToast } = useToast();
  const router = useRouter();
  const userId = Cookies?.get('@Liconnection:user');

  useEffect(() => {
    const urlParams = new URLSearchParams(window?.location?.search);
    setParamsState(urlParams);
  }, []);

  const id = paramsState?.get('id') ?? userId;

  const schema = Yup.object().shape({
    user_id: Yup.string().default(id),
    cep: Yup.string().required('Preencha o CEP'),
    state: Yup.string().required('Preencha o UF'),
    city: Yup.string().required('Preencha a cidade'),
    district: Yup.string().required('Preencha o bairro'),
    street: Yup.string().required('Preencha o estado'),
    number: Yup.string().required('Preencha o número ou deixe como s/n'),
    complement: Yup.string(),
  });

  const callCep = async (e: { target: { value: any } }) => {
    const { value } = e.target;
    const cepData = await getCEPData(value);
    if (cepData) {
      const { cep, city, neighborhood, service, state, street } = cepData;
      setValues((prevData: any) => ({
        ...prevData,
        cep,
        city,
        neighborhood,
        service,
        state,
        street,
      }));
    }
  };

  const handleSubmit = useCallback(
    async (data: AddressFormData) => {
      const { hasErrors, toForm, toToast } = await validateForm(schema, data);
      if (hasErrors) {
        formRef.current?.setErrors(toForm);
        toToast.map(({ path, message }) =>
          addToast(validationErrors({ path, message })),
        );
      }
      const userData = { ...data, user_id: id };

      const { ok, messageErrors } = await api.post('api/addresses', userData);

      if (ok) {
        router.push('sign-in');

        addToast({
          type: 'success',
          title: 'Cadastro do realizado com sucesso!',
          description: 'Aguarde a autorização de acesso',
        });
      } else {
        addToast({
          type: 'info',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer seu cadastro. Verifique seus dados e tente novamente.',
        });
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [addToast, router, schema, id],
  );

  return (
    <Container>
      <Row>
        <Col xs={12} md={3} lg={3}>
          <Content>
            <AnimationContainer>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Endereço</h1>

                <Progress
                  margin={5}
                  hasStripe
                  isAnimated
                  value={100}
                  size="sm"
                  color="green"
                />

                <InputMask
                  mask="99999-999"
                  name="cep"
                  icon={FiMapPin}
                  placeholder="CEP"
                  onChange={callCep}
                />

                <Input
                  name="street"
                  icon={FiMapPin}
                  placeholder="Rua"
                  value={values.street}
                  // loading={loading}
                />

                <Input
                  name="number"
                  icon={FiMapPin}
                  placeholder="Número"
                  // loading={loading}
                />

                <Input
                  name="complement"
                  icon={FiMapPin}
                  placeholder="Complemento"
                  // loading={loading}
                />

                <Input
                  name="district"
                  icon={FiMapPin}
                  placeholder="Bairro"
                  value={values.neighborhood}
                  // loading={loading}
                />

                <Input
                  name="city"
                  icon={FaCity}
                  placeholder="Cidade"
                  value={values.city}
                  // loading={loading}
                />

                <Input
                  name="state"
                  icon={FaCity}
                  placeholder="Estado"
                  value={values.state}
                  // loading={loading}
                />

                <Button type="submit">Concluir</Button>
              </Form>
              <Link href="address-sign-up">
                <a>
                  <FiArrowLeft />
                  Voltar aos Dados de contato
                </a>
              </Link>
            </AnimationContainer>
          </Content>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }}>
          <Background>
            <ImageCart src="../cart_no_background.png" />
          </Background>
        </Col>
      </Row>
    </Container>
  );
};

export default AddressSignUp;
