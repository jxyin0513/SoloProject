import React, { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getReviewsThunk, deleteReviewThunk } from "../../store/review";
import './getReview.css';

function GetReviews({businessId}){
    const dispatch = useDispatch();
    const reviews = useSelector(state=>state.reviews);
    const user = useSelector(state=>state.session.user)
    const reviewsArr = Object.values(reviews)

    useEffect(()=>{
        dispatch(getReviewsThunk(businessId))
    }, [dispatch])

    async function onClick(e){
        e.preventDefault();
        const deletedReview = await dispatch(deleteReviewThunk(e.target.id))
    }

    return (
        <>
            {reviewsArr.length!==0&&
            <div className="review-table">
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
            </div>
                    }
        </>
    )
}

export default GetReviews;
