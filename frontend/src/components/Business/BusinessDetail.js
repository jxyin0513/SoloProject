import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getBusinessesThunk, getReviewsThunk, deleteBusinessThunk} from "../../store/business";
import GetReviews from "../Review/getReviews";
import AddReview from "../Review/AddReview";
import EditBusiness from "./EditBusiness";
import { useParams } from 'react-router-dom';

function BusinessDetail(){
    const dispatch = useDispatch();

    const {businessId} = useParams();
    const [editButton, setEditButton] = useState(false);
    const [reviewButton, setReviewButton] = useState(false);

    const user = useSelector(state=>state.session.user)
    const business = useSelector(state=>state.allBusinesses[businessId])


    useEffect(()=>{
        dispatch(getBusinessesThunk())
    },[dispatch])

    function deleteBusiness(e){
        dispatch(deleteBusinessThunk(e.target.id))
    }

    return (
        <>
        {business&&(

            <div id={business.id}>
                <ul key={business.id}>{business.name}</ul>
                <ul>{business.description}</ul>
                <ul>{business.zipCode}</ul>
                <GetReviews businessId={business.id}/>
                <button onClick={()=>setReviewButton(true)}>Write a review</button>
                {user&&user.id===business.ownerId &&
                <>
                    <button id={business.id} onClick={()=>setEditButton(true)} >Edit</button>
                    <button id={business.id} onClick={deleteBusiness}>Delete</button>
                </>
                }

                {editButton&&<EditBusiness business={business} /> }
                {reviewButton&&<AddReview business={business} user={user} />}
            </div>
            )
            }
        </>
    )
}

export default BusinessDetail;
