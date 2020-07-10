import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ label, type, name, value, errorMsg, handleChange, handleBlur }) {
  return (
    <label>
      <span>{label}</span>
      <input type={type || `text`} name={name} value={value} onChange={handleChange} onBlur={handleBlur} className={errorMsg && 'input--error'} />
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
  errorMsg: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};