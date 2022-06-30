import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getBusinessesThunk, deleteBusinessThunk } from "../../store/business";
// import BusinessDetail from "./BusinessDetail";
// import {Route} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function AllBusinesses(){
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user)
    const allBusinesses = useSelector(state=>state.allBusinesses);
    const [detail, setDetail] = useState(false);

    useEffect(()=>{
        dispatch(getBusinessesThunk())
    },[dispatch])

    function deleteBusiness(e){
        dispatch(deleteBusinessThunk(e.target.id))
    }

    return (
        <>
        {allBusinesses&&(
            <ul>
                {Object.values(allBusinesses).map(business=>{
                    return (
                        <div>
                            <li key={business.id} >{business.name}</li>

                            <NavLink to={`/businesses/${business.id}`}>
                                <button className={business} id={business.id} >Detail</button>
                            </NavLink>


                            {/* <Route path={`/businesses/:businessId`}>
                                <BusinessDetail />
                            </Route> */}




                        </div>
                    )
                })}

            </ul>
            )}
        </>
    )
}

export default AllBusinesses;
