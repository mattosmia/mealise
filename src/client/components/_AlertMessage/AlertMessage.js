import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './AlertMessage.scss';

export default function AlertMessage({ children }) {    
    return (
      <div className="alert-message" role="alert">
      { children }
      </div>
    )
  }