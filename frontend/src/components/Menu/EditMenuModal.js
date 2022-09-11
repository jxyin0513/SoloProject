import React from 'react'
import { Modal } from "../../context/Modal";
import EditMenu from './EditMenu';

function EditMenuModal({onClose, menuId, restaurantId}){
    return (
        <div>
            <Modal onClose={onClose}>
                <EditMenu onClose={onClose} menuId={menuId} restaurantId={restaurantId} />
            </Modal>
        </div>
    )
}

export default EditMenuModal;
