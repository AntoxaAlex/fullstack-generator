import React, {Fragment,useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout,changeTheme} from "../../actions/auth";
import {Link} from "react-router-dom";
import BootstrapSwitchButton from "bootstrap-switch-button-react/lib/bootstrap-switch-button-react";
import {useProjectContext} from "../../context/ProjectContext";

const Navbar = ({auth,project,changeTheme,logout}) => {

    const projectCtx = useProjectContext()

    const{changeProjectSection} = projectCtx

    const onChangeTheme = () => {
        let root = document.querySelector("#root")
        console.log(root)
        if(root.classList.contains("darkTheme")){
            console.log("contain dark theme")
            root.classList.remove("darkTheme");
            root.classList.add("lightTheme")
        }else if(root.classList.contains("lightTheme")){
            console.log("contain light theme")
            root.classList.remove("lightTheme");
            root.classList.add("darkTheme")
        }
        changeTheme()
    }

    return (
        <ul className="main-nav nav fixed-top">
            {auth.isAuthenticated ? <Fragment>
                {project.project ? <Link to="/" className="backBtn transparentBtn ml-2"><i className="fas fa-arrow-left"/></Link>
                    : <span id="spanId"><strong>id</strong>: {auth.user._id}</span>}
                {project.project && <div className="d-flex">
                    <div className="d-flex">
                        <button className="transparentBtn" onClick={()=>changeProjectSection("generalInfo")}>
                            <i className="fas fa-info"/>
                        </button>
                        <button className="transparentBtn" onClick={()=>changeProjectSection("checklist")}>
                            <i className="fas fa-tasks"/>
                        </button>
                        <button className="transparentBtn" onClick={()=>changeProjectSection("ui")}>
                            <i className="fas fa-tv"/>
                        </button>
                        <button className="transparentBtn" onClick={()=>changeProjectSection("decomposition")}>
                            <i className="fas fa-network-wired"/>
                        </button>
                    </div>
                </div> }
                <div className="d-flex">
                    <BootstrapSwitchButton
                        onlabel={<i className="far fa-moon"/>}
                        onstyle='dark'
                        offlabel={<i className="far fa-sun"/>}
                        offstyle='light'
                        onChange={() => onChangeTheme()}
                    />
                    <button type="button" className="transparentBtn mx-2" onClick={()=>logout()}><i className="fas fa-sign-out-alt"/></button>
                </div>
            </Fragment> : <Fragment>
                <div className="d-flex signBtns">
                    <Link className="nav-link" to="/signin">Login</Link>
                    <Link className="nav-link" to="/signup">Register</Link>
                </div>
            </Fragment>}
        </ul>
    );
};

Navbar.protoTypes = {
    auth: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    changeTheme: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth,
    project: state.project
})

export default connect(mapStateToProps,{logout,changeTheme})(Navbar);
