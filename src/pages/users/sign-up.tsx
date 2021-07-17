/* eslint-disable jsx-a11y/anchor-is-valid */
import { Checkbox, Progress } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FiArrowLeft, FiLock, FiMail, FiTrello, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import { useToast } from '../../hooks/toast';
import { api } from '../../services/API/index';
import { validateForm, validationErrors } from '../../services/validateForm';
import {
  AnimationContainer,
  Background,
  Content,
  // eslint-disable-next-line prettier/prettier
  ImageCart,
} from '../../styles/pages/sign-up';
import { User } from '../../types';

interface SignUpFormData {
  name: string;
  username: string;
  activity: string;
  email: string;
  rg: string;
  cpf_cnpj: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [cpfNumber, setCpfNumber] = useState(true);
  const [check, setChecked] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const router = useRouter();

  const handleOptionDocument = useCallback(() => {
    if (cpfNumber === true) {
      setCpfNumber(false);
      setChecked(true);
    } else {
      setCpfNumber(true);
      setChecked(false);
    }
  }, [cpfNumber]);

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome completo'),
    username: Yup.string().required('Nome de usuário obrigatório'),
    activity: Yup.string().optional(),
    rg: Yup.string().required('Preencha seu RG').max(14),
    cpf_cnpj: Yup.string().required('Preencha o CNPJ ou RG'),
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    password: Yup.string().min(6, 'No mínimo 6 dígitos'),
  });

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      const { hasErrors, toForm, toToast } = await validateForm(schema, data);
      if (hasErrors) {
        formRef.current?.setErrors(toForm);
        toToast.map(({ path, message }) =>
          addToast(validationErrors({ path, message })),
        );
      }

      const { data: response, ok, messageErrors } = await api.post(
        'api/users',
        data,
        { debug: true },
      );

      if (ok) {
        const { id } = response as User;
        const expires = new Date();
        expires.setTime(expires.getTime() + 10 * 1000);
        Cookies.set('@Liconnection:user', JSON.stringify(id), {
          path: '/',
          expires,
        });

        router.push(`phone-sign-up?id=${String(id)}`);

        addToast({
          type: 'success',
          title: 'Dados de usuário preenchidos com sucesso!',
          description: 'Você agora preencherá os dados telefônicos',
        });
      } else {
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [addToast, router, schema],
  );

  return (
    <Container>
      <Row>
        <Col xs={12} md={3} lg={3}>
          <Content>
            <AnimationContainer>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Dados do usuário</h1>

                <Progress
                  margin={5}
                  hasStripe
                  isAnimated
                  value={1}
                  size="sm"
                  color="green"
                />

                <Input name="name" icon={FiUser} placeholder="Nome completo" />
                <Input name="username" icon={FiUser} placeholder="Usuário" />
                <Input
                  name="activity"
                  icon={FiUser}
                  placeholder="Ocupação Profissional"
                />
                <Input name="rg" icon={FiTrello} placeholder="RG" />
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
                    icon={FiTrello}
                    placeholder="CPF"
                  />
                ) : (
                  <InputMask
                    mask="99.999.999/9999-99"
                    name="cpf_cnpj"
                    icon={FiTrello}
                    placeholder="CNPJ"
                  />
                )}

                <Input name="email" icon={FiMail} placeholder="E-mail" />
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
                />

                <Button type="submit">Avançar {'>>'}</Button>
              </Form>
              <Link href="sign-in">
                <a>
                  <FiArrowLeft />
                  Voltar ao login
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

export default SignUp;
