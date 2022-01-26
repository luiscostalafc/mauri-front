import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useToast } from '../hooks/toast';

export default function ResetPassword(): JSX.Element {
  const router = useRouter();
  const { addToast } = useToast();

  const { token, email } = router.query;
  const [pw, setPw] = useState({
    pw: '',
    pw1: '',
  });
  const passwordsMatch = (): boolean => pw.pw === pw.pw1;
  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();

    if (!passwordsMatch() || !pw.pw || !pw.pw1) {
      alert('As senhas fornecidas são diferentes');
    }

    const res = await fetch('http://localhost:3333/change-password', {
      method: 'POST',
      headers: { 'Content-type': 'Application/json' },
      body: JSON.stringify({
        token,
        newPassword: pw.pw,
        email,
      }),
    });

    if (res.ok) {
      addToast({
        title: 'Senha resetada com sucesso',
        description:
          'Agora você será redirecionado e pode acessar o sistema com sua nova senha',
        type: 'success',
      });

      setTimeout(() => router.push('/'), 1500);
    }
  };

  const handleInput = e => {
    const { name, value } = e.target;
    setPw(state => ({
      ...state,
      [name]: value,
    }));
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      d="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Heading fontSize="large">Altere sua senha</Heading>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box marginTop={80}>
          <FormControl>
            <FormLabel htmlFor="password">Nova senha</FormLabel>
            <PasswordInput
              id="password"
              name="pw"
              value={pw.pw}
              onInput={handleInput}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password" marginTop={12}>
              Confirme a senha
            </FormLabel>
            <PasswordInput
              id="password"
              name="pw1"
              value={pw.pw1}
              onInput={handleInput}
            />
          </FormControl>
        </Box>
        <Button
          type="submit"
          bg="orange"
          color="#FFF"
          minWidth="100px"
          minHeight="48px"
          borderRadius={5}
          marginTop={100}
          _hover={{ backgroundColor: '#df7e10' }}
        >
          Salvar
        </Button>
      </form>
    </Box>
  );
}

const PasswordInput = (props): JSX.Element => (
  <Input
    border="1px solid #dedede"
    borderRadius={5}
    height={48}
    marginTop={12}
    paddingLeft={12}
    type="password"
    {...props}
  />
);
