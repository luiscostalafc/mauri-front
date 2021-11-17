import Cookies from 'js-cookie';

export const getUser = () => {
  const user = Cookies.get('@Liconnection:user');
  if (!user) return
  return JSON.parse(user)
}

export const isUserAdmin = (): boolean => {
  const user: any = getUser()
  return Boolean(user?.is_admin)
}

export const getUserId = () => {
  const user: any = getUser()
  return user?.id
}

export const updateToken = (id: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 10 * 1000);
  Cookies.set('@Liconnection:user', JSON.stringify(id), {
    path: '/',
    expires,
  });
}