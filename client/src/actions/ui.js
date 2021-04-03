import {SET_CANVAS,UNDO,REDO} from "./types";


export const setHistoryArray = (content) => async dispatch => {
    console.log(content)
    dispatch({
        type: SET_CANVAS,
        payload: content
    })
}

export const undoContent = (step) => async dispatch => {
    dispatch({
        type: UNDO,
        payload: step
    })
}
export const redoContent = (step) => async dispatch => {
    dispatch({
        type: REDO,
        payload: step
    })
}
