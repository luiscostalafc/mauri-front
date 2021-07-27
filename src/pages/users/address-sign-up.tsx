/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Progress } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaCity } from 'react-icons/fa';
import { FiArrowLeft, FiMapPin } from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import { SIGN_IN_ADDRESS_TOAST } from '../../constants/messages';
import { useToast } from '../../hooks/toast';
import { addresSignUpSchema } from '../../schemas/addres-sign-up';
import { api } from '../../services/API/index';
import { getCEPData } from '../../services/apiCep.js';
import { getUserId } from '../../services/auth';
import { validateForm, validationErrors } from '../../services/validateForm';
import {
  AnimationContainer,
  Background,
  Content,
  // eslint-disable-next-line prettier/prettier
  ImageCart
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

const DEFAULT_STATE = {
  cep: '',
  city: '',
  neighborhood: '',
  service: '',
  state: '',
  street: '',
}

const AddressSignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [values, setValues] = useState(DEFAULT_STATE);
  const [paramsState, setParamsState] = useState<any>();

  const { addToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window?.location?.search);
    setParamsState(urlParams);
  }, []);

  const id = paramsState?.get('id') ?? getUserId();

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
      const { hasErrors, toForm, toToast } = await validateForm(addresSignUpSchema(id), data);
      if (hasErrors) {
        formRef.current?.setErrors(toForm);
        toToast.map(({ path, message }) =>
          addToast(validationErrors({ path, message })),
        );
        return
      }
      const userData = { ...data, user_id: id };

      const { ok, messageErrors } = await api.post('api/addresses', userData);

      if (ok) {
        router.push('sign-in');

        addToast(SIGN_IN_ADDRESS_TOAST.SUCCESS);
      } else {
        addToast(SIGN_IN_ADDRESS_TOAST.ERROR);
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [addToast, router, addresSignUpSchema, id],
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
                />

                <Input
                  name="number"
                  icon={FiMapPin}
                  placeholder="Número"
                />

                <Input
                  name="complement"
                  icon={FiMapPin}
                  placeholder="Complemento"
                />

                <Input
                  name="district"
                  icon={FiMapPin}
                  placeholder="Bairro"
                  value={values.neighborhood}
                />

                <Input
                  name="city"
                  icon={FaCity}
                  placeholder="Cidade"
                  value={values.city}
                />

                <Input
                  name="state"
                  icon={FaCity}
                  placeholder="Estado"
                  value={values.state}
                />

                <Button type="submit">Concluir</Button>
              </Form>
              <Link href={`phone-sign-up?${id}`}>
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
