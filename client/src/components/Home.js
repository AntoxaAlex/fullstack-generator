import React,{useState,Fragment,useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../actions/auth";
import {getAllProjects} from "../actions/project";

const Home = ({logout, getAllProjects, project:{projects,loading}}) =>{
    useEffect(()=>{
        getAllProjects()
    },[])
    return(
        <Fragment>
            <button type="button" onClick={(e)=>logout()}>Logout</button>
            <Link to="/new">Create new project</Link>
            <div id="projects">
                {!loading && projects && projects.map((project,i)=>{
                    return(
                        <div key={i}>
                            <h3>{project.title}</h3>
                            <p>{project.purpose}</p>
                            <p>{project.stack}</p>
                            <ol>
                                {project.goals.map((goal,i)=>{
                                    return(
                                        <li key={i}>{goal}</li>
                                    )
                                })}
                            </ol>
                            <Link to={"/project/" + project._id} className="btn btn-outline-info">See more</Link>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

Home.protoTypes = {
    logout: PropTypes.func.isRequired,
    getAllProjects: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project: state.project
})

export default connect(mapStateToProps,{logout,getAllProjects})(Home)