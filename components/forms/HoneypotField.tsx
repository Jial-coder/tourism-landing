import { forwardRef, type InputHTMLAttributes } from 'react';

export const HoneypotField = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function HoneypotField(props, ref) {
    return (
      <input
        ref={ref}
        type="text"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        {...props}
      />
    );
  }
);
