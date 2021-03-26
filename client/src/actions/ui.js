import {GET_UI,SET_TOOL,SET_CANVAS} from "./types";

// Get UI
export const getUI = () => async dispatch => {
    dispatch({
        type: GET_UI
    })
}

export const setCanvas = (canvas) => async dispatch => {
    dispatch({
        type: SET_CANVAS,
        payload: canvas
    })
}

export const setTool = (tool) => async dispatch => {
    console.log(tool)
    dispatch({
        type: SET_TOOL,
        payload: tool
    })
}