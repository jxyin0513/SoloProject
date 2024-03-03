import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { editBusinessThunk } from "../../store/business";
import './EditBusiness.css'

function EditBusiness({restaurantId, onClose}){
    const dispatch = useDispatch();
    const business = useSelector(state=>state.allBusinesses[restaurantId])
    const[name, setName] = useState(business.name);
    const [phoneNumber, setPhoneNumber] = useState(business.phoneNumber);
    const [coverImg, setCoverImg] = useState(business.coverImg);
    // const [logo, setLogo] = useState(business.logo)
    const [address, setAddress] = useState(business.address);
    const [city, setCity] = useState(business.city);
    const [state, setState] = useState(business.state);
    const [description, setDescription] = useState(business.description);
    const [zipCode, setZipCode] = useState(business.zipCode);
    const [errors, setErrors] = useState([])

    function updateImage(e){
        const file = e.target.files[0];
        setCoverImg(file)
    }

    async function onSubmit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append("ownerId", business.ownerId);
        formData.append("name", name);
        formData.append("phoneNumber", phoneNumber.trim());
        formData.append("description", description);
        // formData.append("logo", logo);
        formData.append("image", coverImg);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("zipCode", zipCode);

    return dispatch(editBusinessThunk(formData)).then(()=>onClose())
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
                    {errors.length!==0&&errors.map((error, idx)=>
                        <div key={idx}>* {error}</div>
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
                    <textarea name="description" value={description} placeholder='description' rows="3" cols="30" onChange={e=>setDescription(e.target.value)}></textarea>
                </label>
                <label>
                     <input type="file" name="image" onChange={updateImage}></input>
                </label>
                {/* <label>
                    <input type="text" name="logo" onChange={updateImage}></input>
                </label> */}
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
                <button type="submit">Submit</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>
    )
}

export default EditBusiness;
