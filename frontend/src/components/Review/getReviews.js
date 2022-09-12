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
    }, [dispatch, businessId])

    async function onDelete(e){
        e.preventDefault();
        const deletedReview = await dispatch(deleteReviewThunk(e.target.id))
    }

    return (
        <div>
            {reviewsArr&&(reviewsArr.map(review=>(
                <div key={review.id}>
                    <img alt="user" className="user-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"></img>
                    <div className="review-user">{review.User.username}</div>
                    <div className="rating-tag">Rating: {review.rating}</div>
                    <div className="review-comment">{review.comment}</div>
                    <div className="review-Updated">{review.updatedAt}</div>
                    {user&&user.id===review.userId&&(
                        <i className="fa-solid fa-trash" id="review-delete" onClick={onDelete}></i>
                    )}
                </div>
            )))}
            {/* // <div className="review-table">

            //     <table>
            //         <thead>
            //             <tr>
            //                 <th>rating</th>
            //                 <th>comment</th>
            //             </tr>
            //         </thead>

            //         <tbody>
            //             {
            //             reviewsArr.map(review=>{
            //                 return(
            //                     <tr key={review.id}>
            //                         <td >{review.rating}</td>
            //                         <td >{review.comment}</td>
            //                         {user&&user.id===review.userId&&
            //                         <td >
            //                             <button type="submit" id={review.id} onClick={onClick}>Delete</button>
            //                         </td>}
            //                     </tr>
            //                     )
            //                 })}
            //         </tbody>
            //     </table>
            // </div> */}

        </div>
    )
}

export default GetReviews;
