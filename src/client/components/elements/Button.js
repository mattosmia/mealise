import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, handleClick, isDisabled, classes }) {
  return (
    <button className={classes} onClick={handleClick} disabled={isDisabled}>
      { children }
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  classes: PropTypes.string
};