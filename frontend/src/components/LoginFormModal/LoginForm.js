import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { signInThunk } from "../../store/session";
import './LoginForm.css';
// import { Redirect } from "react-router-dom";

function LoginForm(){
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword]= useState("");
    const [errors, setErrors] = useState([])
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
        setErrors([]);

        const user={
            credential,
            password
        }
        return dispatch(signInThunk(user))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return (
        <>
            <form className="sign-in" onSubmit={onSubmit}>
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
