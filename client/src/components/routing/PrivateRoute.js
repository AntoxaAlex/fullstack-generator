import React from "react";
import {connect} from "react-redux";
import {Route,Redirect} from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({component: Component, auth:{isAuthenticated, loading, token}, ...rest}) =>(
    <Route {...rest} render={props =>!isAuthenticated && !loading && !token ? (<Redirect to="/signin"/>) : (<Component {...props}/>)}/>
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)