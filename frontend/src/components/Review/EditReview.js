import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { editReviewThunk } from "../../store/review";
import './EditReview.css';

function EditReview ({id, onClose}){

    const dispatch = useDispatch();
    const review = useSelector(state=>state.reviews[id])
    const [rating, setRating] = useState(review.rating)
    const [comment, setComment] = useState(review.comment);
    const [errors, setErrors] = useState([]);
    const user = useSelector(state=>state.session.user)

    // useEffect(()=>{
    //     const error=[]
    //     if(rating>5 || rating<1){
    //         error.push("Rating must be between 1-5.")
    //     }
    //     if(comment.length>255){
    //         error.push("Please provide comment less than 255 character")
    //     }
    //     setErrors(error);
    // },[rating, comment])

    async function onSubmit(e){
        e.preventDefault();

        const review = {
            id,
            userId: user.id,
            rating,
            comment
        }
        return dispatch(editReviewThunk(review))
            .then(()=>onClose())
            .catch(async (res) => {
                const data = await res.json();
                if (data.errors) setErrors(data.errors);
                return data;
            });
    }
    return (
        <div className="review-outer">
            <div className="edit-review-header">
                <div>Edit Review</div>
            </div>
            <div className="errors-handler-review">
                {errors && (errors.map(error=>
                    <div>* {error}</div>
                ))}
            </div>
            <form className="edit-review-form" onSubmit={onSubmit}>

                <input type="number" name="rating" placeholder="rating" value={rating} onChange={(e)=>setRating(e.target.value)}></input>
                <textarea name="comment" value={comment} placeholder="write your comment" rows="3" cols="20" onChange={(e)=>setComment(e.target.value)}></textarea>
                {/* <label>Image:
                    <input type="text" name="coverImg" value={coverImg} onChange={e=>setCoverImg(e.target.value)}></input>
                </label> */}
                <button type="submit" disabled={errors.length===0 ? false : true}>Submit</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>
    )
}
export default EditReview;
