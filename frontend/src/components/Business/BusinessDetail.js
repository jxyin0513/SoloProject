import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getBusinessDetailThunk, deleteBusinessThunk} from "../../store/business";
import GetReviews from "../Review/getReviews";
import AddReview from "../Review/AddReview";
import EditBusiness from "./EditBusiness";
import { useParams } from 'react-router-dom';
import './BusinessDetail.css'

function BusinessDetail(){
    const dispatch = useDispatch();

    const {businessId} = useParams();
    const [editButton, setEditButton] = useState(false);
    const [reviewButton, setReviewButton] = useState(false);

    const user = useSelector(state=>state.session.user)
    const business = useSelector(state=>state.allBusinesses[businessId])

    useEffect(()=>{
        dispatch(getBusinessDetailThunk(businessId))
    },[dispatch])

    function deleteBusiness(e){
        dispatch(deleteBusinessThunk(businessId))
    }

    return (
        <>
        {business&&(

            <div className="business-detail">
                <div className="business-info">
                    {user&&user.id===business.ownerId &&
                        <>
                            <button className="edit" onClick={()=>setEditButton(true)} >Edit Business</button>
                            <button className="delete" onClick={deleteBusiness}>Delete Business</button>
                        </>
                    }
                    <ul >Name: {business.name}</ul>
                    {business.coverImg&&<img src={business.coverImg} alt=""></img>}
                    <ul>Phone Number: {business.phoneNumber} </ul>
                    <ul>Description: {business.description}</ul>
                    <ul>Address: {business.address },  {business.city},   {business.state}</ul>
                    <ul>Zip Code: {business.zipCode}</ul>

                </div>
                <button onClick={()=>setReviewButton(true)}>Write a review</button>
                <GetReviews businessId={businessId}/>


                {editButton&&<EditBusiness business={business} hide={()=>setEditButton(false)}/> }
                {reviewButton&&<AddReview business={business} hide={()=>setReviewButton(false)} />}
            </div>
            )
            }
        </>
    )
}

export default BusinessDetail;
