import { csrfFetch } from "./csrf";

const ADD_REVIEW = '/add/review';
const READ_REVIEW = '/get/reviews'
const DELETE_REVIEW = '/delete/review'

const addReview= (review)=>({
    type: ADD_REVIEW,
    review
})

const getReview = (reviews, businessId)=>({
    type: READ_REVIEW,
    reviews,
    businessId
})

const deleteReview= (reviewId, businessId)=>({
    type: DELETE_REVIEW,
    reviewId,
    businessId
})


const addReviewThunk =(review)=> async(dispatch)=>{
    const response = await csrfFetch('/api/reviews',{
        method: "POST",
        body: JSON.stringify(review)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(addReview(data))
        return data;
    }else{
        return false;
    }
}

const getReviewsThunk =(businessId)=> async(dispatch)=>{
    const response = await csrfFetch(`/api/reviews/${businessId}/all`)
    if(response.ok){
        const data = await response.json();
        dispatch(getReview(data, businessId))
        return data;
    }else{
        return false;
    }
}

const deleteReviewThunk =(review)=> async(dispatch)=>{
    const response = await csrfFetch(`/api/reviews/${review.id}/delete`,{
        method:"POST"
    })
    if(response.ok){
        const data = await response.json();
        dispatch(deleteReview(data, businessId))
        return data;
    }else{
        return false;
    }
}
const initialState={}

const reviewDetailReducer= (state=initialState, action)=>{
    let newState = {...state};
    switch(action.type){
        case ADD_REVIEW:

            return {...state, [action.businessId]: {["reviews"]: {...state[action.businessId.reviews], [action.review.id]: action.review}}}

        case READ_REVIEW:
            action.reviews.forEach(review=>{
                newState[action.businessId]["reviews"]={}
                newState[action.businessId.reviews][review.id] = review
            })
            return newState;

        case DELETE_REVIEW:
            delete newState[action.businessId.reviews.action.reviewId];
            return newState;
    }
}

export default reviewDetailReducer;
