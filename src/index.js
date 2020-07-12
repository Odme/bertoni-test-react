import React from 'react';
import ReactDOM from 'react-dom';
import {
  applyMiddleware,
  compose as reduxCompose,
  createStore,
  combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import taskReducer from './store/reducer';
import App from './App';
import * as serviceWorker from './serviceWorker';

let compose;
if (process.env.REACT_APP_NODE_ENV === 'dev') {
  compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;
} else {
  compose = reduxCompose;
}

const rootReducer = combineReducers({
  tasks: taskReducer,
});

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk)),
);

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
