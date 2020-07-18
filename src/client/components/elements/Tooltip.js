import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Tooltip({ children }) {
  const [showcontent, setShowContent] = useState(false);
  return (
    <div className={`tooltip${showcontent? ' show' : ''}`}>
      <button className="tooltip__icon" onClick={() => setShowContent(!showcontent)}>
        <span className="vh">Help</span>
      </button>
      <div  className="tooltip__content">
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