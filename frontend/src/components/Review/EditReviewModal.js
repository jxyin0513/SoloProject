import React from 'react'
import { Modal } from "../../context/Modal";
import EditReview from './EditReview';

function EditReviewModal({onClose, reviewId}){
    return (
        <div>
            <Modal onClose={onClose}>
                <EditReview onClose={onClose} id={reviewId} />
            </Modal>
        </div>
    )
}

export default EditReviewModal;
