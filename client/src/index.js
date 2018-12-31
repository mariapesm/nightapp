import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import { AUTH_USER } from './actions/types';
import reducers from './reducers';
import App from './components/app';
import SignIn from './components/signin';
import SignOut from './components/signout';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(reduxThunk)
));

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path='/:loc?' component={App} />
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signout' component={SignOut} />
          <Redirect from='/' to='/' />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'));
