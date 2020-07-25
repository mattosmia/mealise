import React, { useEffect, createContext } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

// credit: https://codepen.io/siffogh/pen/gOaXvyQ
// with tweaks to make it work with mealise

const modalContext = createContext();
const selectableElements = 'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select';

export default function Modal({ children, onModalClose }) {
  const modalRef = React.createRef();

  useEffect(() => {
    const focusableModalElements = modalRef.current.querySelectorAll(selectableElements);
    const firstElement = focusableModalElements[0];
    if (firstElement) {
      firstElement.focus()
    }
  }, [])

  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }

    document.addEventListener("keydown", keyListener, true);

    return () => document.removeEventListener("keydown", keyListener, true);
  }, []);

  const handleTabKey = e => {
      const focusableModalElements = modalRef.current.querySelectorAll(selectableElements);
      const firstElement = focusableModalElements[0];
      const lastElement = focusableModalElements[focusableModalElements.length - 1];
      
      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        return e.preventDefault();
      }

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        return e.preventDefault();
      }
  };

  const keyListenersMap = new Map([[27, onModalClose], [9, handleTabKey]]);

  return createPortal(
      <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__wrapper" ref={modalRef}>
          <modalContext.Provider value={{ onModalClose }}>
          {children}
          </modalContext.Provider>
      </div>
      </div>,
      document.body
  );
}