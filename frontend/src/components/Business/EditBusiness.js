import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { editBusinessThunk } from "../../store/business";
import './EditBusiness.css'

function EditBusiness({business}){
    const dispatch = useDispatch();
    const[name, setName] = useState(business.name);
    const [phoneNumber, setPhoneNumber] = useState(business.phoneNumber);
    const [description, setDescription] = useState(business.description);
    const [zipCode, setZipCode] = useState(business.zipCode);
    const [errors, setErrors] = useState([])
    const id= business.id

    useEffect(()=>{
        const error = []

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
            id,
            name,
            phoneNumber,
            description,
            zipCode
        }
    const editBusiness = await dispatch(editBusinessThunk(business))

    }

    return (
        <>
            <form className="edit-business" onSubmit={onSubmit}>
                <ul>
                    {errors.length!==0&&errors.map(error=>
                        <li>{error}</li>
                    )}
                </ul>
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
                <button type="submit">Edit Business</button>
            </form>

        </>
    )
}

export default EditBusiness;
