import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { editBusinessThunk } from "../../store/business";
import './EditBusiness.css'

function EditBusiness({restaurantId, onClose}){
    const dispatch = useDispatch();
    const business = useSelector(state=>state.allBusinesses[restaurantId])
    const[name, setName] = useState(business.name);
    const [phoneNumber, setPhoneNumber] = useState(business.phoneNumber);
    const [coverImg, setCoverImg] = useState(business.coverImg);
    const [logo, setLogo] = useState(business.logo)
    const [address, setAddress] = useState(business.address);
    const [city, setCity] = useState(business.city);
    const [state, setState] = useState(business.state);
    const [description, setDescription] = useState(business.description);
    const [zipCode, setZipCode] = useState(business.zipCode);
    const [errors, setErrors] = useState([])
    const id= business.id

    useEffect(()=>{
        const error = []
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
            id,
            name,
            phoneNumber: phoneNumber.trim(),
            coverImg,
            logo,
            address,
            city,
            state,
            description,
            zipCode
        }
    // const editBusiness = await dispatch(editBusinessThunk(business))
    return dispatch(editBusinessThunk(business)).then(()=>onClose())
    .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        return data;
    });

    }

    return (
        <div className="edit-business-outer">
            <div className="edit-business-header">
                <div>Edit business</div>
            </div>
            <div className="errors-handler-business">
                    {errors.length!==0&&errors.map(error=>
                        <div>* {error}</div>
                    )}
            </div>
            <form className="edit-business" onSubmit={onSubmit}>
                <label>
                    <input type="text" name="name" placeholder="restaurant name" value={name} onChange={e=>setName(e.target.value)}></input>
                </label>
                <label>
                    <input type="text" name="phoneNumber" placeholder="phone number" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)}></input>
                </label>
                <label>
                    <textarea name="description" value={description} placeholder='description' rows="5" cols="20" onChange={e=>setDescription(e.target.value)}></textarea>
                </label>
                <label>
                     <input type="text" name="coverImg" placeholder="cover image" value={coverImg} onChange={e=>setCoverImg(e.target.value)}></input>
                </label>
                <label>
                        <input type="text" name="logo" placeholder="thumb nail" value={logo} onChange={e=>setLogo(e.target.value)}></input>
                    </label>
                <label>
                    <input type="text" name="address" placeholder="address" value={address} onChange={e=>setAddress(e.target.value)}></input>
                </label>
                <label>
                    <input type="text" name="city" placeholder="city" value={city} onChange={e=>setCity(e.target.value)}></input>
                </label>
                <label>
                    <input type="text" name="state" placeholder="state" value={state} onChange={e=>setState(e.target.value)}></input>
                </label>
                <label>
                    <input type="text" name="zipCode" placeholder="zipcode" value={zipCode} onChange={e=>setZipCode(e.target.value)}></input>
                </label>
                <button type="submit" disabled={errors.length===0 ? false : true}>Submit</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>

    )
}

export default EditBusiness;
