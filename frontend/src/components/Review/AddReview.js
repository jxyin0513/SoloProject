import React, {useState, useEffect} from "react";
import {useDispatch} from 'react-redux';
import { addReviewThunk } from "../../store/review";
import {Redirect} from 'react-router-dom';
import './AddReview.css'

function AddReview ({user, business}){

    const dispatch = useDispatch();
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        const error=[]
        if(Number(rating)>5 || Number(rating)<0){
            error.push("Rating must be between 0 and 5.")
        }
        if(comment.length>255){
            error.push("Please provide a comment less than 255 character")
        }
        setErrors(error);
    },[rating, comment])

    async function onSubmit(e){
        e.preventDefault();

        const review = {
            userId: user.id,
            businessId: business.id,
            rating,
            comment
        }

        await dispatch(addReviewThunk(review, business.id))
    }
    return (
        <>
            <form className="add-review" onSubmit={onSubmit}>
                <ul>
                    {errors.length!==0&&errors.map(error=>
                        <li>{error}</li>
                    )}
                </ul>
                <label>rating
                    <input type="text" name="rating" value={rating} onChange={(e)=>setRating(e.target.value)}></input>
                </label>
                <label>Comment
                    <textarea name="comment" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                </label>
                <button type="submit" disabled={errors.length===0 ? false : true}>Submit</button>
            </form>
        </>
    )
}

export default AddReview;
