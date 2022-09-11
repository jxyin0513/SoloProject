import React from 'react'
import { Modal } from "../../context/Modal";
import AddMenu from './AddMenu';

function AddMenuModal({onClose, restaurantId}){
    return (
        <div>
            <Modal onClose={onClose}>
                <AddMenu onClose={onClose} restaurantId={restaurantId} />
            </Modal>
        </div>
    )
}

export default AddMenuModal;
