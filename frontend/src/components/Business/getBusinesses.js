import React, { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getBusinessesThunk } from "../../store/business";
// import BusinessDetail from "./BusinessDetail";
// import {Route} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './getBusinesses.css';

function AllBusinesses(){
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user)
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
                        <ul key={business.id} className="each-business">
                            <NavLink to={`/businesses/${business.id}`}>
                                {business.logo.length>0&&<img className="business-logo" alt="logo" src={`${business.logo}`} onError={e=>{e.target.src='https://e7.pngegg.com/pngimages/716/758/png-clipart-graphics-restaurant-logo-restaurant-thumbnail.png'; e.onerror=null}} ></img>}
                                <li key={business.id}>{business.name}</li>
                            </NavLink>
                            {/* <li key={business.id}>{business.name}</li>
                            <li>{business.phoneNumber}</li> */}
                            {/* <NavLink to={`/businesses/${business.id}`}>
                                <button className={business} id={business.id} >Detail</button>
                            </NavLink> */}


                            {/* <Route path={`/businesses/:businessId`}>
                                <BusinessDetail />
                            </Route> */}




                        </ul>
                    )
                })}

            </div>
            )}
        </>
    )
}

export default AllBusinesses;
