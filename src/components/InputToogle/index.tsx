/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormLabel, Switch } from '@chakra-ui/core';
import { useField } from '@unform/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

const InputToogle: React.FC<any> = ({
  name,
  icon: Icon,
  placeholder,
  size,
  color,
  style,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      style={style}
    >
      {Icon && <Icon size={20} />}
      {placeholder && (
        <FormLabel htmlFor="email-alerts">{placeholder}</FormLabel>
      )}
      <Switch
        size={size || 'md'}
        color={color || 'teal'}
        value={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default InputToogle;
