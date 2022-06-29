import { csrfFetch } from "./csrf";

const ADD_BUSINESS = '/business/add'
const READ_BUSINESS = '/business/read'
const READ_BUSINESS_DETAIL = 'business/detail';
const EDIT_BUSINESS ='/business/edit'
const DELETE_BUSINESS ='/business/delete'
const ADD_REVIEW = '/add/review';
const READ_REVIEW = '/get/reviews'
const DELETE_REVIEW = '/delete/review'

const addBusiness = (business, owner)=>({
    type: ADD_BUSINESS,
    business,
    owner
})

const getBusinesses = (businesses)=>({
    type: READ_BUSINESS,
    businesses
})

const getBusinessDetail = (business)=>({
    type: READ_BUSINESS_DETAIL,
    business
})
const editBusiness = (business)=>({
    type: EDIT_BUSINESS,
    business
})

const removeBusiness= (businessId)=>({
    type:DELETE_BUSINESS,
    businessId
})
const addReview= (review, businessId)=>({
    type: ADD_REVIEW,
    review,
    businessId
})

const getReview = (reviews, businessId)=>({
    type: READ_REVIEW,
    reviews,
    businessId
})

const deleteReview= (reviewId)=>({
    type: DELETE_REVIEW,
    reviewId
})

export const addBusinessThunk = (business, owner)=> async dispatch=>{
    const response = await csrfFetch("/api/businesses/create-business",{
        method: "POST",
        body: JSON.stringify(business)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(addBusiness(data, owner))
        return data;
    }else{
        return false;
    }
}

export const getBusinessesThunk =()=>async dispatch=>{
    const response = await csrfFetch("/api/businesses")
    if(response.ok){
        const data = await response.json();
        dispatch(getBusinesses(data))
        return data;
    }else{
        return false;
    }
}
export const getBusinessDetailThunk =(business)=>async dispatch=>{
    const response = await csrfFetch(`/api/businesses/${business.id}`)
    if(response.ok){
        const data = await response.json();
        dispatch(getBusinessDetail(data))
        return data;
    }else{
        return false;
    }
}

export const editBusinessThunk =(business) => async dispatch=>{
    const response = await csrfFetch(`/api/businesses/${business.id}/edit`,{
        method: "POST",
        body: JSON.stringify(business)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(editBusiness(data))
        return data;
    }else{
        return false;
    }
}

export const deleteBusinessThunk = (businessId)=> async dispatch=>{
    const response = await csrfFetch(`/api/businesses/${businessId}/delete`,{
        method: "POST",
    })
    if(response.ok){
        const data = await response.json();
        dispatch(removeBusiness(data))
        return data;
    }else{
        return false;
    }
}
export const addReviewThunk =(review, businessId)=> async(dispatch)=>{
    const response = await csrfFetch('/api/reviews',{
        method: "POST",
        body: JSON.stringify(review)
    })
    if(response.ok){
        const data = await response.json();
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
        console.log("here")
        dispatch(getReview(data, businessId))
        return data;
    }else{
        return false;
    }
}

export const deleteReviewThunk =(reviewId, businessId)=> async(dispatch)=>{
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

const initialDetailState = {reviews: {}}

const businessDetailReducer = (state=initialDetailState, action)=>{
    let newState = {...state}
    switch(action.type){
        case ADD_BUSINESS:
            newState[action.business.id]= action.business
            newState[action.business.id]["user"]= action.owner
            return newState;

        case READ_BUSINESS_DETAIL:
            newState[action.business.id] = action.business
            return newState;

        case EDIT_BUSINESS:
            return {...state, [action.business.id]:action.business, user:{...state.user}}

        case DELETE_BUSINESS:

            delete newState[action.businessId]
            return newState;

        case ADD_REVIEW:
            newState.reviews[action.review.id] = action.review
            // return {...state, [action.businessId]: {["reviews"]: {[action.review.id]: action.review}}}
            return newState
        case READ_REVIEW:
            // newState[action.businessId]={}
            // newState[action.businessId]["reviews"]={}
            action.reviews.forEach(review=>{

                // newState[action.businessId.reviews][review.id] = review
                newState.reviews[review.id] = review
            })
            return newState;

        case DELETE_REVIEW:
            delete newState.reviews[action.reviewId];
            return newState;
        default:
            return state;
    }
}
const initialstate = {}

export const businesseslReducer = (state=initialstate, action)=>{
    let newState = {...state}
    switch(action.type){
        // case ADD_BUSINESS:
        //     newState[action.business.id]= {}
        //     newState[action.business.id]["businessData"]= action.business
        //     newState[action.business.id]["user"]= action.owner
        //     return newState;
        case READ_BUSINESS:
            action.businesses.forEach(business=>{
                newState[business.id]= business
            })
            return newState;

        case EDIT_BUSINESS:
            return {...state, [action.business.id]:action.business, user:{...state.user}}

        case DELETE_BUSINESS:
            delete newState[action.businessId]
            return newState;
        default:
            return state;
    }
}


export default businessDetailReducer;
