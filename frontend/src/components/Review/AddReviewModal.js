import React from 'react'
import { Modal } from "../../context/Modal";
import AddReview from './AddReview';

function AddReviewModal({onClose, restaurantId}){
    return (
        <div>
            <Modal onClose={onClose}>
                <AddReview onClose={onClose} restaurantId={restaurantId} />
            </Modal>
        </div>
    )
}

export default AddReviewModal;
