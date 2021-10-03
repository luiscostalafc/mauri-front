/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { deletionToast } from '../../config/toastMessages';
import { useToast } from '../../hooks/toast';
import { api } from '../../services/API/index';
import Button from '../Button';

declare interface ActionButtonsInterface {
  editLabel?: string;
  noEdit?: boolean;
  onDelete?: (any) => any;
  deleteLabel?: string;
  noDelete?: boolean;
  isAdmin?: boolean;
  moduleName: string;
  row: { id: number };
  props?: any;
}

const ActionButtons = ({
  moduleName,
  row,
  deleteLabel,
  editLabel,
  noDelete,
  noEdit,
  isAdmin,
  ...props
}: ActionButtonsInterface): ReactElement<any, any> | null => {
  const { addToast } = useToast();
  async function remove(id: number | string): Promise<void> {
    if (confirm('Você tem certeza?')) {
      const { ok } = await api.delete(`api/${moduleName}/${id}`);
      if (ok) {
        const { data: state } = await api.get(`api/${moduleName}`);
        addToast(deletionToast.success);
        props.onDelete(state);
      } else {
        addToast(deletionToast.error);
      }
    }
  }

  const router = useRouter();
  return (
    <>
      {!noEdit && (
        <Button
          typeColor="edit"
          onClick={() => router.push(`${isAdmin && "/admin"}/${moduleName}/${row.id}`)}
        >
          {editLabel || 'Editar'}
        </Button>
      )}
      {!noDelete && (
        <Button
          style={{ marginLeft: 5 }}
          typeColor="delete"
          onClick={() => remove(row.id)}
        >
          {deleteLabel || 'Apagar'}
        </Button>
      )}
    </>
  );
};

export default ActionButtons;
