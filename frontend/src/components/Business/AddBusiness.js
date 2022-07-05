import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addBusinessThunk } from "../../store/business";
import {useHistory} from 'react-router-dom';
import './AddBusiness.css'

function AddBusiness(){
    const dispatch = useDispatch();
    const owner = useSelector(state=>state.session.user);
    const[name, setName] = useState('');
    const history = useHistory();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [logo, setLogo] = useState('')
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [coverImg, setCoverImg] = useState('')
    const [description, setDescription] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [errors, setErrors]=useState([])

    // if(!owner){
    //     return <Redirect to="/" />
    // }

    useEffect(()=>{
        const error=[]
        if(description.length>=255){
            error.push("Description must be less than 255 characters")
        }
        if(zipCode.length>5){
            error.push("Please provide a valid code.")
        }
        setErrors(error);
    },[description, zipCode])

    async function onSubmit(e){
        e.preventDefault();

        const business = {
            owner,
            name,
            phoneNumber: phoneNumber.trim(),
            description,
            coverImg,
            address,
            city,
            state,
            zipCode
        }
    // const newBusiness = await dispatch(addBusinessThunk(business, owner))

    return dispatch(addBusinessThunk(business, owner))
    .then(()=>{
        reset();
        history.push('/')})
    .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        return data;
    });
}
    function cancelButton(){
        history.push('/')
    }

    function reset(){
        setName('');
        setDescription('');
        setCoverImg('');
        setAddress('');
        setLogo('')
        setCity('');
        setState('')
        setPhoneNumber('');
        setZipCode('');
        setErrors([])
    }
    return (
        <>
            <div className="add-background">
                <form className="add-business" onSubmit={onSubmit}>
                    <ul>
                        {errors.length!==0&&errors.map(error=>
                            <li className="error">{error}</li>
                        )}
                    </ul>
                    <label>Name:
                        <input type="text" name="name" value={name} onChange={e=>setName(e.target.value)}></input>
                    </label>
                    <label>Phone Number:
                        <input type="text" name="phoneNumber" value={phoneNumber} placeholder="ex: 000-000-0000" onChange={e=>setPhoneNumber(e.target.value)}></input>
                    </label>
                    <label>Description:
                        <textarea name="description" rows="5" cols="35" value={description} placeholder="Tell us about your business" onChange={e=>setDescription(e.target.value)}></textarea>
                    </label>
                    <label>Image:
                        <input type="text" name="coverImg" value={coverImg} placeholder="provide URL of image" onChange={e=>setCoverImg(e.target.value)}></input>
                    </label>
                    <label>Logo:
                        <input type="text" name="logo" value={logo} placeholder="provide URL of image" onChange={e=>setLogo(e.target.value)}></input>
                    </label>
                    <label>Address:
                        <input type="text" name="address" value={address} onChange={e=>setAddress(e.target.value)}></input>
                    </label>
                    <label>City:
                        <input type="text" name="city" value={city} onChange={e=>setCity(e.target.value)}></input>
                    </label>
                    <label>State:
                        <input type="text" name="state" value={state} onChange={e=>setState(e.target.value)}></input>
                    </label>
                    <label> Zip Code:
                        <input type="text" name="zipCode" value={zipCode} onChange={e=>setZipCode(e.target.value)}></input>
                    </label>
                    <button type="submit" disabled={errors.length===0 ? false : true}>Add Business</button>
                    <button onClick={cancelButton}>Cancel</button>
                </form>
            </div>

        </>
    )
}

export default AddBusiness;
