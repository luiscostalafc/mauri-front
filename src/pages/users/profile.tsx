import { Checkbox } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import {
  FiArrowLeft,
  FiCamera,
  FiLock,
  FiMail,
  FiTrello,
  // eslint-disable-next-line prettier/prettier
  FiUser,
} from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { api } from '../../services/API/index';
import { validateForm, validationErrors } from '../../services/validateForm';
import { AvatarInput, Container, Content } from '../../styles/pages/profile';

interface ProfileFormData {
  name: string;
  username: string;
  activity: string;
  rg: string;
  cpf_cnpj: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [cpfNumber, setCpfNumber] = useState(true);
  const [check, setChecked] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const { user, updateUser } = useAuth();

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
    name: Yup.string().required('Nome é obrigatório'),
    username: Yup.string().required('Usuário é obrigatório'),
    activity: Yup.string().required('Atividade Profissional é obrigatório'),
    rg: Yup.string().required('RG é obrigatório'),
    cpf_cnpj: Yup.string().required('CPF ou CNPJ é obrigatório'),
    email: Yup.string()
      .required('E-mail é obrigatório')
      .email('Digite um e-mail válido'),
    old_password: Yup.string(),
    password: Yup.string().when('old_password', {
      is: val => !!val.length,
      then: Yup.string()
        .min(6, 'No mínimo 6 dígitos')
        .required('Campo obrigatório'),
      otherwise: Yup.string(),
    }),
    password_confirmation: Yup.string()
      .when('old_password', {
        is: val => !!val.length,
        then: Yup.string().required('Campo obrigatório'),
        otherwise: Yup.string(),
      })
      .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
  });

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      const { hasErrors, toForm, toToast } = await validateForm(schema, data);
      if (hasErrors) {
        formRef.current?.setErrors(toForm);
        toToast.map(({ path, message }) =>
          addToast(validationErrors({ path, message })),
        );
      }

      const {
        name,
        username,
        activity,
        rg,
        cpf_cnpj,
        email,
        old_password,
        password,
        password_confirmation,
      } = data;

      const formData = {
        name,
        email,
        username,
        activity,
        rg,
        cpf_cnpj,
        ...(old_password
          ? {
              old_password,
              password,
              password_confirmation,
            }
          : {}),
      };

      const { data: response, ok, messageErrors } = await api.put(
        `/users/${user?.id}`,
        formData,
      );
      if (ok) {
        updateUser(response);

        router.push('/');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um error ao atualizar o perfil, tente novamente.',
        });
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [addToast, router, schema, updateUser, user?.id],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.post('/assets', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link href="/">
            <FiArrowLeft size={32} />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          // initialData={{ name: user.name, email: user.email}}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img
              src="https://api.adorable.io/avatars/186/abott@adorable.io.png"
              alt="comentário da imagem"
            />
            <label htmlFor="avatar">
              <FiCamera size={20} />
              <input
                data-testid="input-file"
                type="file"
                id="avatar"
                onChange={handleAvatarChange}
              />
            </label>
          </AvatarInput>

          <h1>Meu Perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
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
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />
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
            placeholder="Confirmar senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
