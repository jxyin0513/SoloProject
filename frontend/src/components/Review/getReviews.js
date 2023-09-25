import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getReviewsThunk, deleteReviewThunk } from "../../store/review";
import EditReviewModal from "../Review/EditReviewModal";
import './getReview.css';

function GetReviews({businessId}){
    const dispatch = useDispatch();
    const reviews = Object.values(useSelector(state=>state.reviews));
    const user = useSelector(state=>state.session.user);
    const [editReview, setEditReview] = useState(false);
    const [reviewId, setReviewId] = useState(0);

    useEffect(()=>{
        dispatch(getReviewsThunk(businessId))
    }, [dispatch, businessId])

    async function onDelete(e){
        e.preventDefault();
        return dispatch(deleteReviewThunk(e.target.id))
    }
    function onEdit(e){
        setEditReview(true)
        setReviewId(e.target.id)
    }

    return (
        <div>
            {reviews && (reviews.map(review=>(
                <div key={review.id}>
                    <img alt="user" className="user-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"></img>
                    <div className="review-user">{review.User.username}</div>
                    <div className="rating-tag">Rating: {review.rating}</div>
                    <div className="review-comment">{review.comment}</div>
                    <div className="review-Updated">{review.updatedAt}</div>
                    {user&&user.id===review.userId&&(
                        <div className="review-edit-outer">
                            <i className="fas fa-edit" id={`${review.id}`} onClick={onEdit}></i>
                            <i className="fa-solid fa-trash" id={`${review.id}`} onClick={onDelete}></i>
                        </div>
                    )}
                </div>
            )))}
            {reviews.length===0 &&
                <div className="no-reviews">0 reviews</div>
            }
            {editReview && <EditReviewModal reviewId={reviewId} onClose={()=>setEditReview(false)} />}
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
