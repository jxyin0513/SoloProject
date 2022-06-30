import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addBusinessThunk } from "../../store/business";
import {Redirect} from 'react-router-dom';
import './AddBusiness.css'

function AddBusiness(){
    const dispatch = useDispatch();
    const owner = useSelector(state=>state.session.user);
    const[name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
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
        if(phoneNumber.length>10){
            error.push("Please provide a valid phone number.")
        }
        if(zipCode.length>5){
            error.push("Please provide a valid code.")
        }
        setErrors(error);
    },[description, phoneNumber, zipCode])

    async function onSubmit(e){
        e.preventDefault();

        const business = {
            owner,
            name,
            phoneNumber,
            description,
            zipCode
        }
    const newBusiness = await dispatch(addBusinessThunk(business, owner))

    if(newBusiness){
        reset()
        return <Redirect to="/" />
    }
}

    function reset(){
        setName('');
        setDescription('');
        setPhoneNumber('');
        setZipCode('');
        setErrors([])
    }
    return (
        <>
            <form className="add-business" onSubmit={onSubmit}>
                {errors.length!==0&&errors.map(error=>
                <ul>{error}</ul>
                )}
                <label>Name:
                    <input type="text" name="name" value={name} onChange={e=>setName(e.target.value)}></input>
                </label>
                <label>Phone Number:
                    <input type="text" name="phoneNumber" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)}></input>
                </label>
                <label>Description
                    <textarea name="description" value={description} placeholder="tell us about your business" onChange={e=>setDescription(e.target.value)}></textarea>
                </label>
                <label> Zip Code
                    <input type="text" name="zipCode" value={zipCode} onChange={e=>setZipCode(e.target.value)}></input>
                </label>
                <button type="submit" disabled={errors.length===0 ? false : true}>Add Business</button>
            </form>

        </>
    )
}

export default AddBusiness;
