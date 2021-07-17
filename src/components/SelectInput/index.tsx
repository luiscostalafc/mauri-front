/* eslint-disable no-param-reassign */
import { CSSProperties } from '@material-ui/styles/index';
import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
  StylesConfig,
  Theme
} from 'react-select';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const SelectInput: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  const colourStyles: StylesConfig<OptionTypeBase, boolean> = {
    control: (styles: CSSProperties) => ({
      ...styles,
      borderRadius: 10,
      borderColor: '#a0aec0',
      fontSize: 18,
      height: 62,
      width: 200,
      marginTop: 7,
      paddingRight: 5,
    }),
    option: (styles: CSSProperties) => ({
      ...styles,
      color: '#F4EDE8',
    }),
  };

  const themeProps = (theme: Theme): Theme => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#F6AD55',
        neutral0: '#a0aec0',
        primary25: '#a0aec0',
        primary50: '#999591',
        neutral80: '#666360',
        neutral30: '#F6AD55',
      },
    };
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref, value) => {
        ref.state.value = value;
      },
      clearValue: ref => {
        ref.state.value = null;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      styles={colourStyles}
      theme={themeProps}
      maxMenuHeight={250}
      {...rest}
    />
  );
};

export default SelectInput;
