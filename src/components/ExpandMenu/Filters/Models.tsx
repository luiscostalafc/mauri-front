/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { api } from '../../../services/API/index';

type Options = {
  value: string | number | readonly string[] | undefined;
  label: string;
};

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NAME = 'model';
const LABEL = 'Modelo';
export default function Models({
  automaker,
  onChange,
  defaultValue,
  ...props
}: any) {
  const classes = useStyles();
  const [state, setState] = useState([] as Options[]);
  const [defaultIndex, setDefaultIndex] = useState('');

  useEffect(() => {
    async function fetch() {
      const query = automaker
        ? {
            name: NAME,
            restrictions: [
              { name: 'automaker', operator: '=', value: automaker },
            ],
          }
        : { name: NAME };
      const { data } = await api.post('api/products/distinct', query);
      if (data?.data) setState(data.data as Options[]);
    }
    fetch();
  }, [automaker]);

  useEffect(val => {
    if (!state?.length) {
      setDefaultIndex('');
      return;
    }
    const index = state.findIndex(({ value }) => value === val);
    setDefaultIndex(index !== -1 ? index : '');
    return;
  }, []);

  const defaultOptions = () => {
    <MenuItem value={''}>Sem Opções</MenuItem>;
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel
        style={{
          minWidth: 110,
          display: 'flex',
        }}
      >
        {LABEL}
      </InputLabel>
      <Select
        name={NAME}
        defaultValue={defaultIndex}
        rows={false}
        onChange={onChange}
        {...props}
      >
        {!!state?.length
          ? state.map(({ value, label }, index) => (
              <MenuItem key={index} value={value}>
                {label}
              </MenuItem>
            ))
          : defaultOptions()}
      </Select>
    </FormControl>
  );
}
