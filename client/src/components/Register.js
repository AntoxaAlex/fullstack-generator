import React,{useState} from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {register} from "../actions/auth";
import {setAlert} from "../actions/alert";

const Register = ({isAuthenticated,register, setAlert}) =>{
    const[formData, setFormData] = useState({
        firstname: "",
        secondname: "",
        email: "",
        password: "",
        password2: ""
    })

    const{
        firstname,
        secondname,
        email,
        password,
        password2
    } = formData

    const onChangeValue = (e) =>{
        const{name,value} = e.target
        setFormData({...formData,[name]:value});
    }
    const onSubmitForm = (e) =>{
        e.preventDefault();
        if(password === password2){
            register(firstname,secondname,email,password)
        } else{
            setAlert("Passwords do not match","danger")
        }
    }
    console.log(isAuthenticated)
    if(isAuthenticated){
        return <Redirect to="/"/>
    }
    return(
        <div id="signUpDiv" className="container">
            <h1 className="mb-3 text-center">Sign up</h1>
            <form onSubmit={(e)=>onSubmitForm(e)}>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">Firstname</label>
                    <input type="text" className="form-control" autoComplete="off" id="firstname" name="firstname" value={firstname} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="secondname" className="form-label">Secondname</label>
                    <input type="text" className="form-control" autoComplete="off" id="secondname" name="secondname" value={secondname} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" autoComplete="off" id="email" name="email" value={email} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">Password1</label>
                    <input type="password" className="form-control" id="password1" name="password" value={password} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Password2</label>
                    <input type="password" className="form-control" id="password2" name="password2" value={password2} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <p className="my-3">
                    Already have an account? <Link to="/signin">Click here</Link>
                </p>
                <div className="text-center">
                    <button type="submit" className="btn btn-lg btn-primary">Sign up</button>
                </div>
            </form>
        </div>
    )
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    register: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{register,setAlert})(Register)