import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";

const Navbar = ({auth,logout}) => {
    return (
        <ul className="main-nav nav justify-content-between">
            {auth.isAuthenticated && <Fragment>
                <span id="spanId">{auth.user._id}</span>
                <button type="button" className="transparentBtn mr-2" onClick={()=>logout()}><i className="fas fa-sign-out-alt"/></button>
            </Fragment>}
        </ul>
    );
};

Navbar.protoTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps,{logout})(Navbar);
