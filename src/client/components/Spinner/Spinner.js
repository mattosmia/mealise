import React, { useContext } from 'react';
import PageContext from '../../helpers/pageContext';

import './Spinner.scss';

export default function Spinner() {
  const page = useContext(PageContext);
  return (
    <>
    { page.isLoading && 
      <div className="spinner">
        <div className="spinner__image"></div>
      </div>
    }
    </>
  )
}