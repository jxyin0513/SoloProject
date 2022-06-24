import React, {useState, useEffect} from "react";
import LoginFormPage from "./components/LoginFromPage";
import SignupFormPage from "./components/SignupFormPage";
import {Route, Switch} from 'react-router-dom';
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded&&(
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>

  );
}

export default App;
