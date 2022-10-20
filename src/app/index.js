import React from 'react';
import ReactDOM from 'react-dom';
import { store } from 'redux/store/store';
import { Provider } from 'react-redux';
import App from 'app/App.js';

// style-sheet
import 'app/style/common.css';
import 'app/style/common-font.css';
import 'app/style/font.css';
import 'app/style/common-front.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
