import {SET_CANVAS,UNDO,REDO} from "../actions/types";

const initialState = {
    canvasContent:null,
    historyStep:-1,
    loading: true
}

export default (state = initialState,action) => {
    const{type,payload} = action;
    switch (type) {
        case SET_CANVAS:
            return{
                ...state,
                canvasContent: payload,
                historyStep: state.historyStep+1,
                loading: false
            }
        case UNDO:
            return {
                ...state,
                loading: false,
                historyStep: payload
            }
        case REDO:
            return {
                ...state,
                loading: false,
                historyStep: payload
            }


        default:
            return state
    }
}