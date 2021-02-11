import {LOGIN_SUCCESS, REGISTER_SUCCESS,REGISTER_FAILED,LOGIN_FAILED,LOGOUT,USER_LOADED,AUTH_ERR} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = initialState, action) {
    const {type,payload} = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token",payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAILED:
        case LOGIN_FAILED:
        case LOGOUT:
        case AUTH_ERR:
            localStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null
            }
        default:
            return state

    }
}