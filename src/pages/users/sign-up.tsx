/* eslint-disable jsx-a11y/anchor-is-valid */
import { Checkbox, Progress } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiTrello, FiUser } from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import { SIGN_IN_TOAST } from '../../constants/messages';
import { useToast } from '../../hooks/toast';
import { signUpSchema } from '../../schemas/sign-up';
import { api } from '../../services/API/index';
import { updateToken } from '../../services/auth';
import { validateForm, validationErrors } from '../../services/validateForm';
import {
  AnimationContainer,
  Background,
  ImageCart,
  ContainerSignup,
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

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      const { hasErrors, toForm, toToast } = await validateForm(
        signUpSchema,
        data,
      );
      if (hasErrors) {
        formRef.current?.setErrors(toForm);
        toToast.map(({ path, message }) =>
          addToast(validationErrors({ path, message })),
        );
        return;
      }

      const { data: response, ok, messageErrors } = await api.post(
        'api/users',
        data,
      );

      if (ok) {
        const { id } = response as User;
        updateToken(id);

        router.push(`phone-sign-up?id=${String(id)}`);

        addToast(SIGN_IN_TOAST);
      } else {
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [addToast, router, signUpSchema],
  );

  return (
    <ContainerSignup>
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
      <Background>
        <ImageCart src="../cart_no_background.png" />
      </Background>
    </ContainerSignup>
  );
};

export default SignUp;
