import { csrfFetch } from "./csrf";

const ADD_REVIEW = '/add/review';
const READ_REVIEW = '/get/reviews';
const EDIT_REVIEW = './edit/review';
const DELETE_REVIEW = '/delete/review'

const getReview = (reviews)=>({
    type: READ_REVIEW,
    reviews
})

const addReview= (review)=>({
    type: ADD_REVIEW,
    review
})

const editReview = (review)=>({
    type: EDIT_REVIEW,
    review
})

const deleteReview= (reviewId)=>({
    type: DELETE_REVIEW,
    reviewId
})

export const getReviewsThunk =(businessId)=> async(dispatch)=>{
    const response = await csrfFetch(`/api/reviews/${businessId}/all`)
    if(response.ok){
        const data = await response.json();
        dispatch(getReview(data))
        return null;
    }else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    }
}

export const addReviewThunk =(review)=> async(dispatch)=>{
    const response = await csrfFetch('/api/reviews/new',{
        method: "POST",
        body: JSON.stringify(review)
    })
    if(response.ok){
        const data = await response.json();
        console.log(data)
        dispatch(addReview(data))
        return null;
    }else if (response.status < 500) {
        const data = await response.json();
        console.log(data.errors)
        if (data.errors) {
        return data.errors;
        }
    }
}

export const editReviewThunk = (review) => async(dispatch)=>{
    const response = await csrfFetch(`/api/reviews/${review.id}/edit`,{
        method:"PUT",
        body: JSON.stringify(review)
    })
    if(response.ok){
        const data = await response.json();
        console.log(data)
        dispatch(editReview(data.review))
        return data
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
        return null;
    }else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    }
}


const initialState={}

const reviewsReducer = (state=initialState, action)=>{
    let newState = {...state };

    switch(action.type){

        case READ_REVIEW:
            newState={}
            action.reviews.forEach(review=>{
                newState[review.id] = review
            })
            return newState;

        case ADD_REVIEW:
            newState[action.review.id] = action.review
            // newState[action.review.review.id]['User'] = action.review.review.user
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
