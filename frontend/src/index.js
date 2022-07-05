import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App';
import BusinessDetail from './components/Business/BusinessDetail';
import DemoLogin from "./components/LoginFormModal/Demo";
import SignupFormPage from "./components/SignupFormPage";
import AddBusiness from "./components/Business/AddBusiness";
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import * as businessActions from './store/business'
const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.businessActions = businessActions;
}

function Root() {
  return (
    <ReduxProvider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <App />
            </Route>
            <Route path='/demo-user'>
              <DemoLogin />
            </Route>
            <Route path='/businesses/:businessId'>
              <BusinessDetail />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/create-business">
              <AddBusiness />
            </Route>
          </Switch>
        </BrowserRouter>
      </ModalProvider>
    </ReduxProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
