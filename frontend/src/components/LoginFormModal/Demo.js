import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { signInThunk } from "../../store/session";
import { Redirect,Link } from "react-router-dom";
import './Demo.css';

function DemoLogin(){
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user)
    if(user){
       return <Redirect to="/" />
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
            <Link to="/"><button className="demo-button">Cancel</button></Link>

        </div>
        </div>
    )
}
export default DemoLogin;
