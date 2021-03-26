import {combineReducers} from "redux";
import alert from "./alert";
import auth from "./auth";
import project from "./project";
import ui from "./ui"

export default combineReducers({
    alert,
    auth,
    project,
    ui
});