import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { editMenuThunk } from "../../store/menu";
import './EditMenu.css'

function EditMenu({onClose, menuId, restaurantId}){
    const dispatch = useDispatch();
    const menu = useSelector(state=>state.menus[menuId])
    const [name, setName] = useState(menu.name);
    const [price, setPrice] = useState(menu.price);
    const [image, setImage] = useState(menu.image_url);
    const [errors, setErrors] = useState([])

    function updateImage(e){
        const file = e.target.files[0];
        setImage(file);
    }

    async function onSubmit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", menuId);
        formData.append("restaurantId", restaurantId);
        formData.append("price", price);
        formData.append("name", name);
        formData.append("image_url", image);

        return dispatch(editMenuThunk(formData))
                .then(()=>onClose())
                .catch(async (res) => {
                    const data = await res.json();
                    if (data.errors) setErrors(data.errors);
                    return data;
                })
    }

    return (
        <div className="edit-menu-container">
            <div className="edit-menu-header">
                <div>Edit menu</div>
            </div>
            <div className="errors-handler-menu">
                    {errors.length!==0 && errors.map(error=>
                        <div >* {error}</div>
                    )}
                </div>
            <form onSubmit={onSubmit} className='edit-menu-form'>
                <input type='text' name='name' value={name} placeholder="Menu name" onChange={e=>setName(e.target.value)}></input>
                <input type='number' name="price" value={price} placeholder="menu price" onChange={e=>setPrice(e.target.value)}></input>
                <input type='file' name="image_url" onChange={updateImage}></input>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default EditMenu;
