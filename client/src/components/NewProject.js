import React,{useState,Fragment} from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createProject} from "../actions/project";
import {setAlert} from "../actions/alert";

const NewProject = ({project, createProject, setAlert}) =>{
    const[formData, setFormData] = useState({
        title: "",
        purpose: "",
        stack: ""
    })
    const[goals,setGoals] = useState([
        "",
        "",
        ""
    ]);

    const{
        title,
        purpose,
        stack
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
        createProject(title,purpose,stack,goals)
    }

    if(project){
        return <Redirect to="/"/>
    }

    return(
        <div className="container">
            <form onSubmit={(e)=>onSubmitForm(e)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="firstname" name="title" value={title} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="purpose" className="form-label">Purpose</label>
                    <input type="text" className="form-control" id="purpose" name="purpose" value={purpose} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="stack" className="form-label">Stack</label>
                    <input type="text" className="form-control" id="stack" name="stack" value={stack} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <button type="button" className="btn btn-sm btn-secondary" onClick={()=>addGoal()}>Add goal</button>
                {goals.map((goal,i)=>{
                    return(
                        <div key={i} className="mb-3">
                            <label htmlFor={"goal" + i} className="form-label">Goal</label>
                            <input type="text" className="form-control" id={"goal" + i} name="goal" value={goal} onChange={(e)=>onChangeGoals(e,i)}/>
                            <button type="button" className="btn btn-sm btn-danger" onClick={()=>{removeGoal(i)}}>Delete goal</button>
                        </div>
                    )
                })}
                <button type="submit" className="btn btn-primary">Submit</button>
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