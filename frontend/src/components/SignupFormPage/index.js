import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { signUpUser } from "../../store/session";
import {Redirect, useHistory} from 'react-router-dom';
import "./SignupForm.css"

function SignupFormPage(){
    const dispatch = useDispatch();
    // const history = useHistory();
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

        // return setErrors(['Confirm Password field must be the same as the Password field']);
    }
    return (
        <>
            <div className="signup-Outer">
                <form className="sign-up" onSubmit={onSubmit}>
                    <div>
                        {errors.map((error, idx) => <li className="error" key={idx}>*{error}</li>)}
                    </div>
                    <label>Username:
                        <input required type="text" placeholder="Username" name="username" value={username} onChange={e=>setUsername(e.target.value)}>
                        </input>
                    </label>

                    <label>Email:
                        <input required type="text" placeholder="Email" name="email" value={email} onChange={e=>setEmail(e.target.value)}>
                        </input>
                    </label>

                    <label>Password:
                        <input required type="password" placeholder="Password" name="password" value={password} onChange={e=>setPassword(e.target.value)}>
                        </input>
                    </label>

                    <label>Confirm Password:
                        <input required type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}>
                        </input>
                    </label>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}

export default SignupFormPage;
