import React, { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getBusinessesThunk, deleteBusinessThunk, editBusinessThunk } from "../../store/business";


function AllBusinesses(){
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user)
    const allBusinesses = useSelector(state=>state.allBusinesses);
    useEffect(()=>{
        dispatch(getBusinessesThunk())
    },[dispatch])

    function deleteBusiness(e){
        dispatch(deleteBusinessThunk(e.target.id))
    }
    function editBusiness(e){

    }
    return (
        <>
        {allBusinesses&&(
            <li>
                {Object.values(allBusinesses).map(business=>{
                    return (
                        <div id={business.id}>
                            <ul key={business.id}>{business.name}</ul>
                            {user.id===business.ownerId &&
                            <>
                                <button id={business.id} onClick={deleteBusiness}>Delete</button>
                                <button id={business.id} onClick={editBusiness}>Edit</button>
                            </>
                            }

                        </div>
                    )
                }

                )}
            </li>)
            }
        </>
    )
}

export default AllBusinesses;
