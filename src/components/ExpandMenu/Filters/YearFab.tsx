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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NAME = 'year_fab'
const LABEL = 'Ano fabricação'
export default function YearFab(props: any) {
  const classes = useStyles();
  const [state, setState] = useState([] as Options[])

  useEffect(() => {
    async function fetch() {
      const query = props.model ? {
        name: NAME,
        restrictions: [
          { name: 'model', operator: '=', value: props.model}
        ]
      } : { name: NAME}
      const { data } = await api.post('api/products/distinct', query)
      if (data?.data) setState(data.data as Options[])
    }
    fetch()
  },[props])

  const defaultOptions = () => {
    <MenuItem value={''}>
      Sem Opções
    </MenuItem>
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{LABEL}</InputLabel>
        <Select
          name={NAME}
          defaultValue={0}
          onChange={props.onChange}
          {...props}
        >
          {state.length ?
            state.map(({ value, label }, index) => (
              <MenuItem key={index} value={value}>
                {label}
              </MenuItem>
            )) :
            defaultOptions()}
        </Select>
    </FormControl>
  );
}
