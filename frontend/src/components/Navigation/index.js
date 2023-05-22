import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpModal from '../SignupFormPage/SignUpModal';
import AddBusinessModal from '../Business/AddBusinessModal';
import Search from '../Search/search';
import './Navigation.css';

function Navigation ({ isLoaded}){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
          <div>
            {/* <NavLink to="/create-business" >
              <button className='list-business'>List your business</button>
            </NavLink> */}
            <AddBusinessModal />
            {/* <span>Welcome {sessionUser.username}</span> */}
            <ProfileButton user={sessionUser} />

          </div>
    );}
    else {
        sessionLinks = (
        <div>
            {/* <NavLink to="/demo-user"><button>Demo User</button></NavLink> */}
            <LoginFormModal />
            <SignUpModal />
            {/* <NavLink to="/signup"><button>Sign Up</button></NavLink> */}

        </div>
        );
    }
    return (
      <header>
          <div id='header-original' className='header'>
            <NavLink exact to="/"><img className='img' src="/images/1.jpg" alt='logo'></img></NavLink>
            <Search />
            {isLoaded && sessionLinks}
          </div>
      </header>
      );

}

export default Navigation;
