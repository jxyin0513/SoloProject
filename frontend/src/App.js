import React, {useState, useEffect} from "react";
import SignupFormPage from "./components/SignupFormPage";
import {Route, Switch} from 'react-router-dom';
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AddBusiness from "./components/Business/AddBusiness";
import AllBusinesses from "./components/Business/getBusinesses";
import BusinessDetail from "./components/Business/BusinessDetail";
import DemoLogin from "./components/LoginFormModal/Demo";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded&&(
    <>
      <Navigation isLoaded={{isLoaded}}/>
      {isLoaded&&
      (<Switch>
        <Route path='/demo-user'>
          <DemoLogin />
        </Route>
        <Route exact path="/">
          <AllBusinesses />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/create-business">
          <AddBusiness />
        </Route>
        <Route path={`/businesses/:businessId`}>
          <BusinessDetail />
        </Route>

      </Switch>
      )}
    </>
  );
}

export default App;
