import React, { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getReviewsThunk, deleteReviewThunk } from "../../store/business";


function GetReviews({businessId}){
    const dispatch = useDispatch();

    const reviews = useSelector(state=>state.businessDetail.reviews);
    const user = useSelector(state=>state.session.user)
    const reviewsArr = Object.values(reviews);
    useEffect(()=>{
        dispatch(getReviewsThunk(businessId))
    }, [dispatch])

    async function onClick(e){
        e.preventDefault();
        const deletedReview = await dispatch(deleteReviewThunk(e.target.id, businessId))
    }

    return (
        <>
            {/* {reviews&& */}
            <table>
                <thead>
                    <tr>
                        <th>rating</th>
                        <th>comment</th>
                    </tr>
                </thead>

                <tbody>
                    {
                    reviewsArr.map(review=>{
                        return(
                            <tr>
                                <td key={review.id}>{review.rating}</td>
                                <td key={review.userId}>{review.comment}</td>
                                {user&&user.id===review.userId&&
                                <td >
                                    <button type="submit" id={review.id} onClick={onClick}>Delete</button>
                                </td>}
                            </tr>
                            )
                        })}
                </tbody>
            </table>


        </>
    )
}

export default GetReviews;
