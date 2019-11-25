import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { Button, Checkbox, TextInput, Row, Col } from "react-materialize";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { translate } from "../i18n/util/translate";

import { connect } from "react-redux";
import { setLocale, setLoggedInStatus } from "../redux/actions/appActions";
import { setProfile } from "../redux/actions/profileActions";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            password2: "",
            email: "",
            displayMessage: "", 
            hasError: false
        };
    }

    loginUser = async e => {
        const loginData = {
            username: this.state.username,
            password: this.state.password
        };
        var config = {
            withCredentials: true,
            credentials: "same-origin"
        };

        try {
            let logResult = await axios.post(process.env.REACT_APP_ServiceURL + "/api/auth/login", loginData, config);
            let userPath = "/api/" + (logResult.data.merchant ? "merchants/" : "buyers/") + logResult.data.user;
            let response = await axios.get(process.env.REACT_APP_ServiceURL + userPath , config);
            let user = response.data;
            this.props.setProfile(user);
            this.props.setLoggedInStatus(true);
        } catch (error) {
            this.setState({ displayMessage: error.response.data.msg, hasError: true });
        }
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value, displayMessage: "" });
    }

    render() {
        const isLoggedIn = this.props.loggedIn;

        if (isLoggedIn === true) {
            return <Redirect to='/' />;
        }

        const messageColor = this.state.hasError ? "red" : "black";

        return (
            <div className='container' color='indigo' style={{ marginTop: 75 }}>
                <h4 className='center'>{<FormattedMessage id='login.loginTitle' defaultMessage='User Login' />}</h4>
                <Row style={{ marginTop: 25 }}>
                    <Col s={12} m={8} l={8} xl={6} offset='m2 l2 xl3'>
                        <TextInput
                            icon='person'
                            noLayout={true}
                            label={translate(this.props.locale, "login.username")}
                            name='username'
                            value={this.state.username}
                            onChange={e => this.handleChange(e)}
                        />
                        <TextInput
                            icon='lock'
                            noLayout={true}
                            password
                            label={translate(this.props.locale, "login.password")}
                            name='password'
                            value={this.state.password}
                            onChange={e => this.handleChange(e)}
                        />
                        <Checkbox
                            style={{ marginLeft: 5 }}
                            value='remember'
                            label={translate(this.props.locale, "login.rememberMe")}
                        />
                        <div className='center' style={{ marginTop: 15, color: messageColor }}>
                            <h5>{this.state.displayMessage}</h5>
                        </div>

                        <div className='center' style={{ marginTop: 25 }}>
                            <Button className='indigo' onClick={e => this.loginUser(e)}>
                                {<FormattedMessage id='login.login' defaultMessage='Login' />}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
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
        setLocale: (locale) => dispatch(setLocale(locale)),
        setLoggedInStatus: (status) => dispatch(setLoggedInStatus(status)),
        setProfile: (user) => dispatch(setProfile(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
