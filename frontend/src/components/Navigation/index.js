import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';


function Navigation ({ isLoaded}){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
          <>
            <NavLink to="/create-business" >
              <button>List your business</button>
            </NavLink>
            <ProfileButton user={sessionUser} />

          </>
    );}
    else {
        sessionLinks = (
        <>
            <LoginFormModal />
            <NavLink to="/signup"><button>Sign Up</button></NavLink>

        </>
        );
    }
    return (
        <ul>
          <li>
            <NavLink exact to="/">Home</NavLink>
            {isLoaded && sessionLinks}
          </li>
        </ul>
      );

}

export default Navigation;
