import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { editReviewThunk } from "../../store/review";

function EditReview ({id, onClose}){

    const dispatch = useDispatch();
    const review = useSelector(state=>state.reviews[id])
    const [rating, setRating] = useState(review.rating)
    const [comment, setComment] = useState(review.comment);
    // const [coverImg, setCoverImg] = useState('')
    const [errors, setErrors] = useState([]);
    const user = useSelector(state=>state.session.user)

    useEffect(()=>{
        const error=[]
        if(rating>5 || rating<1){
            error.push("Rating must be between 1-5.")
        }
        if(comment.length>255){
            error.push("Please provide comment less than 255 character")
        }
        setErrors(error);
    },[rating, comment])

    async function onSubmit(e){
        e.preventDefault();

        const review = {
            id,
            rating,
            comment
        }
        return dispatch(editReviewThunk(review))
            .then(()=>onClose())
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                return data;
            });
        // if(addReview){
        //     hide();
        // }
    }
    return (
        <div className="review-outer">
            <form className="edit-review" onSubmit={onSubmit}>
                <div className="errors-handler-review">
                    {errors.length!==0&&errors.map(error=>
                        <div>{error}</div>
                    )}
                </div>
                <label>rating
                    <input type="number" name="rating" value={rating} onChange={(e)=>setRating(e.target.value)}></input>
                </label>
                <label>Comment
                    <textarea name="comment" value={comment} rows="3" cols="20" onChange={(e)=>setComment(e.target.value)}></textarea>
                </label>
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
