import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getBusinessDetailThunk, deleteBusinessThunk} from "../../store/business";
import GetReviews from "../Review/getReviews";
import AddReview from "../Review/AddReview";
import { restoreUser } from "../../store/session";
import { getMenusThunk } from "../../store/menu";
import AddMenuModal from "../Menu/AddMenuModal";
import EditMenuModal from "../Menu/EditMenuModal";
import EditBusiness from "./EditBusiness";
import { useParams, useHistory } from 'react-router-dom';
import './BusinessDetail.css'

function BusinessDetail(){
    const dispatch = useDispatch();
    const history = useHistory();
    const {businessId} = useParams();
    const [editButton, setEditButton] = useState(false);
    const [reviewButton, setReviewButton] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [addMenu, setAddMenu] = useState(false)
    const [editMenu, setEditMenu] = useState(false);
    const [menuId, setMenuId] = useState(0)

    const user = useSelector(state=>state.session.user)
    const business = useSelector(state=>state.allBusinesses[businessId])
    const menus = useSelector(state=>state.menus)
    // const reviews = useSelector(state=>state.reviews)
    useEffect(()=>{
        dispatch(restoreUser()).then(()=>setIsLoaded(true))
        dispatch(getBusinessDetailThunk(businessId))
        dispatch(getMenusThunk(businessId))
        const header = document.getElementById("header-original");
        console.log(header.value)
        header.hidden=true;

    },[dispatch, businessId])

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
                        <div className="image-Outer">
                        {business.coverImg.length>0&&
                        <img className="image" src={business.coverImg} alt="businessImg">

                        </img>}
                        <p className="restaurant-name">{business.name}</p>
                        </div>
                        {/* {reviewButton&&<AddReview business={business} hide={()=>setReviewButton(false)} />} */}
                        {user&&user.id===business.ownerId &&
                            <div className="top-buttons">
                                <button>Add Menu</button>
                                <button onClick={review}>Write a review</button>
                                <button className="edit" onClick={edit} >Edit Business</button>
                                <button className="delete" onClick={deleteBusiness}>Delete Business</button>
                            </div>}
                        <div className="menu-container">
                            <div className="menu-bar">
                                <div className="menu-header">Menu</div>
                                <i className="fa-solid fa-plus" id="add-menu"></i>
                            </div>
                            {/* {menus && (menus.map(menu=>(
                                <div key={menu.id}>
                                    <img src={menu.image_url} alt='i'></img>
                                    <div>{menu.price}</div>
                                    <div>{menu.name}</div>
                                </div>
                            )))} */}

                        </div>
                        <div className="restaurant-info">
                            <p>Phone Number: {business.phoneNumber} </p>
                            <p>Description: {business.description}</p>
                            <p>Address: {business.address },  {business.city},   {business.state}</p>
                            <p>Zip Code: {business.zipCode}</p>
                        </div>
                        {/* <button onClick={review}>Write a review</button> */}
                        {reviewButton&&<AddReview business={business} hide={()=>setReviewButton(false)} />}
                    </div>
                    <div className="edit-delete">
                        {/* <span>{}</span>
                        <span>{Object.keys(reviews).length} Ratings</span> */}
                        {editButton&&<EditBusiness business={business} hide={()=>setEditButton(false)}/> }
                        {!editButton&&<GetReviews businessId={businessId}  />}
                    </div>

                </div>




            </div>
            )
            }
            {addMenu && <AddMenuModal onClose={()=>setAddMenu(false)} restaurantId = {businessId} />}
            {editMenu && <EditMenuModal onClose={()=>setEditMenu(false)} menuId={menuId} restaurantId={businessId} />}
        </>
    )
}

export default BusinessDetail;
