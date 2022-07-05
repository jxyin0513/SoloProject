import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { signUpUser } from "../../store/session";
import {Redirect, useHistory} from 'react-router-dom';
import "./SignupForm.css"

function SignupFormPage(){
    const dispatch = useDispatch();
    const history = useHistory();
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

        if(password === confirmPassword){
            setErrors([])
            return dispatch(signUpUser(user))
                .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        }

        return setErrors(['Confirm Password field must be the same as the Password field']);
    }
    function cancelButton(){
        history.push('/');
    }
    return (
        <>
            <div className="signup-background">
                <form className="sign-up" onSubmit={onSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
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
                    <button onClick={cancelButton}>Cancel</button>
                </form>
            </div>
        </>
    );
}

export default SignupFormPage;
