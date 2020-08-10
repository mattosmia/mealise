import React from 'react';
import PropTypes from 'prop-types';

export default function Textarea({ label, name, value, isRequired, errorMsg, handleChange, handleBlur }) {
  return (
    <label>
      <span className={(isRequired && 'label--required') || null}>{label}</span>
      <textarea name={name} onChange={handleChange} onBlur={handleBlur} className={errorMsg && 'input--error'} value={value} />
      <div aria-live="assertive">
        { errorMsg && 
          <span className="input__error-message">{ errorMsg }</span>
        }
      </div>
    </label>
  )
}

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  errorMsg: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};