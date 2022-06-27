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

const initialState = {}

const businessReducer = (state=initialState, action)=>{
    let newState = {...state}
    switch(action.type){
        case ADD_BUSINESS:
            newState[action.business.id] = action.business;
            newState[action.owner.username] = action.owner;
            return newState;
        default:
            return state;
    }
}

export const businessDetailReducer = (state=initialState, action)=>{
    let newState = {...state}
    switch(action.type){
        case ADD_BUSINESS:
            newState[action.business.id] = action.business
            newState[action.owner.username] = action.owner
            return newState;

        default:
            return state;
    }
}


export default businessReducer;
