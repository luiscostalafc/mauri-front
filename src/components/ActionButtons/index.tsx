/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { api } from '../../services/API/index';
import Button from '../Button';

declare interface ActionButtonsInterface {
  editLabel?: string;
  noEdit?: boolean;
  onDelete: Function;
  deleteLabel?: string;
  noDelete?: boolean;
  moduleName: string;
  row: { id: number };
}

const ActionButtons = ({
  moduleName,
  row,
  deleteLabel,
  editLabel,
  noDelete,
  noEdit,
  ...props
}: ActionButtonsInterface): ReactElement<any, any> | null => {
  async function remove(id: number | string): Promise<void> {
    if (confirm('Você tem certeza?')) {
      const { ok } = await api.delete(`${moduleName}/${id}`);
      props.onDelete(ok);
    }
  }

  const router = useRouter();
  return (
    <>
      {!noEdit && (
        <Button
          typeColor="edit"
          onClick={() => router.push(`/admin/${moduleName}/${row.id}`)}
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
