/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

export default function DashboardAdminTable({ data, columns, title }: any) {
  const [dataVal, setData] = useState(data);

  const FilterComponent = ({ filterText, onFilter, onClear }: any) => (
    <>
      <TextField
        id="search"
        type="text"
        placeholder="Filtro por nome"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <Button type="button" onClick={onClear}>
        X
      </Button>
    </>
  );

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false,
  );
  const filteredItems = dataVal.filter(
    (item: { name: string }) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e: { target: { value: React.SetStateAction<string> } }) =>
          setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  // const actionsMemo = React.useMemo(() => downloadCSV(data), []);

  return (
    <DataTable
      title={title}
      columns={columns}
      data={filteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      selectableRows
      persistTableHead
    />
  );
}
