import axios from "axios";
import {PROJECT_ERROR, PROJECT_MODIFIED} from "./types";
import {setAlert} from "./alert";

export const createFile = (id,folderIndex,section,type,title,features) => async dispatch =>{
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({
        folderIndex,
        section,
        type,
        title,
        features
    })

    try {
        const res = await axios.post(`/project/${id}/file`,body,config);
        dispatch({
            type: PROJECT_MODIFIED,
            payload: res.data
        })
    }catch (e) {
        console.log(e.message);
        dispatch({
            type: PROJECT_ERROR
        })
    }
}

export const editFile = (prject_id, file_id,section,type,title,features,subfiles) => async dispatch => {
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({section, type, title, features, subfiles})
    try {
        const res = await axios.put("/project/"+prject_id+"/file/"+file_id,body,config);
        dispatch({
            type: PROJECT_MODIFIED,
            payload: res.data
        })
        dispatch(setAlert("Project is successfully modified","success"))
    }catch (e) {
        console.log(e.message);
        dispatch({
            type: PROJECT_ERROR
        })
    }
}

export const removeFile = (project_id, file_id) => async dispatch =>{
    try {
        const res = await axios.delete(`/project/${project_id}/file/${file_id}`)
        dispatch({
            type: PROJECT_MODIFIED,
            payload: res.data
        })
    }catch (e) {
        console.log(e.message);
        dispatch({
            type: PROJECT_ERROR
        })
    }
}
