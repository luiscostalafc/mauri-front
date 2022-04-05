/* eslint-disable react/display-name */
import React, { MutableRefObject, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  indeterminate: boolean;
}
export const Checkbox = React.forwardRef(
  (props: Props, ref: MutableRefObject<HTMLInputElement>) => {
    const { indeterminate, ...rest } = props;
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  },
);
