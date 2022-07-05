import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addReviewThunk } from "../../store/review";
import './AddReview.css'

function AddReview ({business, hide}){

    const dispatch = useDispatch();
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('');
    const [coverImg, setCoverImg] = useState('')
    const [errors, setErrors] = useState([]);
    const user = useSelector(state=>state.session.user)

    useEffect(()=>{
        const error=[]
        if(rating>5 || rating<1){
            error.push("Rating must be between 1-5.")
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
            coverImg,
            comment
        }

        // const addReview =

        return dispatch(addReviewThunk(review, business.id))
            .then(()=>hide())
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
        <>

            <form className="add-review" onSubmit={onSubmit}>
                <ul>
                    {errors.length!==0&&errors.map(error=>
                        <li className="errors">{error}</li>
                    )}
                </ul>
                <label>rating
                    <input type="number" name="rating" value={rating} onChange={(e)=>setRating(e.target.value)}></input>
                </label>
                <label>Comment
                    <textarea name="comment" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                </label>
                <label>Image:
                    <input type="text" name="coverImg" value={coverImg} onChange={e=>setCoverImg(e.target.value)}></input>
                </label>
                <button type="submit" disabled={errors.length===0 ? false : true}>Submit</button>
                <button onClick={hide}>Cancel</button>
            </form>

        </>
    )
}

export default AddReview;
