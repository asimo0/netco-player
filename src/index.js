import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Player from './components/Player';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Player />, document.getElementById('root'));
registerServiceWorker();
