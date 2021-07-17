/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosResponse } from 'axios';
import { redirectIfBadStatus } from './redirect';
import { getCompleteURL, setHeaders } from './request';
import { Response, setResponse } from './response';

declare interface Request {
  silent?: boolean;
  file?: boolean;
  msg?: string;
  debug?: boolean;
  noRedirect?: boolean;
}

const defaultGetRequest: Request = {
  silent: true,
  file: false,
  msg: '',
  debug: false,
  noRedirect: false,
};

const defaultRequest = {
  silent: false,
  file: false,
  msg: '',
  debug: false,
  noRedirect: false,
};

export const api = {
  async get(
    URL: string,
    { silent, debug, msg, noRedirect }: Request = defaultGetRequest,
  ): Promise<Response> {
    const headers = setHeaders();
    const time = Date.now();

    try {
      const response: AxiosResponse = await axios.get(getCompleteURL(URL), {
        headers,
      });
      return setResponse(response, { time, debug, silent, msg });
    } catch (e) {
      redirectIfBadStatus(e.response.status, noRedirect);
      return setResponse(e.response, { time, debug, silent, msg });
    }
  },

  async post(
    URL: string,
    data: unknown,
    { silent, debug, msg, file, noRedirect }: Request = defaultRequest,
  ): Promise<Response> {
    const headers = setHeaders(file);
    const time = Date.now();

    try {
      const response: AxiosResponse = await axios.post(
        getCompleteURL(URL),
        data,
        { headers },
      );
      return setResponse(response, { time, debug, silent, msg });
    } catch (e) {
      redirectIfBadStatus(e.response.status, noRedirect);
      return setResponse(e.response, { time, debug, silent, msg });
    }
  },

  async put(
    URL: string,
    data: unknown,
    { silent, debug, msg, noRedirect }: Request = defaultRequest,
  ): Promise<Response> {
    const headers = setHeaders();
    const time = Date.now();

    try {
      const response: AxiosResponse = await axios.put(
        getCompleteURL(URL),
        data,
        { headers },
      );
      return setResponse(response, { time, debug, silent, msg });
    } catch (e) {
      redirectIfBadStatus(e.response.status, noRedirect);
      return setResponse(e.response, { time, debug, silent, msg });
    }
  },

  async delete(
    URL: string,
    { silent, debug, msg, noRedirect }: Request = defaultRequest,
  ): Promise<Response> {
    const headers = setHeaders();
    const time = Date.now();

    try {
      const response: AxiosResponse = await axios.delete(getCompleteURL(URL), {
        headers,
      });
      return setResponse(response, { time, debug, silent, msg });
    } catch (e) {
      redirectIfBadStatus(e.response.status, noRedirect);
      return setResponse(e.response, { time, debug, silent, msg });
    }
  },
};
