import React, { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getBusinessesThunk, deleteBusinessThunk } from "../../store/business";
import BusinessDetail from "./BusinessDetail";
import {Route} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function AllBusinesses(){
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user)
    const allBusinesses = useSelector(state=>state.allBusinesses);

    useEffect(()=>{
        dispatch(getBusinessesThunk())
    },[dispatch])

    function deleteBusiness(e){
        dispatch(deleteBusinessThunk(e.target.id))
    }

    return (
        <>
        {allBusinesses&&(
            <li>
                {Object.values(allBusinesses).map(business=>{
                    return (
                        <div id={business.id}>
                            <ul key={business.id}>{business.name}</ul>
                            {user&&user.id===business.ownerId &&
                            <>
                                <button id={business.id} onClick={deleteBusiness}>Delete</button>
                                <NavLink to={`/businesses/${business.id}`}>
                                    <button className={business} id={business.id} >Edit</button>
                                </NavLink>
                                <Route path={`/businesses/:businessId`}>
                                    <BusinessDetail />
                                </Route>
                            </>

                            }
                        </div>
                    )
                }

                )}
            </li>)
            }
        </>
    )
}

export default AllBusinesses;
