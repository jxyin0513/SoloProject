import React, { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getBusinessesThunk } from "../../store/business";
import { NavLink } from 'react-router-dom';
import './getBusinesses.css';

function AllBusinesses(){
    const dispatch = useDispatch();
    const allBusinesses = Object.values(useSelector(state=>state.allBusinesses));

    useEffect(()=>{
        dispatch(getBusinessesThunk())
    },[dispatch])

    return (
        <>
        {allBusinesses&&(
            <div className="all-businesses">
                {allBusinesses.map(business=>{
                    return (
                        <div key={business.id} className="each-business">
                            <NavLink to={`/businesses/${business.id}`}>
                                {business.logo&&
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
