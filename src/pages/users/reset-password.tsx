/* eslint-disable no-restricted-globals */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FiLock } from 'react-icons/fi';
// @ts-ignore
import querySearch from 'stringquery';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import { api } from '../../services/API/index';
import { validateForm, validationErrors } from '../../services/validateForm';
import {
  AnimationContainer,
  Background,
  Content,
  Image,
  // eslint-disable-next-line prettier/prettier
  ImageCart,
} from '../../styles/pages/sign-in';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const schema = Yup.object().shape({
  password: Yup.string().required('Senha é obrigatória'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), undefined],
    'Confirmação incorreta',
  ),
});

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      const { hasErrors, toForm, toToast } = await validateForm(schema, data);
      if (hasErrors) {
        formRef.current?.setErrors(toForm);
        toToast.map(({ path, message }) =>
          addToast(validationErrors({ path, message })),
        );
      }

      const { password, password_confirmation } = data;
      const query = querySearch(location.search);
      const token = new URLSearchParams(query).get('token');

      if (!token) {
        addToast(
          validationErrors({
            path: 'Token',
            message: 'Token não encontrado',
          }),
        );
      }

      const { ok, messageErrors } = await api.post('/password/reset', {
        password,
        password_confirmation,
        token,
      });

      if (ok) {
        router.push('/users/login');
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao resetar  senha',
          description: 'Ocorreu um erro ao resetar usa senha, tente novamente',
        });
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [addToast, router],
  );

  return (
    <Container>
      <Row>
        <Col xs={12} md={3} lg={3}>
          <Content>
            <AnimationContainer>
              <ImageCart src="/liconnection.svg" alt="Logo do site" />

              <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Resetar senha</h1>
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="Nova senha"
                />

                <Input
                  name="password_confirmation"
                  icon={FiLock}
                  type="password"
                  placeholder="Confirmação da senha"
                />

                <Button type="submit">Alterar senha</Button>
              </Form>
            </AnimationContainer>
          </Content>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }}>
          <Background>
            <Image src="../home.png" />
          </Background>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
