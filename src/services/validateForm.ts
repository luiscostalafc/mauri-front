/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable consistent-return */
import { Schema, ValidationError } from 'yup';
import { ToastMessage } from '../hooks/toast';

type Errors = {
  [key in string | number]: string;
};

type Error = {
  path: string;
  message: string;
};

interface ValidationResponse {
  toToast: Errors[];
  toForm: Record<string, string>;
  hasErrors: boolean;
}

function getValidationErrors(err: ValidationError): ValidationResponse {
  const toToast: Errors[] = [];
  const toForm: Record<string, string> = {};

  err.inner.forEach(({ path, message }: Error) => {
    toToast.push({ path, message });
    toForm[(path as unknown) as string] = message;
  });

  return { toToast, toForm, hasErrors: true };
}

export async function validateForm(
  schema: Schema<any>,
  data: any,
): Promise<ValidationResponse> {
  try {
    await schema.validate(data, {
      abortEarly: false,
    });
    return { toToast: [], toForm: {}, hasErrors: false };
  } catch (error) {
    if (error instanceof ValidationError) {
      return getValidationErrors(error);
    }
  }
  return { toToast: [], toForm: {}, hasErrors: false };
}

export const validationErrors = ({
  path,
  message,
}: Error): Omit<ToastMessage, 'id'> => ({
  type: 'error',
  title: path,
  description: message,
});
