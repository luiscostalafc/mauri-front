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