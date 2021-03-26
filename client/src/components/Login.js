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
        <div id="signInDiv" className="container">
            <h1 className="mb-3 text-center">Sign in</h1>
            <form onSubmit={(e)=>onSubmitForm(e)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" autoComplete="off" id="email" name="email" value={email} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e)=>onChangeValue(e)}/>
                </div>
                <p className="my-3">
                    Don't have an account? <Link to="/signup">Click here</Link>
                </p>
                <div className="text-center">
                    <button type="submit" className="btn btn-lg btn-primary">Sign in</button>
                </div>
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