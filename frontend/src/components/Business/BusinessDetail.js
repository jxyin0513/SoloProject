import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getBusinessDetailThunk, deleteBusinessThunk} from "../../store/business";
import GetReviews from "../Review/getReviews";
import AddReview from "../Review/AddReview";
import EditBusiness from "./EditBusiness";
import { useParams, useHistory, Redirect } from 'react-router-dom';
import './BusinessDetail.css'

function BusinessDetail(){
    const dispatch = useDispatch();
    const history = useHistory();
    const {businessId} = useParams();
    const [editButton, setEditButton] = useState(false);
    const [reviewButton, setReviewButton] = useState(false);

    const user = useSelector(state=>state.session.user)
    const business = useSelector(state=>state.allBusinesses[businessId])

    useEffect(()=>{
        dispatch(getBusinessDetailThunk(businessId))
    },[dispatch])

    async function deleteBusiness(e){
        const deleteBusiness =  await dispatch(deleteBusinessThunk(businessId))
        if(deleteBusiness){
            history.push('/');
        }
    }
    function edit(e){
        setReviewButton(false);
        setEditButton(true);
    }
    function review(e){
        setEditButton(false)
        setReviewButton(true)
    }
    return (
        <>
        {business&&(

            <div className="business-detail">
                <div className="form-table">
                    <div className="business-info">

                        <li >Name: {business.name}</li>
                        {business.coverImg&&<img className="image" src={business.coverImg} alt="businessImg"></img>}
                        <li>Phone Number: {business.phoneNumber} </li>
                        <li>Description: {business.description}</li>
                        <li>Address: {business.address },  {business.city},   {business.state}</li>
                        <li>Zip Code: {business.zipCode}</li>
                    </div>
                    <div className="edit-delete">
                        {user&&user.id===business.ownerId &&
                            <div className="business-button">
                                <button className="edit" onClick={edit} >Edit Business</button>
                                <button className="delete" onClick={deleteBusiness}>Delete Business</button>
                            </div>
                        }
                        {editButton&&<EditBusiness business={business} hide={()=>setEditButton(false)}/> }
                        {reviewButton&&<AddReview business={business} hide={()=>setReviewButton(false)} />}
                    </div>
                </div>
                <button onClick={review}>Write a review</button>
                <GetReviews businessId={businessId}/>



            </div>
            )
            }
        </>
    )
}

export default BusinessDetail;
