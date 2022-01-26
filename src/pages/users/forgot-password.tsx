/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FiLogIn, FiMail } from 'react-icons/fi';
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

interface ForgotFormData {
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail é obrigatório')
    .email('Digite um e-mail válido'),
});

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotFormData) => {
      const { hasErrors, toForm, toToast } = await validateForm(schema, data);
      if (hasErrors) {
        formRef.current?.setErrors(toForm);
        toToast.map(({ path, message }) =>
          addToast(validationErrors({ path, message })),
        );
        return;
      }

      setLoading(true);

      const { ok, messageErrors } = await api.post('forgot', {
        email: data.email,
      });

      if (ok) {
        setLoading(false);
        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });
      } else {
        setLoading(false);
        addToast({
          type: 'info',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
        });
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Row>
        <Col xs={12} md={3} lg={3}>
          <Content>
            <AnimationContainer>
              <ImageCart src="/liconnection.svg" alt="Logo do site" />

              <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Recuperar senha</h1>
                <Input name="email" icon={FiMail} placeholder="E-mail" />

                <Button loading={loading} type="submit">
                  Recuperar
                </Button>
              </Form>

              <Link href="sign-in">
                <a>
                  <FiLogIn />
                  Voltar ao login
                </a>
              </Link>
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

export default ForgotPassword;
