import 'core-js/es/object/entries';
import "core-js/modules/es.object.from-entries"
import 'core-js/es/promise';
import 'core-js/es/symbol/iterator';
import 'core-js/es/array/find';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV !== 'production') {
  import('react-axe').then(axe => {
    axe.default(React, ReactDOM, 1000);
    ReactDOM.render(
      // <React.StrictMode>
        <App />,
      // </React.StrictMode>,
      document.getElementById('app')
    )
  });
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app')
  )
}

serviceWorker.unregister();