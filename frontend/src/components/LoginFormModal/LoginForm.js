import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { signInThunk } from "../../store/session";
import './LoginForm.css';

function LoginForm(){
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword]= useState("");
    const [errors, setErrors] = useState([])

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
            <form class="sign-in" onSubmit={onSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
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
        </>
    );
}

export default LoginForm;
