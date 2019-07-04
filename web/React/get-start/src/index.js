import React from 'react';
import ReactDOM from 'react-dom';
import 'element-theme-default';

import './index.css';
import Router from './router';

// import Render from './start/Render';
// import Api from './start/Api';
// import Life from './start/Life';
// import Ajax from './start/Ajax';

//import * as serviceWorker from './serviceWorker';

ReactDOM.render((
    <Router />
  ), document.getElementById('root'));

//ReactDOM.render(<Bpmn />, document.getElementById('root'));
//ReactDOM.render(<Element />, document.getElementById('element'));
// ReactDOM.render(<Render />, document.getElementById('render'));
// ReactDOM.render(<Api />, document.getElementById('api'));
// ReactDOM.render(<Life />, document.getElementById('life'));
// ReactDOM.render(<Ajax />, document.getElementById('ajax'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

