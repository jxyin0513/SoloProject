import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import { signInThunk } from "../../store/session";
import './LoginForm.css';
// import { Redirect } from "react-router-dom";

function LoginForm(){
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword]= useState("");
    const [errors, setErrors] = useState([])

    const user = useSelector(state=>state.session.user)
    if(user){
       return <Redirect to="/" />
    }
    // if(demo){
    //     console.log("here")
    //     const user={
    //         credential: "Demo-lition",
    //         password: "password"
    //     }
    //     dispatch(signInThunk(user))
    //     return <Redirect to="/" />
    // }
    async function onSubmit(e){
        e.preventDefault();
        const user={
            credential,
            password
        }
        // const logIn = await dispatch(signInThunk(user))
        // console.log(logIn.ok)
        // const err = await logIn.json()
        // console.log(err)
        return dispatch(signInThunk(user))
      .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.errors) setErrors(data.errors);
      });
    }
    async function onClick(){
        const user={
        credential: "Demo-lition",
        password: "password"
    }
        await dispatch(signInThunk(user))
}
    return (
        <div className="sign-in-container">
            <div className="errors-handler-signin">
                {errors.map((error, idx) => <div key={idx}>{error}</div>)}
            </div>
            <form className="sign-in-form" onSubmit={onSubmit}>
                <label>Username or Email
                    <input required type="text" name="password" value={credential} onChange={e=>setCredential(e.target.value)}>
                    </input>
                </label>

                <label>Password
                    <input required type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)}>
                    </input>
                </label>
                <button type="submit">Log In</button>
            </form>
            <div className="demo-login-outer">
                <div>Wanna Sign in As <button className="demo-login-button" onClick={onClick}>Demo User</button> ?</div>
            </div>
        </div>
    );
}

export default LoginForm;
