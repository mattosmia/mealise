import React from 'react';
import PropTypes from 'prop-types';

export default function SidebarForm({ classes, children }) {
  classes = classes || [];
  classes.push('side-form');
  return (
    <div className={classes.join(' ')}>
      { children }
    </div>
  )
}

SidebarForm.propTypes = {
  classes: PropTypes.array,
  children: PropTypes.element,
};