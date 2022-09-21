import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addReviewThunk } from "../../store/review";
import './AddReview.css'

function AddReview ({restaurantId, onClose}){

    const dispatch = useDispatch();
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('');
    // const [coverImg, setCoverImg] = useState('')
    const [errors, setErrors] = useState([]);
    const user = useSelector(state=>state.session.user)
    // console.log(restaurantId)

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
            userId: user.id,
            businessId: restaurantId,
            rating,
            comment
        }

        return dispatch(addReviewThunk(review))
                .then(()=>onClose())
                .catch(async (res) => {
                    const data = await res.json();
                    console.log(data)
                    if (data.errors) setErrors(data.errors);
                });

        // if(!addReview){
        //     onClose()
        // }else{
        //     setErrors(addReview)
        // }
        // if(addReview){
        //     hide();
        // }
    }
    return (

        <div className="review-outer">
            <div className="add-review-header">
                <div>Add new review</div>
            </div>
            <div className="errors-handler-review">
                    {errors && errors.map(error=>
                        <div>* {error}</div>
                    )}
                </div>
            <form className="add-review-form" onSubmit={onSubmit}>
                <input type="number" name="rating" placeholder="rating" value={rating} onChange={(e)=>setRating(e.target.value)}></input>
                <textarea name="comment" value={comment} placeholder='write your comment' rows="3" cols="20" onChange={(e)=>setComment(e.target.value)}></textarea>
                {/* <label>Image:
                    <input type="text" name="coverImg" value={coverImg} onChange={e=>setCoverImg(e.target.value)}></input>
                </label> */}
                <button type="submit">Submit</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>

    )
}

export default AddReview;
