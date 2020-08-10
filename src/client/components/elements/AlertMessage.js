import React from 'react';
import './AlertMessage.scss';

export default function AlertMessage({ type, children }) {
    return (
      <div className={`alert-message ${type === 'success' ? 'alert-message--success' : 'alert-message--error'}`} role="alert">
        { children }
      </div>
    )
  }