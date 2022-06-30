import React, { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getReviewsThunk, deleteReviewThunk } from "../../store/review";

function GetReviews({businessId}){
    const dispatch = useDispatch();
    console.log(businessId)
    const reviews = useSelector(state=>state.reviews);
    const user = useSelector(state=>state.session.user)
    const reviewsArr = Object.values(reviews)

    useEffect(()=>{
        console.log("2nd")
        dispatch(getReviewsThunk(businessId))
    }, [dispatch])

    async function onClick(e){
        e.preventDefault();
        const deletedReview = await dispatch(deleteReviewThunk(e.target.id))
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