import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getBusinessDetailThunk, deleteBusinessThunk} from "../../store/business";
import GetReviews from "../Review/getReviews";
import AddReview from "../Review/AddReview";
import { restoreUser } from "../../store/session";
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
    const [isLoaded, setIsLoaded] = useState(false);

    const user = useSelector(state=>state.session.user)
    const business = useSelector(state=>state.allBusinesses[businessId])
    const reviews = useSelector(state=>state.reviews)
    useEffect(()=>{
        dispatch(restoreUser()).then(()=>setIsLoaded(true))
        dispatch(getBusinessDetailThunk(businessId))
        const header = document.getElementById("header-original");
        console.log(header.value)
        header.hidden=true;

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
        {/* <div className="header">
            <NavLink exact to="/"><img className='img' src="/images/1.jpg" alt='logo'></img></NavLink>
            <div>
                {user&&business&&user.id===business.ownerId &&
                    <>
                        <button className="edit" onClick={edit} >Edit Business</button>
                        <button className="delete" onClick={deleteBusiness}>Delete Business</button>
                    </>
                }
                {!user&&<LoginFormModal />}
                {user&&<ProfileButton user={user}/>}
            </div>
        </div> */}
        {business&&(

            <div className="business-detail">
                <div className="form-table">
                    <div className="business-info">

                        <p className="name">{business.name}</p>
                        {business.coverImg.length>0&&<img className="image" src={business.coverImg} alt="businessImg"></img>}
                        {user&&user.id===business.ownerId &&
                    <div>
                        <button className="edit" onClick={edit} >Edit Business</button>
                        <button className="delete" onClick={deleteBusiness}>Delete Business ?</button>
                    </div>
                }

                        <p>Phone Number: {business.phoneNumber} </p>
                        <p>Description: {business.description}</p>
                        <p>Address: {business.address },  {business.city},   {business.state}</p>
                        <p>Zip Code: {business.zipCode}</p>
                        <button onClick={review}>Write a review</button>
                        {reviewButton&&<AddReview business={business} hide={()=>setReviewButton(false)} />}
                    </div>
                    <div className="edit-delete">
                        {/* <span>{}</span>
                        <span>{Object.keys(reviews).length} Ratings</span> */}
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
