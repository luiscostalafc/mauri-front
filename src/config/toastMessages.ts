declare type Types = 'success' | 'error' | 'info';
interface ToastMessage {
  type: Types;
  title: string;
  description?: string;
}

export const validationErrorToast: ToastMessage = {
  type: 'info',
  title: 'Erros no formulário',
  description: 'Corrija os erros para enviar o formulário',
};

export const loadToast = {
  success: {
    type: 'success',
    title: 'Sucesso',
    description: 'carregado com sucesso!',
  } as ToastMessage,
  error: {
    type: 'error',
    title: 'Erro',
    description: 'Erro ao carregar!',
  } as ToastMessage,
};

export const creationToast = {
  success: {
    type: 'success',
    title: 'Sucesso',
    description: 'Inserido com sucesso!',
  } as ToastMessage,
  error: {
    type: 'error',
    title: 'Erro',
    description: 'Erro ao inserir!',
  } as ToastMessage,
};

export const updateToast = {
  success: {
    type: 'success',
    title: 'Sucesso',
    description: 'Atualizado com sucesso!',
  } as ToastMessage,
  error: {
    type: 'error',
    title: 'Erro',
    description: 'Erro ao atualizar!',
  } as ToastMessage,
};

export const deletionToast = {
  success: {
    type: 'success',
    title: 'Sucesso',
    description: 'Apagado com sucesso!',
  } as ToastMessage,
  error: {
    type: 'error',
    title: 'Erro',
    description: 'Erro ao apagar!',
  } as ToastMessage,
};
