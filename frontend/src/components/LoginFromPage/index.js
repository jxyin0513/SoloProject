import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { signInThunk } from "../../store/session";
import {Redirect} from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user)
    const [credential, setCredential] = useState("");
    const [password, setPassword]= useState("");
    const [errors, setErrors] = useState([])

    if(sessionUser){
        return <Redirect to="/" />
    }
    async function onSubmit(e){
        e.preventDefault();
        setErrors([]);
        const user={
            credential,
            password
        }
        const loggedUse = await dispatch(signInThunk(user))
        if(loggedUse&&loggedUse.errors){
            setErrors(loggedUse.errors)
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>Username
                    <input required type="text" name="password" value={credential} onChange={e=>setCredential(e.target.value)}>
                    </input>
                </label>

                <label>Password
                    <input required type="text" name="password" value={password} onChange={e=>setPassword(e.target.value)}>
                    </input>
                </label>
                <button type="submit">Log In</button>
            </form>
        </>
    );
}

export default LoginFormPage;
