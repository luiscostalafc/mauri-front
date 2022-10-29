import Cookies from 'js-cookie';

declare interface Headers {
  Accept: string;
  'Content-Type': 'application/json' | 'multipart/form-data';
  Authorization: string | null;
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: null,
} as Headers;

function getToken(): string | null {
  const token = Cookies.get('@Liconnection:token');
  return token ? `Bearer ${String(token)}` : null;
}

export function setHeaders(file = false): Headers {
  headers['Content-Type'] = file ? 'multipart/form-data' : 'application/json';
  headers.Authorization = getToken();
  return headers;
}

export function getBaseURL(): string {
  return process.env.BACKEND_URL
}
export const getCompleteURL = (URL: string): string => {
  const cleanURL = URL.charAt(0) === '/' ? URL.slice(1, URL.length) : URL;
  return `${getBaseURL()}/${cleanURL}`;
};
