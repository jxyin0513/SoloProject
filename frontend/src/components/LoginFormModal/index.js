import LoginForm from "./LoginForm";
import React, {useState} from 'react'
import { Modal } from "../../context/Modal";

function LoginFormModal(){
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button onClick={()=>setShowModal(true)}>
                Log In
            </button>
            {showModal&&(
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
      )}
        </>
    )
}
export default LoginFormModal;
