import React, { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getBusinessesThunk } from "../../store/business";
// import BusinessDetail from "./BusinessDetail";
// import {Route} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './getBusinesses.css';

function AllBusinesses(){
    const dispatch = useDispatch();
    // const user = useSelector(state=>state.session.user)
    const allBusinesses = useSelector(state=>state.allBusinesses);

    useEffect(()=>{
        dispatch(getBusinessesThunk())
    },[dispatch])

    // function deleteBusiness(e){
    //     dispatch(deleteBusinessThunk(e.target.id))
    // }

    return (
        <>
        {allBusinesses&&(
            <div className="all-businesses">
                {Object.values(allBusinesses).map(business=>{
                    return (
                        <div key={business.id} className="each-business">
                            <NavLink to={`/businesses/${business.id}`}>
                                {business.logo.length>0&&
                                <img className="business-logo" alt="logo" src={`${business.logo}`} onError={e=>{e.target.src='https://e7.pngegg.com/pngimages/716/758/png-clipart-graphics-restaurant-logo-restaurant-thumbnail.png'; e.onerror=null}} ></img>}
                                <div key={business.id}>{business.name}</div>
                            </NavLink>
                        </div>
                    )
                })}

            </div>
            )}
        </>
    )
}

export default AllBusinesses;
