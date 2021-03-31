import {GET_ALL_PROJECTS,GET_PROJECT_BY_ID,NEW_PROJECT,PROJECT_ERROR, PROJECT_MODIFIED,PROJECT_DELETED} from "./types";
import axios from "axios";
import {setAlert} from "./alert";

//Get all projects
export const getAllProjects = () => async dispatch =>{
    try {
        const res = await axios.get("/projects");
        dispatch({
            type: GET_ALL_PROJECTS,
            payload: res.data
        })
    }catch (e) {
        console.log(e.message);
        dispatch({
            type: PROJECT_ERROR
        })
    }
}

export const getProjectById = (id) => async dispatch =>{
    try {
        console.log(id)
        const res = await axios.get("/projects/"+id)
        console.log(res.data)
        dispatch({
            type: GET_PROJECT_BY_ID,
            payload: res.data
        })
    }catch (e) {
        console.log(e.message);
        const errors = e.response.data.errors;
        errors.forEach(error=>dispatch(setAlert(error.msg, "danger")))
        dispatch({
            type: PROJECT_ERROR
        })
    }
}

//Create new project
export const createProject = (title,purpose,goals,frontArch,backArch) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({
        title,
        purpose,
        goals,
        frontArch,
        backArch
    })
    try {
        const res = await axios.post("/projects",body,config);
        dispatch({
            type: NEW_PROJECT,
            payload: res.data
        })
        dispatch(setAlert("New project is successfully created","success"))
    }catch (e) {
        console.log(e.message);
        const errors = e.response.data.errors;
        errors.forEach(error=>dispatch(setAlert(error.msg, "danger")))
        dispatch({
            type:PROJECT_ERROR
        })
    }
}

export const editProject = (reloadType,id,title,purpose,goals,users,frontend,backend,folders,checklist,interdependence,projectView,workingTime,theme) => async dispatch => {
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({
        title,
        purpose,
        goals,
        users,
        frontend,
        backend,
        folders,
        checklist,
        interdependence,
        projectView,
        workingTime,
        theme
    })
    try {
        const res = await axios.put("/projects/"+id,body,config);
        dispatch({
            type: PROJECT_MODIFIED,
            payload: res.data
        })
        if(reloadType === "manual"){
            dispatch(setAlert("Project is successfully modified","success"))
        }
    }catch (e) {
        console.log(e.message);
        dispatch({
            type: PROJECT_ERROR
        })
    }
}


export const deleteProject = (id) => async dispatch =>{
    try {
       const res = await axios.delete("/projects/"+id);
       if(res.data.status === "deleted"){
           dispatch({
               type: PROJECT_DELETED
           })
           dispatch(setAlert("Project is deleted","success"))
       }
    }catch (e) {
        console.log(e.message);
        dispatch({
            type: PROJECT_ERROR
        })
    }
}


