import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { signUpUser } from "../../store/session";
import {Redirect} from 'react-router-dom';
import "./SignupForm.css"

function SignupFormPage(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([])

    if(sessionUser){
        return <Redirect to="/" />
    }
    async function onSubmit(e){
        e.preventDefault();
        setErrors([]);
        const user={
            username,
            email,
            password,
            confirmPassword
        }

        if(password !== confirmPassword){
           return setErrors(['Confirm Password field must be the same as the Password field'])
        }

        const signedUser = await dispatch(signUpUser(user))
        if(signedUser&&signedUser.errors){
            setErrors(signedUser.errors)
        }
    }
    return (
        <>
            <form class="sign-up" onSubmit={onSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>Username
                    <input required type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)}>
                    </input>
                </label>

                <label>Email
                    <input required type="text" name="email" value={email} onChange={e=>setEmail(e.target.value)}>
                    </input>
                </label>

                <label>Password
                    <input required type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)}>
                    </input>
                </label>

                <label>Confirm Password
                    <input required type="password" name="confirmPassword" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}>
                    </input>
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormPage;
