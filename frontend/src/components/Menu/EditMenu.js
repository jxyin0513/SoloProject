import React, { useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { editMenuThunk } from "../../store/menu";

function EditMenu({onClose, menuId, restaurantId}){
    const dispatch = useDispatch();
    const menu = useSelector(state=>state.menus[menuId])
    const [name, setName] = useState(menu.name)
    const [image, setImage] = useState(menu.image)
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
        <div>
            <form onSubmit={onSubmit}>
                <ul>
                    {errors.length!==0&&errors.map(error=>
                        <li className="error">{error}</li>
                    )}
                </ul>
                <input type='text' name='name' value={name} placeholder="name" onChange={e=>setName(e.target.value)}></input>
                <input type='text' value={image} onChange={e=>setImage(e.target.value)}></input>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default EditMenu;
