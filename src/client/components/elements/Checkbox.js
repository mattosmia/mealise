import React from 'react';
import PropTypes from 'prop-types';

export default function Checkbox({ label, name, isChecked, isRequired, errorMsg, handleChange, handleBlur }) {
  return (
    <label>
      <input type="checkbox" name={name} checked={isChecked} onChange={handleChange} onBlur={handleBlur} className={errorMsg && 'input--error'} />
      <span className={(isRequired && 'label--required') || null}>{label}</span>
      <div aria-live="assertive">
        { errorMsg && 
          <span className="input__error-message">{ errorMsg }</span>
        }
      </div>
    </label>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  isRequired: PropTypes.bool,
  errorMsg: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};