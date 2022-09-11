import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { createMenuThunk } from "../../store/menu";

function AddMenu({onClose, restaurantId}){
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [errors, setErrors] = useState([])
    async function onSubmit(e){
        e.preventDefault();
        const menu = {
            restaurantId,
            name,
            image
        }
        const newMenu = await dispatch(createMenuThunk(menu))
        if(!newMenu){
            onClose()
        }else{
            setErrors(newMenu)
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <ul>
                    {errors.length!==0&&errors.map(error=>
                        <li className="error">{error}</li>
                    )}
                </ul>
                <input type='text' name='name' placeholder="name" onChange={e=>setName(e.target.value)}></input>
                <input type='text' onChange={e=>setImage(e.target.value)}></input>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default AddMenu;
