import { csrfFetch } from "./csrf";

const ADD_REVIEW = '/add/review';
const READ_REVIEW = '/get/reviews';
const EDIT_REVIEW = './edit/review';
const DELETE_REVIEW = '/delete/review'

const addReview= (review, businessId)=>({
    type: ADD_REVIEW,
    review,
    businessId
})

const getReview = (reviews)=>({
    type: READ_REVIEW,
    reviews
})

const editReview = (review)=>({
    type: EDIT_REVIEW,
    review
})

const deleteReview= (reviewId)=>({
    type: DELETE_REVIEW,
    reviewId
})

export const addReviewThunk =(review, businessId)=> async(dispatch)=>{
    const response = await csrfFetch('/api/reviews',{
        method: "POST",
        body: JSON.stringify(review)
    })
    if(response.ok){
        const data = await response.json();
        console.log(data)
        dispatch(addReview(data, businessId))
        return data;
    }else{
        return false;
    }
}

export const getReviewsThunk =(businessId)=> async(dispatch)=>{
    const response = await csrfFetch(`/api/reviews/${businessId}/all`)
    if(response.ok){
        const data = await response.json();
        dispatch(getReview(data))
        return data;
    }else{
        return false;
    }
}

export const editReviewThunk = (review) => async(dispatch)=>{
    const response = await csrfFetch(`/api/reviews/${review.id}/edit`,{
        method:"PUT",
        body: JSON.stringify(review)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(editReview(data))
        return data;
    }else{
        return false;
    }
}

export const deleteReviewThunk =(reviewId)=> async(dispatch)=>{
    const response = await csrfFetch(`/api/reviews/${reviewId}/delete`,{
        method:"POST"
    })
    if(response.ok){
        const data = await response.json();
        dispatch(deleteReview(reviewId))
        return data;
    }else{
        return false;
    }
}


const initialState={}

const reviewsReducer = (state=initialState, action)=>{
    let newState = {...state };

    switch(action.type){

        case ADD_REVIEW:
            newState[action.review.id] = action.review
            return newState;

        case READ_REVIEW:
            newState={}
            action.reviews.forEach(review=>{
                newState[review.id] = review
            })
            return newState;

        case EDIT_REVIEW:
            newState[action.review.id] = action.review
            return newState;

        case DELETE_REVIEW:
            delete newState[action.reviewId];
            return newState;

        default:
            return state;
    }
}

export default reviewsReducer;
