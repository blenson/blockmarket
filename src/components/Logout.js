import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";

import { connect } from "react-redux";
import { setLocale, setLoggedInStatus } from "../redux/actions/appActions";
import { setProfile } from "../redux/actions/profileActions";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: true
        };
    }

    logoutUser = async e => {
        // TODO - we should call the server to delete the auth cookie 

        this.props.setLoggedInStatus(false);
        this.props.setProfile(null);
        this.setState({ authenticated: false });
    };

    render() {
        if (this.state.authenticated === false) {
            return <Redirect to='/' />;
        }
        return (
            <Fragment>
                <div>Logout</div>
                <button onClick={e => this.logoutUser(e)}>Logout</button>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        locale: state.app.locale,
        loggedIn: state.app.loggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLocale: locale => dispatch(setLocale(locale)),
        setLoggedInStatus: status => dispatch(setLoggedInStatus(status)),
        setProfile: user => dispatch(setProfile(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
