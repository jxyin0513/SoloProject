import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addReviewThunk } from "../../store/business";
import {Redirect} from 'react-router-dom';

function AddReview ({user, business}){

    const dispatch = useDispatch();
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('');

    async function onSubmit(e){
        e.preventDefault();

        const review = {
            userId: user.id,
            businessId: business.id,
            rating,
            comment
        }

        const newReview = await dispatch(addReviewThunk(review, business.id))
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <label>rating
                    <input type="text" name="rating" value={rating} onChange={(e)=>setRating(e.target.value)}></input>
                </label>
                <label>
                    <textarea name="comment" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AddReview;
