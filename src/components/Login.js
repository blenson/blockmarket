import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { Button, Checkbox, TextInput, Row, Col } from "react-materialize";
import axios from "axios";
import { FormattedMessage } from "react-intl";

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
            await axios.post(process.env.REACT_APP_ServiceURL + "/api/auth/login", loginData, config);
            this.props.setLoginState(true);
        } catch (error) {
            this.setState({ displayMessage: error.response.data.msg, hasError: true });
        }
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value, displayMessage: "" });
    }

    render(props) {
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
                            label={<FormattedMessage id='login.username' defaultMessage='Username' />}
                            name='username'
                            value={this.state.username}
                            onChange={e => this.handleChange(e)}
                        />
                        <TextInput
                            icon='lock'
                            noLayout={true}
                            password
                            label={<FormattedMessage id='login.password' defaultMessage='Password' />}
                            name='password'
                            value={this.state.password}
                            onChange={e => this.handleChange(e)}
                        />
                        <Checkbox
                            style={{ marginLeft: 5 }}
                            value='remember'
                            label={<FormattedMessage id='login.rememberMe' defaultMessage='Remember me' />}
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

export default Login; 
