import React,{useState} from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../actions/auth";

const Login = ({isAuthenticated, login}) =>{
    const[formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const{
        email,
        password
    } = formData

    const onChangeValue = (e) => {
        const{name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const onSubmitForm = (e) =>{
        e.preventDefault();
        login(email,password);
    }
    if(isAuthenticated) {
        return <Redirect to="/"/>
    }

    return(
        <div className="container">
            <form onSubmit={(e)=>onSubmitForm(e)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password1</label>
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login)