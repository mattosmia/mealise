import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ label, type, name, handleChange, handleBlur }) {
  return (
    <label>
      <span>{label}</span>
      <input type={type || `text`} name={name} onChange={handleChange} onBlur={handleBlur} />
      <span className="input--error" aria-live="assertive"></span>
    </label>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};