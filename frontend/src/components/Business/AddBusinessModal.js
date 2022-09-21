import React, {useState} from 'react'
import { Modal } from "../../context/Modal";
import AddBusiness from './AddBusiness';

function AddBusinessModal(){
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button onClick={()=>setShowModal(true)}>
                List new business
            </button>

            {showModal&&(
                <Modal onClose={() => setShowModal(false)}>
                    <AddBusiness onClose={() => setShowModal(false)} />
                </Modal>
      )}
        </>
    )
}
export default AddBusinessModal
