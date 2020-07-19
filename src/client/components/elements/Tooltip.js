import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default function Tooltip({ children }) {
  const [showcontent, setShowContent] = useState(false);
  return (
    <div className={`tooltip${showcontent? ' show' : ''}`}>
      <Button
        classes="button--icon tooltip__icon"
        handleClick={() => setShowContent(!showcontent)}
      >
        <span className="vh">Help</span>
      </Button>
      <div className="tooltip__content">
        { children }
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired
};