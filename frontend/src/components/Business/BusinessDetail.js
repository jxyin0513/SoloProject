import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getBusinessesThunk, deleteBusinessThunk} from "../../store/business";
import EditBusiness from "./EditBusiness";
import { useParams } from 'react-router-dom';

function BusinessDetail(){
    const dispatch = useDispatch();
    const {businessId} = useParams();
    const [editButton, setEditButton] = useState(false);
    const user = useSelector(state=>state.session.user)

    const businessDetail = Object.values(useSelector(state=>state.allBusinesses)).filter(business=>business.id===Number(businessId));
    useEffect(()=>{
        dispatch(getBusinessesThunk())
    },[dispatch])

    function deleteBusiness(e){
        dispatch(deleteBusinessThunk(e.target.id))
    }

    return (
        <>
        {businessDetail&&(
            <li>
                {Object.values(businessDetail).map(business=>{
                    return (
                        <div id={business.id}>
                            <ul key={business.id}>{business.name}</ul>

                            {user&&user.id===business.ownerId &&
                            <>
                                <button id={business.id} onClick={()=>setEditButton(true)} >Edit</button>
                                <button id={business.id} onClick={deleteBusiness}>Delete</button>
                            </>
                            }
                            {editButton&&<EditBusiness business={business} /> }
                        </div>
                    )
                }

                )}
            </li>)
            }
        </>
    )
}

export default BusinessDetail;
