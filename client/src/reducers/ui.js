import {GET_UI,SET_TOOL,SET_CANVAS} from "../actions/types";

const initialState = {
    tool:null,
    canvas:null,
    loading: true
}

export default (state = initialState,action) => {
    const{type,payload} = action;
    switch (type) {
        case GET_UI:
            return{
                ...state,
                loading: false
            }
        case SET_CANVAS:
            return{
                ...state,
                canvas: payload,
                loading: false
            }
        case SET_TOOL:
            return {
                ...state,
                tool: payload,
                loading: false
            }
        default:
            return state
    }
}