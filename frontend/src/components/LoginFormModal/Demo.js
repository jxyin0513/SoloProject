import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { signInThunk } from "../../store/session";
import { NavLink, Navigate } from "react-router-dom";
import './Demo.css';

function DemoLogin(){
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user)
    if(user){
       return <Navigate to="/" />
    }
    async function onClick(){
        const user={
        credential: "Demo-lition",
        password: "password"
    }
        await dispatch(signInThunk(user))
}

    return (
        <div className="demo-background">
        <div className="demo-outer">
            <p>Wanna Sign in As Demo User?</p>
            <button className="demo-button" onClick={onClick}>Demo User</button>
            <NavLink to="/"><button className="demo-button">Cancel</button></NavLink>

        </div>
        </div>
    )
}
export default DemoLogin;
