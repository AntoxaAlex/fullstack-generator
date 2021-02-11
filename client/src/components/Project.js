import React,{useState,useEffect,Fragment} from "react";
import {Link, Redirect} from "react-router-dom";
import {useParams} from "react-router";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProjectById,deleteProject,editProject} from "../actions/project";

const Project = ({getProjectById, deleteProject, editProject, project:{project, loading,isProjectDeleted}}) =>{
    const{id} = useParams()

    const[formData, setFormData] = useState({
        title: "",
        purpose: "",
        stack: ""
    })
    const[goals,setGoals] = useState([]);
    const[editData, setEditData] = useState({
        isActive: false,
        val: ""
    })

    const{
        title,
        purpose,
        stack
    } = formData

    useEffect(()=>{
        getProjectById(id)
    },[id])
    useEffect(()=>{
        if(project){
            setFormData({
                title: loading || !project.title ? "" : project.title,
                purpose: loading || !project.purpose ? "" : project.purpose,
                stack: loading || !project.stack ? "" : project.stack,
            })
            setGoals(  loading || !project.goals ? null : project.goals)
        }
    },[project])
    if(isProjectDeleted){
        return <Redirect to="/"/>
    }

    const editContent = (name) =>{
        setEditData({isActive: !editData.isActive, val: name})
    }

    const onChangeValue = (e) => {
        const{name, value} = e.target;
        setFormData({...formData,[name]: value});
    }
    const onChangeGoals = (e,i) => {
        const goalsArr = [...goals];
        goalsArr[i] = e.target.value;
        setGoals(goalsArr);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        editProject(id,title,purpose,stack,goals)
        setEditData({isActive: false,val: ""})
    }

    return( <Fragment>
            {!loading && project && <div>
                <div className="d-flex">
                    {editData.isActive && editData.val === "title" ? (<form onSubmit={(e)=>onSubmitForm(e)}>
                        <input type="text" name="title" value={title} onChange={(e)=>onChangeValue(e)}/>
                        <button type="submit" className="btn btn-sm btn-outline-warning">Send</button>
                    </form>) : (<h3>{project.title}</h3>)}
                    <span>
                        <button type="button" className="btn btn-sm btn-outline-warning" onClick={()=>editContent("title")}><i className="fas fa-cog"/></button>
                    </span>
                </div>
                <div className="d-flex">
                    {editData.isActive && editData.val === "purpose" ? (<form onSubmit={(e)=>onSubmitForm(e)}>
                        <input type="text" name="purpose" value={purpose} onChange={(e)=>onChangeValue(e)}/>
                        <input type="submit" className="btn btn-sm btn-outline-warning"/>
                    </form>) : (<p>{project.purpose}</p>)}
                    <span>
                        <button type="button" className="btn btn-sm btn-outline-warning" onClick={()=>editContent("purpose")}><i className="fas fa-cog"/></button>
                    </span>
                </div>
                <div className="d-flex">
                    {editData.isActive && editData.val === "stack" ? (<form onSubmit={(e)=>onSubmitForm(e)}>
                        <input type="text" name="stack" value={stack} onChange={(e)=>onChangeValue(e)}/>
                        <input type="submit" className="btn btn-sm btn-outline-warning"/>
                    </form>) : (<p>{project.stack}</p>)}
                    <span>
                        <button type="button" className="btn btn-sm btn-outline-warning" onClick={()=>editContent("stack")}><i className="fas fa-cog"/></button>
                    </span>
                </div>
                <div className="d-flex">
                    <ol>
                        {editData.isActive && editData.val === "goals" ? (<form onSubmit={(e)=>onSubmitForm(e)}>
                            {project.goals.map((goal,i)=>{
                                return(
                                    <li key={i}>
                                        <input type="text" placeholder="Goal" value={goals[i]} onChange={(e)=>onChangeGoals(e,i)}/>
                                    </li>
                                )
                            })}
                            <input type="submit" className="btn btn-sm btn-outline-warning"/>
                        </form>) : (<Fragment>
                            {project.goals.map((goal,i)=>{
                                return(
                                    <li key={i}>{goal}</li>
                                )
                            })}
                        </Fragment>)}

                    </ol>
                    <span>
                        <button type="button" className="btn btn-sm btn-outline-warning" onClick={()=>editContent("goals")}><i className="fas fa-cog"/></button>
                    </span>
                </div>
                <Link to="/" className="btn btn-outline-info">Go back</Link>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>deleteProject(id)}>Delete project</button>

            </div>}
    </Fragment>
    )
}

Project.protoTypes = {
    project: PropTypes.object.isRequired,
    getProjectById: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    editProject: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    project: state.project
})

export default connect(mapStateToProps,{getProjectById, deleteProject,editProject})(Project)