import React from 'react'
import { Modal } from "../../context/Modal";
import EditBusiness from './EditBusiness';

function EditBusinessModal({onClose, restaurantId}){
    return (
        <div>
            <Modal onClose={onClose}>
                <EditBusiness onClose={onClose} restaurantId={restaurantId} />
            </Modal>
        </div>
    )
}
export default EditBusinessModal
