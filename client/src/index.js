import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StateLayer from './StateLayer/StateLayer';


ReactDOM.render(
  <React.StrictMode>
    <StateLayer>
      <App />
    </StateLayer>
  </React.StrictMode>,
  document.getElementById('root')
);

