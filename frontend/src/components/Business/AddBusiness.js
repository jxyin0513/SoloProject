import React, { useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addBusinessThunk } from "../../store/business";
import {useHistory} from 'react-router-dom';
import './AddBusiness.css'

function AddBusiness({onClose}){
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user);
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

    async function onSubmit(e){
        e.preventDefault();

        const business = {
            ownerId: user.id,
            name,
            phoneNumber: phoneNumber.trim(),
            description,
            logo,
            coverImg,
            address,
            city,
            state,
            zipCode
        }

    return dispatch(addBusinessThunk(business))
    .then((res)=>{
        history.push(`/businesses/${res.id}`)
        onClose()})
    .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        return data;
    });
}

    return (
            <div className="add-business-container">
                <div className="business-header">
                    <div>List new business</div>
                </div>
                <div className="errors-handler-business">
                    {errors && errors.map(error=>
                        <div >* {error}</div>
                    )}
                </div>
                <form className="add-business-form" onSubmit={onSubmit}>
                    <label>
                        <input type="text" name="name" placeholder="restaurant name" value={name} onChange={e=>setName(e.target.value)}></input>
                    </label>
                    <label>
                        <input type="text" name="phoneNumber" value={phoneNumber} placeholder="ex: 000-000-0000" onChange={e=>setPhoneNumber(e.target.value)}></input>
                    </label>
                    <label>
                        <textarea name="description" rows="3" cols="30" value={description} placeholder="Tell us about your business" onChange={e=>setDescription(e.target.value)}></textarea>
                    </label>
                    <label>
                        <input type="text" name="coverImg" value={coverImg} placeholder="URL of image" onChange={e=>setCoverImg(e.target.value)}></input>
                    </label>
                    <label>
                        <input type="text" name="logo" value={logo} placeholder="URL of thumb nail" onChange={e=>setLogo(e.target.value)}></input>
                    </label>
                    <label>
                        <input type="text" name="address" value={address} placeholder='address' onChange={e=>setAddress(e.target.value)}></input>
                    </label>
                    <label>
                        <input type="text" name="city" value={city} placeholder="city" onChange={e=>setCity(e.target.value)}></input>
                    </label>
                    <label>
                        <input type="text" name="state" value={state} placeholder="state" onChange={e=>setState(e.target.value)}></input>
                    </label>
                    <label>
                        <input type="text" name="zipCode" value={zipCode} placeholder="zip code" onChange={e=>setZipCode(e.target.value)}></input>
                    </label>
                    <button type="submit">Add Business</button>
                </form>
            </div>
    )
}

export default AddBusiness;
