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
    // if(editBusiness){
    //     hide()
    // }
    return dispatch(editBusinessThunk(business)).then(()=>onClose())
    .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        return data;
    });

    }

    return (
        <>
            <div className="edit-outer">
            <form className="edit-business" onSubmit={onSubmit}>
                <ul>
                    {errors.length!==0&&errors.map(error=>
                        <li className="erros">{error}</li>
                    )}
                </ul>
                <label>Name:
                    <input type="text" name="name"  value={name} onChange={e=>setName(e.target.value)}></input>
                </label>
                <label>Phone Number:
                    <input type="text" name="phoneNumber" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)}></input>
                </label>
                <label>Description
                    <textarea name="description" value={description} rows="5" cols="20" placeholder="tell us about your business" onChange={e=>setDescription(e.target.value)}></textarea>
                </label>
                <label>Image:
                     <input type="text" name="coverImg" value={coverImg} onChange={e=>setCoverImg(e.target.value)}></input>
                </label>
                <label>Logo:
                        <input type="text" name="logo" value={logo} onChange={e=>setLogo(e.target.value)}></input>
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
                <label> Zip Code
                    <input type="text" name="zipCode" value={zipCode} onChange={e=>setZipCode(e.target.value)}></input>
                </label>
                <button type="submit" disabled={errors.length===0 ? false : true}>Submit</button>
                <button onClick={onClose}>Cancel</button>
            </form>
            </div>
        </>
    )
}

export default EditBusiness;
