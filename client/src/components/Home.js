import React,{useState,Fragment,useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../actions/auth";
import {getAllProjects} from "../actions/project";
import Modal from "./modals/Modal";
import Navbar from "./layout/Navbar";
import Loading from "./layout/Loading";
import { v4 as uuidv4 } from 'uuid';

const Home = ({logout, getAllProjects, project:{projects,loading}}) =>{
    const[searchedText,setSearchedText] = useState("")
    const[projectsState,setProjects] = useState([])
    const[filteredProjects,setFilteredProjects]= useState([])
    const[isCreationModalActive,setCreationModal] = useState(false)
    useEffect(()=>{
        getAllProjects()
    },[])
    useEffect(()=>{
        setProjects( loading || !projects ? [] : projects)
        setFilteredProjects( loading || !projects ? [] : projects)
    },[projects])

    const addHiddenPanel = (i) => {
        console.log("add")
        document.querySelector("#projectCard"+i).classList.add("showPanel")
    }
    const removeHiddenPanel = (i) => {
        document.querySelector("#projectCard"+i).classList.remove("showPanel")
    }

    const completePer = (project) => {
        let completedTasks = 0;
        let allTasks = 0;
        project.checklist.map(item=>{
            const arrLength = item.paragraphs.filter(paragraph=>paragraph.isParCompleted).length
            const allLength = item.paragraphs.length
            completedTasks += arrLength
            allTasks += allLength
        })
        return  Math.floor(completedTasks*100/allTasks)
    }

    const findProject = (e) => {
        const{value} = e.target
        setSearchedText(value)
        const selectedProjects = [...projectsState].filter(project=>project.title.toLowerCase().includes(value))
        setFilteredProjects(selectedProjects)
    }

    return(
        <Fragment>
            {!loading && projects &&projectsState && filteredProjects ? <Fragment>
                <Navbar/>
                {isCreationModalActive && <Modal closeModal={()=>setCreationModal(false)} type="newProject"/>}
                <div className="container pb-3">
                    <img id="homeImg" src="https://res.cloudinary.com/antoxaalex/image/upload/v1616432266/fullstack-generator/Drawing-7.sketchpad_4_e6mff0.svg" />
                    <input type="text" id="searchProjectInput" placeholder="Enter project title" value={searchedText} onChange={(e)=>findProject(e)}/>
                    <div id="projects">
                        <div className="row">
                            <div className="col-12 col-lg-3 mb-3">
                                <div id="projectCard0" className="projectCard d-flex justify-content-center align-items-center" onMouseEnter={()=>addHiddenPanel(0)} onMouseLeave={()=>removeHiddenPanel(0)}>
                                    <button type="button" className="redirectProjectBtn" onClick={()=>setCreationModal(true)}><i id="newProjectIcon" className="fas fa-plus"/></button>
                                </div>
                            </div>
                            {filteredProjects.map((project,i)=>{
                                return(
                                    <div key={uuidv4()} className="col-12 col-lg-3 mb-3">
                                        <div id={"projectCard"+(i+1)} className="projectCard" onMouseEnter={()=>addHiddenPanel(i+1)} onMouseLeave={()=>removeHiddenPanel(i+1)}>
                                            <h3>{project.title}</h3>
                                            <p>Completed: {completePer(project)}%</p>
                                            <Link to={"/project/" + project._id} className="btn btn-sm btn-outline-light">Go</Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Fragment> : <Loading/>}
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