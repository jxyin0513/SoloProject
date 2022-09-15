import React, { useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { editMenuThunk } from "../../store/menu";
import './EditMenu.css'

function EditMenu({onClose, menuId, restaurantId}){
    const dispatch = useDispatch();
    const menu = useSelector(state=>state.menus[menuId])
    const [name, setName] = useState(menu.name)
    const [image, setImage] = useState(menu.image_url)
    const [errors, setErrors] = useState([])

    async function onSubmit(e){
        e.preventDefault();
        const menu = {
            id: menuId,
            restaurantId,
            name,
            image
        }
        const editMenu = await dispatch(editMenuThunk(menu))
        if(!editMenu){
            onClose()
        }else{
            setErrors(editMenu)
        }
    }

    return (
        <div className="edit-menu-container">
            <div className="edit-menu-header">
                <div>Edit menu</div>
            </div>
            <form onSubmit={onSubmit} className='edit-menu-form'>
                <div className="errors-handler-menu">
                    {errors.length!==0 && errors.map(error=>
                        <div >{error}</div>
                    )}
                </div>
                <input type='text' name='name' value={name} placeholder="Menu name" onChange={e=>setName(e.target.value)}></input>
                <input type='text' name="image_url" value={image} placeholder="Menu image URL" onChange={e=>setImage(e.target.value)}></input>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default EditMenu;
