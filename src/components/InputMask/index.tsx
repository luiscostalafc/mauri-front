/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from '@unform/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';
import { Container, Error } from './styles';

interface Props extends InputProps {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const InputMask: React.FC<Props> = ({ name, icon: Icon, style, ...rest }) => {
  const inputRef = useRef<any>(null);

  const [showChild, setShowChild] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef?.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    setShowChild(true);

    registerField({
      name: fieldName,
      ref: inputRef?.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref?.setInputValue(value);
      },
      clearValue(ref: any) {
        ref?.setInputValue('');
      },
    });
  }, [fieldName, registerField, showChild]);
  return (
    <Container
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      style={style}
    >
      {Icon && <Icon size={20} />}

      {showChild && (
        <ReactInputMask
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      )}

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default InputMask;
