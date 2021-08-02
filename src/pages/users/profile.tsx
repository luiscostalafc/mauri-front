import { Checkbox } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
  FiArrowLeft,
  FiCamera,
  FiLock,
  FiMail,
  FiTrello,
  // eslint-disable-next-line prettier/prettier
  FiUser
} from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import { PROFILE_TOAST } from '../../constants/messages';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { userSchema } from '../../schemas/user';
import { api } from '../../services/API/index';
import { getUser } from '../../services/auth';
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
  const { id } = router.query;

  const { updateUser } = useAuth();
  const user = getUser()
  const idu = user?.id ? user.id : id
  useEffect(() => {
    if (idu) {
      api
        .get(`api/users/${idu}`)
        .then(({ data }) =>
          formRef?.current?.setData(data as Record<string, unknown>),
        );
    }
  }, [idu]);

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
    async (data: ProfileFormData) => {
      const { hasErrors, toForm, toToast } = await validateForm(userSchema, data);
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
        ...user,
        ...(old_password
          ? {
              old_password,
              password,
              password_confirmation,
            }
          : {}),
      };

      const { data: response, ok, messageErrors } = await api.put(
        `api/users/${user?.id}`,
        formData,
      );
      if (ok) {
        updateUser(response);

        router.push('/home');

        addToast(PROFILE_TOAST.SUCCESS);
      } else {
        addToast(PROFILE_TOAST.ERROR);
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [addToast, router, userSchema, updateUser, user],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.post('api/assets', data).then(response => {
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
          <Button onClick={() => window.history.go(-1)} style={{maxWidth: '75px', background: '#6c757d'}}>
            <FiArrowLeft size={32} />
          </Button>
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
