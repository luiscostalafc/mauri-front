import Cookies from 'js-cookie';
import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
  id: string;
  username: string;
  name: string;
  activity: string;
  email: string;
  rg: string;
  cpf_cnpj: string;
  inactive: boolean;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('@Liconnection:token');
    const user = Cookies.get('@Liconnection:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ token, user, expires_in }) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + expires_in * 1000);
    Cookies.set('@Liconnection:token', token, { path: '/', expires });
    Cookies.set('@Liconnection:user', JSON.stringify(user), {
      path: '/',
      expires,
    });

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    Cookies.remove('@Liconnection:token', { path: '/' });
    Cookies.remove('@Liconnection:user', { path: '/' });

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      Cookies.set('@Liconnection:user', JSON.stringify(user), { path: '/' });
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
