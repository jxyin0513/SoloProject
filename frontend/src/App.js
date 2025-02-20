import React, {useState, useEffect} from "react";
import SignupFormPage from "./components/SignupFormPage";
import {Route, Routes} from 'react-router-dom';
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
      (<Routes>
        <Route path='/' element={<AllBusinesses />} />
        <Route path='/demo-user' element={<DemoLogin />} />
        <Route path="/signup" element={<SignupFormPage />} />
        <Route path="/create-business" element={<AddBusiness />} />
        <Route path={`/businesses/:businessId`} element={<BusinessDetail />} />
      </Routes>
      )}
    </>
  );
}

export default App;
