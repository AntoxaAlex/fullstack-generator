import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert=>(
    <div key={alert.id} className={`p-0 text-center alert alert-${alert.alertType}`} style={{position: "fixed",width: "100%",top: "50px",zIndex:"100"}}>
        {alert.msg}
    </div>
))

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state =>({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)