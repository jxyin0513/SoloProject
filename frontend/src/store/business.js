import { csrfFetch } from "./csrf";

const ADD_BUSINESS = '/business/add'
const READ_BUSINESS = '/business/read'
const EDIT_BUSINESS ='/business/edit'
const DELETE_BUSINESS ='/business/delete'

const addBusiness = (business, owner)=>({
    type: ADD_BUSINESS,
    business,
    owner
})

const getBusinesses = (businesses)=>({
    type: READ_BUSINESS,
    businesses
})

const editBusiness = (business)=>({
    type: EDIT_BUSINESS,
    business
})

const removeBusiness= (businessId)=>({
    type:DELETE_BUSINESS,
    businessId
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

export const editBusinessThunk =(business) => async dispatch=>{
    console.log(business)
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
const initialState = {}

const businessDetailReducer = (state=initialState, action)=>{
    let newState = {...state}
    switch(action.type){
        case ADD_BUSINESS:
            console.log(action.business, action.owner)
            const businessData = {"businessData" : action.business}
            const user = {"user": action.owner}
            newState[action.business.id]= businessData
            newState[action.business.id]= user

            return newState;

        case READ_BUSINESS:
            action.businesses.forEach(business=>{
                newState[business.id]=business
            })
            return newState;
        case DELETE_BUSINESS:
            delete newState[action.businessId]
            return newState;
        default:
            return state;
    }
}

export const businesseslReducer = (state=initialState, action)=>{
    let newState = {...state}
    switch(action.type){
        case ADD_BUSINESS:
            newState[action.business.id.businessData] = action.business
            newState[action.business.id.user] = action.owner
            return newState;
        case READ_BUSINESS:
            action.businesses.forEach(business=>{
                newState[business.id]= business
            })
            return newState;

        case DELETE_BUSINESS:
            delete newState[action.businessId]
            return newState;
        default:
            return state;
    }
}


export default businessDetailReducer;
