import React from 'react';
import PropTypes from 'prop-types';

export default function Select({ label, name, options, selectedOption, placeholderOption, isRequired, errorMsg, handleChange, handleBlur }) {
  return (
    <label>
      <span className={(isRequired && 'label--required') || null}>{label}</span>
      <select name={name} onChange={handleChange} onBlur={handleBlur} className={errorMsg && 'input--error'} value={selectedOption || ''}>
        { placeholderOption && <option disabled value="">{placeholderOption}</option> }
        { options.map(option => <option key={option._id} value={option._id}>{option.name}</option>) }
      </select>
      <div aria-live="assertive">
        { errorMsg && 
          <span className="input__error-message">{ errorMsg }</span>
        }
      </div>
    </label>
  )
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  selectedOption: PropTypes.string,
  placeholderOption: PropTypes.string,
  isRequired: PropTypes.bool,
  errorMsg: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};