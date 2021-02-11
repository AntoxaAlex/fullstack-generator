import {GET_PROJECT_BY_ID,GET_ALL_PROJECTS,PROJECT_ERROR,NEW_PROJECT,PROJECT_MODIFIED,PROJECT_DELETED} from "../actions/types";

const initialState = {
    project: null,
    projects: [],
    loading: true,
    isProjectModified: false,
    isProjectDeleted: false,
    errors:{}
}

export default (state = initialState, action) => {
    const {type,payload} = action;
    switch (type) {
        case NEW_PROJECT:
            return{
                ...state,
                project: payload,
                loading: false
            }
        case GET_ALL_PROJECTS:
            return {
                ...state,
                projects: payload,
                isProjectDeleted: false,
                isProjectModified: false,
                project: null,
                loading: false
            }
        case GET_PROJECT_BY_ID:
            return {
                ...state,
                project: payload,
                projects: null,
                loading: false
            }
        case PROJECT_MODIFIED:
            return {
                ...state,
                isProjectModified: true,
                project: payload,
                loading: false,
                projects: []
            }
        case PROJECT_DELETED:
            return {
                ...state,
                isProjectDeleted: true,
                project: null,
                loading: false,
                projects: []
            }
        case PROJECT_ERROR:
            return {
                project: null,
                projects: [],
                loading: false,
            }
        default:
            return state
    }
}