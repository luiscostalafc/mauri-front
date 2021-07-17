/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AxiosResponse } from 'axios';

type Error = {
  path: string;
  message: string;
};

export interface Response {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  status: number;
  returntype: string;
  ok: boolean;
  message: string;
  'data (count)': number;
  time: number;
  data?: any;
  messageErrors: Error[];
}

declare interface Options {
  silent?: boolean;
  debug?: boolean;
  time: number;
  load?: boolean;
  msg?: string;
}

const defaultOptions: Options = {
  silent: false,
  debug: false,
  time: Number(Date.now()),
  load: true,
  msg: '',
};

const getReturnType = (status: number): [string, boolean] =>
  status >= 200 && status < 300 ? ['success', true] : ['error', false];

function getMainDataOfResponse(
  response: AxiosResponse<any>,
  { time, debug }: Options = defaultOptions,
): Response {
  const timeEnd: number = Date.now() - Number(time);
  const [returntype, ok] = getReturnType(response.status);
  const mainData = {
    method: response.config.method,
    path: response.config.url,
    status: response.status,
    returntype,
    ok,
    message: response.statusText,
    'data (count)': response?.data?.length || 0,
    time: timeEnd,
  } as Response;

  if (debug) console.table(mainData);

  mainData.data = response.data;
  mainData.messageErrors = response.data.messageErrors;
  return mainData;
}

export function setResponse(
  response: AxiosResponse,
  { time, debug, silent, msg }: Options = defaultOptions,
): Response {
  delete response.headers.Authorization; // remove token of response

  return getMainDataOfResponse(response, { time, debug, silent, msg });
}
