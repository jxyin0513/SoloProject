import React, {useMemo, useEffect, useState} from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import {APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';
// import { Loader } from "@googlemaps/js-api-loader"
import {useDispatch, useSelector} from 'react-redux';
import {getBusinessesThunk, deleteBusinessThunk} from "../../store/business";
import GetReviews from "../Review/getReviews";
import { getMenusThunk } from "../../store/menu";
import AddMenuModal from "../Menu/AddMenuModal";
import EditMenuModal from "../Menu/EditMenuModal";
import AddReviewModal from "../Review/AddReviewModal";
import EditBusinessModal from "./EditBusinessModal";
import { deleteMenuThunk } from "../../store/menu";
// import LoginForm from "../LoginFormModal/LoginForm";
import { useParams, useHistory } from 'react-router-dom';
import './BusinessDetail.css'

function BusinessDetail(){
    const dispatch = useDispatch();
    const history = useHistory();
    let center;
    const {businessId} = useParams();
    const business = useSelector(state=>state.allBusinesses[businessId])
    const { isLoaded } = useJsApiLoader({
        id:'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      });
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(()=>{
        if(!isLoaded) return;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({address: `${business?.address}, ${business?.city}, ${business?.state}`}, (results, status)=>{
            if(status === "OK"){
                const location = results[0].geometry.location;
                setLatitude(location.lat())
                setLongitude(location.lng())
            }
        })

    },[businessId, isLoaded])

    center = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);
    const [editBusiness, setEditBusiness] = useState(false);
    const [addReview, setAddReview] = useState(false);
    const [addMenu, setAddMenu] = useState(false)
    const [editMenu, setEditMenu] = useState(false);
    // const [reqLog, setReqLog] = useState(false);
    const [menuId, setMenuId] = useState(0);
    const user = useSelector(state=>state.session.user)
    const menus = Object.values(useSelector(state=>state.menus))
    const reviews = Object.values(useSelector(state=>state.reviews));

    let reviewAvg=0;
    reviews.forEach(review=>{reviewAvg+=review.rating})
    reviewAvg = reviewAvg / reviews.length
    const [menuNum, setMenuNum] = useState([0,3]);

    useEffect(()=>{
        dispatch(getBusinessesThunk())
        dispatch(getMenusThunk(businessId))
    },[dispatch, businessId])
    // console.log(center)
    async function deleteBusiness(e){
        const deleteBusiness =  await dispatch(deleteBusinessThunk(businessId))
        if(deleteBusiness){
            history.push('/');
        }
    }
    function edit(e){
        setEditBusiness(true);
    }
    function newMenu(e){
        if(user){
            setAddMenu(true)
        }
    }
    function newReview(e){
        if(user){
            setAddReview(true)
        }
    }
    function prevSlide(e){
        if(menuNum[0]-4 <= 0){
            setMenuNum([0, 3])
        }else{
            setMenuNum([[menuNum[0]-4], menuNum[1]-4])
        }
    }
    function nextSlide(e){
        if(menuNum[1] >= menuNum[0]+3){
            if(menuNum[1]+4 > menus.length-1){
                setMenuNum([menuNum[0]+4, menus.length-1])
            }else{
                setMenuNum([menuNum[0]+4, menuNum[1]+4])
            }
        }
    }
    function onEditMenu(e){
        setEditMenu(true);
        setMenuId(e.target.id);
    }

    async function onDeleteMenu(e){
        await dispatch(deleteMenuThunk(e.target.id))
    }

    return (
        <>
        {business&&(
            <div className="business-detail">
                <div className="form-table">
                    <div className="business-info">
                        <div className="image-Outer">
                        {business.coverImg.length>0&&
                        <img className="image" src={business.coverImg} onError={e=>{e.target.src='https://www.digitalcitizen.life/wp-content/uploads/2020/10/photo_gallery.jpg'
                                                                                    e.onerror=null}} alt="businessImg">
                        </img>}
                        <div className="restaurant-intro">
                            <div className="restaurant-name">{business.name}</div>
                            {user && user.id===business.ownerId && (
                            <div className="ed-business">
                                <i id={`${business.id}`} onClick={edit} className="fa-solid fa-pen-to-square"></i>
                                <i onClick={deleteBusiness} className="fa-solid fa-trash"></i>
                            </div>
                            )}
                            {reviews.length>0 &&
                            <div className="reviews-intro-bar">
                                <span className="fa fa-star checked"></span>
                                <div className="restaurant-reviews">{reviewAvg}</div>
                                <div className="restaurant-bar">{reviews.length} Reviews</div>
                            </div>}
                        </div>
                        </div>
                        <div className="top-buttons">
                        {user && (
                            <button onClick={newMenu} className="add-menu-button">Add Menu</button>
                        )}
                        {user && (
                            <button onClick={newReview}>Write a review</button>
                        )}
                        </div>
                        <div className="restaunrant-container">
                        <div className="restaurant-infos">
                            <div className="menu-container">
                                <div className="menu-bar">
                                    <div className="menu-header">Menu</div>
                                    {user &&
                                        <i className="fa-solid fa-plus" onClick={()=>setAddMenu(true)} id="add-menu"></i>
                                    }
                                </div>
                                <div className="menu-slider">
                                    {menus.length>0 &&
                                    <div>
                                        <i className="fa-solid fa-angle-left" id={menuNum[0]===0 ? "no-left-arrow" : "left-arrow"} onClick={prevSlide}></i>
                                        <i className="fa-solid fa-angle-right" id={menuNum[1]===menus.length-1 ? "no-right-arrow" : "right-arrow"} onClick={nextSlide}></i>
                                    </div>
                                    }
                                {menus && (menus.map((menu, index)=>{
                                    if(menuNum[0]<=index && menuNum[1]>=index){
                                        return (
                                            <div key={menu.id}>
                                                <div className="image-shown">
                                                    <img className="menu-image" src={menu.image_url} onError={e=>{e.target.src='https://www.happyeater.com/images/default-food-image.jpg'; e.onerror=null}} alt='i'></img>
                                                    <div className="menu-price">$ {menu.price}</div>
                                                    <div className="menu-change">
                                                        <i className="fas fa-edit" onClick={onEditMenu} id={`${menu.id}`}></i>
                                                        <i className="fa-solid fa-trash" onClick={onDeleteMenu} id={`${menu.id}`}></i>
                                                    </div>
                                                </div>
                                                <div className="menu-n">{menu.name}</div>
                                            </div>
                                            )
                                        }else{
                                            return false
                                        }
                                }))}
                                {menus.length===0&&
                                    <div className="no-menus">No menus available</div>
                                }
                                </div>
                                <div className="reviews-header">
                                    <div>Reviews</div>
                                    {user && <i className="fa-solid fa-plus" onClick={()=>setAddReview(true)} id="add-review"></i>}
                                </div>
                                <GetReviews businessId={businessId}  />
                            </div>
                            <div>
                                <div className="restaurant-info">
                                    <p>Phone Number: {business.phoneNumber} </p>
                                    <p>Description: {business.description}</p>
                                    <p>Address: {business.address },  {business.city},   {business.state}</p>
                                    <p>Zip Code: {business.zipCode}</p>
                                </div>
                                <div className="map-Outer">
                                    {/* {!isLoaded ? (
                                        <h1>Loading...</h1>
                                    ) : (
                                        <GoogleMap
                                        mapContainerClassName="map-container"
                                        center={center}
                                        zoom={10}
                                        onLoad={map=>setMap(map)}>
                                            <AdvancedMarker position={{ lat: latitude, lng: longitude }}  />
                                        </GoogleMap>
                                    )} */}

                                    {!isLoaded ? (
                                        <h1>Loading...</h1>
                                    ) : (
                                        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
                                                <Map center={center} zoom={10} mapId={process.env.REACT_APP_MAP_ID}>
                                                    <AdvancedMarker position={center}>

                                                    </AdvancedMarker>
                                                </Map>
                                        </APIProvider>)}
                                </div>
                            </div>

                        </div>
                        </div>
                    </div>
                </div>
            </div>
            )
            }
            {/* {reqLog&&(
                <Modal onClose={() => setReqLog(false)}>
                    <LoginForm />
                </Modal>)} */}
            {editBusiness&&<EditBusinessModal restaurantId={businessId} onClose={()=>setEditBusiness(false)}/> }
            {addReview && <AddReviewModal restaurantId={businessId} onClose={()=>setAddReview(false)} />}
            {addMenu && <AddMenuModal onClose={()=>setAddMenu(false)} restaurantId = {businessId} />}
            {editMenu && <EditMenuModal onClose={()=>setEditMenu(false)} menuId={menuId} restaurantId={businessId} />}
        </>
    )
}

export default BusinessDetail;
