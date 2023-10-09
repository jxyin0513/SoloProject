import { csrfFetch } from "./csrf";

const GET_MENUS = '/get/menus';
const CREATE_MENU = '/create/menu';
const EDIT_MENU = '/edit/menu';
const DELETE_MENU = '/delete/menu';


const getMenus = (menus)=>({
    type: GET_MENUS,
    menus
})

const createMenu = (menu)=>({
    type: CREATE_MENU,
    menu
})

const editMenu = (menu)=>({
    type: EDIT_MENU,
    menu
})

const deleteMenu = (menu)=>({
    type: DELETE_MENU,
    menu
})

export const getMenusThunk = (id) => async(dispatch)=>{
    const response = await csrfFetch(`/api/menus/${id}`)
    if(response.ok){
        const data = await response.json();
        dispatch(getMenus(data))
        return data;
    }else{
        return false;
    }
}

export const createMenuThunk = (menu) => async(dispatch)=>{
    const response = await csrfFetch(`/api/menus/new`,{
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
          },
        body: JSON.stringify(menu)
    })
    if(response.ok){
        const data = await response.json();
        console.log(data)
        dispatch(createMenu(data))
        return data;
    }else{
        return false;
    }
}

export const editMenuThunk = (menu) => async(dispatch)=>{
    const response = await csrfFetch(`/api/menus/${menu.id}/edit`,{
        method: "PUT",
        body: JSON.stringify(menu)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(editMenu(data))
        return data;
    }else{
        return false;
    }
}

export const deleteMenuThunk = (id) => async(dispatch)=>{

    const response = await csrfFetch(`/api/menus/${id}/delete`,{
        method: "DELETE",
    })
    if(response.ok){
        const data = await response.json();
        dispatch(deleteMenu(data))
        return data;
    }else{
        return false;
    }
}

const initialState={}

const menuReducer = (state=initialState, action)=>{
    let newState={...state}
    switch(action.type){
        case GET_MENUS:
            newState={};
            action.menus.forEach(menu => {
                newState[menu.id] = menu
            });
            return newState;

        case CREATE_MENU:
            newState[action.menu.id] = action.menu
            return newState;

        case EDIT_MENU:
            newState[action.menu.id] = action.menu
            return newState;

        case DELETE_MENU:
            delete newState[action.menu.id]
            return newState;

        default:
            return state;
    }
}

export default menuReducer
