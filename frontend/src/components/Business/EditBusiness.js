import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { editBusinessThunk } from "../../store/business";


function EditBusiness({business}){
    const dispatch = useDispatch();
    const owner = useSelector(state=>state.session.user);
    const[name, setName] = useState(business.name);
    const [phoneNumber, setPhoneNumber] = useState(business.phoneNumber);
    const [description, setDescription] = useState(business.description);
    const [zipCode, setZipCode] = useState(business.zipCode);

    async function onSubmit(e){
        e.preventDefault();
        const business = {
            owner,
            name,
            phoneNumber,
            description,
            zipCode
        }
    const newBusiness = await dispatch(editBusinessThunk(business, owner))

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <label></label>
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

export default EditBusiness;
