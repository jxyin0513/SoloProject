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
          <div>
            <NavLink to="/create-business" >
              <button className='list-business'>List your business</button>
            </NavLink>
            {/* <span>Welcome {sessionUser.username}</span> */}
            <ProfileButton user={sessionUser} />

          </div>
    );}
    else {
        sessionLinks = (
        <div>
            <NavLink to="/demo-user"><button>Demo User</button></NavLink>
            <LoginFormModal />
            <NavLink to="/signup"><button>Sign Up</button></NavLink>

        </div>
        );
    }
    return (
      <header>
        <ul>
          <li id='header-original' className='header'>
            <NavLink exact to="/"><img className='img' src="/images/1.jpg" alt='logo'></img></NavLink>
            {isLoaded && sessionLinks}
          </li>
        </ul>
      </header>
      );

}

export default Navigation;
