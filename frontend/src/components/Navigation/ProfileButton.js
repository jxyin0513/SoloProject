import React, {useState, useEffect} from "react";
import {useDispatch} from 'react-redux'
import * as sessionActions from '../../store/session';
import './profileButton.css';

function ProfileButton({user}){
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false)

    function openMenu(){
        if(showMenu) return;
        setShowMenu(true)
    }
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
          setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logOutUser());
    };
    return (
        <div className="profile-Outer">
          <button className="profile" onClick={openMenu}>
            <i className="fas fa-user-circle" />
          </button>
          {showMenu && (
            <div className="profile-dropdown">
              <div className="profile-menu">
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div>
                  <button onClick={logout}>Log Out</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

export default ProfileButton;
