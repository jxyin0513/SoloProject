import { csrfFetch } from "./csrf";

const ADD_SESSION = "/add/session";
const REMOVE_SESSION = "/remove/session"

export const addUser = (user)=>{
    return {
        type: ADD_SESSION,
        user
    }
}

export const removeUser = (userId)=>{
    return{
        type: REMOVE_SESSION,
        userId
    }
}

export const addUserThunk = (user)=> async (dispatch)=>{
    const {credential, password} = user
    const response = await csrfFetch('/api/session',{
        method: "POST",
        body: JSON.stringify({credential, password})
    })
    if(response.ok){
        const data = await response.json();
        dispatch(addUser(data.user));
        return user;
    }else{
        return false;
    }
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    if(response.ok){
       const data = await response.json();
        dispatch(addUser(data.user));
        return data;
    }
  };

const initialState = { user: null }

const sessionReducer = (state=initialState, action)=>{
    let newState = {...state}
    switch(action.type){
        case ADD_SESSION:
            console.log("here")
            newState.user= action.user;
            return newState;
        case REMOVE_SESSION:
            newState.user = null;
            return newState;
        default:
            return state;

    }
}

export default sessionReducer;
