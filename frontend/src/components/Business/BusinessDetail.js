import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getBusinessDetailThunk, deleteBusinessThunk} from "../../store/business";
import GetReviews from "../Review/getReviews";
import AddReview from "../Review/AddReview";
import LoginFormModal from "../LoginFormModal";
import ProfileButton from "../Navigation/ProfileButton";
import EditBusiness from "./EditBusiness";
import { useParams, useHistory, NavLink } from 'react-router-dom';
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
        <div className="header">
            <NavLink exact to="/"><img className='img' src="/images/1.jpg" alt='logo'></img></NavLink>
            <div>
                {user&&user.id===business.ownerId ?
                    (<>
                        <button className="edit" onClick={edit} >Edit Business</button>
                        <button className="delete" onClick={deleteBusiness}>Delete Business</button>
                     </>
                    ) : <LoginFormModal />
                    }
                {user&&<ProfileButton user={user}/>}
            </div>
        </div>
        {business&&(

            <div className="business-detail">
                <div className="form-table">
                    <div className="business-info">
                        {business.coverImg.length&&<img className="image" src={business.coverImg} alt="businessImg"></img>}
                        <li >Name: {business.name}</li>
                        <li>Phone Number: {business.phoneNumber} </li>
                        <li>Description: {business.description}</li>
                        <li>Address: {business.address },  {business.city},   {business.state}</li>
                        <li>Zip Code: {business.zipCode}</li>
                        <button onClick={review}>Write a review</button>
                        {reviewButton&&<AddReview business={business} hide={()=>setReviewButton(false)} />}
                    </div>
                    <div className="edit-delete">
                        {editButton&&<EditBusiness business={business} hide={()=>setEditButton(false)}/> }

                        {!editButton&&<GetReviews businessId={businessId}/>}
                    </div>

                </div>




            </div>
            )
            }
        </>
    )
}

export default BusinessDetail;
