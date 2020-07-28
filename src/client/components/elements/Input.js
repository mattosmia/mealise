import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default function Input({ label, type, name, value, isRequired, errorMsg, handleChange, handleBlur }) {
  const inputField = useRef(null);
  const togglePassword = () => {
    inputField.current.type = inputField.current.type === 'password'? 'text' : 'password'
  }

  return (
    <label>
      <span className={(isRequired && 'label--required') || null}>{label}</span>
      <div className="input__wrapper">
        <input type={type || `text`} name={name} value={value} onChange={handleChange} onBlur={handleBlur} ref={inputField} className={errorMsg && 'input--error'} />
        { type === 'password' && <Button classes="button--icon input__password-toggle" handleClick={togglePassword}><span className="vh">Toggle view password</span></Button> }
      </div>
      <div aria-live="assertive">
        { errorMsg && 
          <span className="input__error-message">{ errorMsg }</span>
        }
      </div>
    </label>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  errorMsg: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};