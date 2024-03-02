import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addReviewThunk } from "../../store/review";
import './AddReview.css'

function AddReview ({restaurantId, onClose}){
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);
    const user = useSelector(state=>state.session.user)

    async function onSubmit(e){
        e.preventDefault();

        const review = {
            userId: user.id,
            businessId: restaurantId,
            rating,
            comment
        }
        return dispatch(addReviewThunk(review))
            .then(()=>(onClose()))
            .catch(async (res)=>{
                const data = await res.json();
                setErrors(data.errors)
            })
    }
    return (

        <div className="review-outer">
            <div className="add-review-header">
                <div>Add new review</div>
            </div>
            <div className="errors-handler-review">
                    {errors && errors.map((error, key)=>
                        <div key={key}>* {error}</div>
                    )}
                </div>
            <form className="add-review-form" onSubmit={onSubmit}>
                <input type="number" name="rating" placeholder="rating" onChange={(e)=>setRating(e.target.value)}></input>
                <textarea name="comment" placeholder='write your comment' rows="3" cols="20" onChange={(e)=>setComment(e.target.value)}></textarea>
                <button type="submit">Submit</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>
    )
}

export default AddReview;
