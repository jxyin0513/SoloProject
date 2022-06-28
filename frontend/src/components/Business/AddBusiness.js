import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addBusinessThunk } from "../../store/business";
import {Redirect} from 'react-router-dom';

function AddBusiness(){
    const dispatch = useDispatch();
    const owner = useSelector(state=>state.session.user);
    const[name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [zipCode, setZipCode] = useState('');

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
    // if(newBusiness){
    //     return <Redirect to="/" />
    // }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
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
                <button type="submit">Add Business</button>
            </form>

        </>
    )
}

export default AddBusiness;
