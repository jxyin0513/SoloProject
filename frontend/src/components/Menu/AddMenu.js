import React, { useState} from "react";
import {useDispatch} from 'react-redux';
import { createMenuThunk } from "../../store/menu";
import './AddMenu.css'

function AddMenu({onClose, restaurantId}){
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [errors, setErrors] = useState([])
    async function onSubmit(e){
        e.preventDefault();
        const menu = {
            restaurantId,
            name,
            price,
            image_url: image
        }
        const newMenu = await dispatch(createMenuThunk(menu))
        if(!newMenu){
            onClose()
        }else{
            setErrors(newMenu)
        }
    }
    return (
        <div className="add-menu-container">
            <div className="add-menu-bar">
                <div>Add new menu</div>
            </div>
            <div className="errors-handler-menu">
                    {errors.length!==0&&errors.map(error=>
                        <div className="error">{error}</div>
                    )}
            </div>
            <form onSubmit={onSubmit} className='add-menu-form'>
                <input type='text' name='name' placeholder="name" onChange={e=>setName(e.target.value)}></input>
                <input type='number' name="price" placeholder="price" onChange={e=>setPrice(e.target.value)}></input>
                <input type='text' name="image_url" placeholder="image url" onChange={e=>setImage(e.target.value)}></input>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default AddMenu;