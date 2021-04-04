import {REGISTER_SUCCESS,REGISTER_FAILED,LOGIN_SUCCESS,LOGIN_FAILED,LOGOUT,AUTH_ERR,USER_LOADED,CHANGE_THEME} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {setAlert} from "./alert";

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const resUser = await axios.get("/auth");
        dispatch({
            type: USER_LOADED,
            payload: resUser.data
        })
    }catch (e) {
        console.log(e.message);
        dispatch({
            type: AUTH_ERR
        })
    }
}

//Register
export const register = (firstname, secondname, email, password) => async dispatch =>{
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({
        firstname,
        secondname,
        email,
        password
    })
    try {
        const res = await axios.post("/user", body, config);
        console.log(res.data);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    }catch (e) {
        console.log(e.message);
        const errors = e.response.data.errors;
        errors.forEach(error=>dispatch(setAlert(error.msg,"danger")))
        dispatch({
            type: REGISTER_FAILED
        })
    }
}

//Login
export const login = (email,password) => async dispatch =>{
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({
        email,
        password
    })

    try {
        const res = await axios.post("/auth",body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
        dispatch(setAlert("Welcome back","success"))
    }catch (e) {
        console.log(e)
        const errors = e.response.data.errors;
        console.log(errors);
        errors.forEach(error=>dispatch(setAlert(error.msg,"danger")));
        dispatch({
            type: LOGIN_FAILED
        })
    }
}

//Change theme
export const changeTheme = () => async dispatch => {
    dispatch({
        type: CHANGE_THEME
    })
}
//Logout
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}