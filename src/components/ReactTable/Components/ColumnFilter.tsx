import React, { useRef, useState } from 'react';
import { Input } from '@chakra-ui/react';
import { useAsyncDebounce } from 'react-table';

export const ColumnFilter = ({ column }): JSX.Element => {
  const { filterValue, setFilter } = column;
  const [filter, setFilterState] = useState(filterValue);
  const searchRef = useRef<HTMLInputElement>();

  const onChange = useAsyncDebounce(value => {
    setFilter(value || '');
  }, 400);
  return (
    <span>
      <Input
        ref={searchRef}
        onClick={e => e.stopPropagation()}
        rounded="md"
        borderWidth={1}
        px={12}
        py={2}
        borderColor="#79589f"
        borderRadius={8}
        w={180}
        value={filter || ''}
        onChange={e => {
          setFilterState(e.target.value);
          onChange(e.target.value);
          searchRef.current.focus();
        }}
      />
    </span>
  );
};
