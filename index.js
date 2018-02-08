import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './styles.less';
import { composeWithDevTools } from 'redux-devtools-extension';

ReactDOM.render((
    <App />                
), document.getElementById('app')); 