/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const NAME = 'chassi'
const LABEL = 'Chassi/Placa'
export default function Chassi(props: any) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <TextField label={LABEL} name="chassi" onChange={props.onChange}/>
    </FormControl> 
  )
}
