import React,{useState,Fragment} from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createProject} from "../actions/project";
import {setAlert} from "../actions/alert";

const NewProject = ({project, createProject}) =>{
    const[formData, setFormData] = useState({
        title: "",
        purpose: "",
        frontArch: "",
        backArch: ""
    })
    const[goals,setGoals] = useState([
        "",
        "",
        ""
    ]);

    const{
        title,
        purpose,
        frontArch,
        backArch
    } = formData

    const onChangeValue = (e) => {
        const{name, value} = e.target;
        setFormData({...formData,[name]: value});
    }
    const onChangeGoals = (e,i) => {
        const goalsArr = [...goals];
        goalsArr[i] = e.target.value;
        setGoals(goalsArr);
    }

    const addGoal = () => {
        setGoals([...goals, ""])
    }

    const removeGoal = (i) => {
        const goalsArr = [...goals];
        goalsArr.splice(i,1);
        setGoals(goalsArr);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        createProject(title,purpose,goals,frontArch,backArch)
    }

    if(project){
        return <Redirect to={"/project/"+project._id}/>
    }

    return(
        <div id="newProject">
            <h2 className="text-center mb-3">Create new project</h2>
            <form onSubmit={(e)=>onSubmitForm(e)}>
                <div className="mb-3">
                    <input type="text" autoComplete="off" placeholder="Title" className="form-control fieldsetInput" id="firstname" name="title" value={title} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <div className="mb-3">
                    <input type="text" autoComplete="off" placeholder="Purpose" className="form-control fieldsetInput" id="purpose" name="purpose" value={purpose} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <button type="button" className="btn btn-sm btn-outline-warning mb-3" onClick={()=>addGoal()}>Add goal</button>
                {goals.map((goal,i)=>{
                    return(
                        <div key={i} className="mb-3 d-flex">
                            <input type="text" autoComplete="off" placeholder="Goal" className="form-control" id={"goal" + i} name="goal" value={goal} onChange={(e)=>onChangeGoals(e,i)}/>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>{removeGoal(i)}}><i className="fas fa-trash-alt"/></button>
                        </div>
                    )
                })}
                <div className="mb-3">
                <select className="form-control fieldsetInput" id="frontArch" name="frontArch" value={frontArch} onChange={(e)=>onChangeValue(e)} aria-label="Default select example">
                    <option value="">Front-end architecture</option>
                    <option value="react">React</option>
                </select>
            </div>
            <div className="mb-3">
                <select className="form-control fieldsetInput" id="backArch" name="backArch" value={backArch} onChange={(e)=>onChangeValue(e)} aria-label="Default select example">
                    <option value="">Back-end architecture</option>
                    <option value="node">Node.js</option>
                </select>
            </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

NewProject.protoTypes = {
    setAlert: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object
}

const mapStateToProps = state => ({
    project: state.project.project
})

export default connect(mapStateToProps,{createProject, setAlert})(NewProject)