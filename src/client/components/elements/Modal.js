import React from 'react';
import ReactDOM from 'react-dom';

// credit: https://codepen.io/siffogh/pen/gOaXvyQ

const modalContext = React.createContext();

export default function Modal({ children, onModalClose }) {
  React.useEffect(() => {
    function keyListener(e) {
    const listener = keyListenersMap.get(e.keyCode);
    return listener && listener(e);
    }
    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const modalRef = React.createRef();
  const handleTabKey = e => {
      const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      const firstElement = focusableModalElements[0];
      const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

      if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
      }

      if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
      }
  };

  const keyListenersMap = new Map([[27, onModalClose], [9, handleTabKey]]);

  return ReactDOM.createPortal(
      <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__content" ref={modalRef}>
          <modalContext.Provider value={{ onModalClose }}>
          {children}
          </modalContext.Provider>
      </div>
      </div>,
      document.body
  );
}