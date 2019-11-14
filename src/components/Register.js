import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { Button, TextInput, Row, Col } from "react-materialize";
import axios from "axios";

class Register extends Component {
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

    registerUser = async e => {
        const regData = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            email: this.state.email
        };

        try {
            await axios.post("http://localhost:4000/api/auth/register", regData);
            this.setState({ displayMessage: "Success: User Registered", hasError: false });
        } catch (error) {
            this.setState({ displayMessage: error.response.data.msg, hasError: true });
        }
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value, displayMessage: "" });
    }

    render() {
        const messageColor = this.state.hasError ? "red" : "black";

        return (
            <div className='container center' color='indigo' style={{ marginTop: 75 }}>
                <h4>Register New User</h4>
                <Row style={{ marginTop: 25 }}>
                    <Col s={12} m={8} l={8} xl={6} offset='m2 l2 xl3'>
                        <TextInput
                            icon='person'
                            noLayout={true}
                            label='Username'
                            name='username'
                            value={this.state.username}
                            onChange={e => this.handleChange(e)}
                        />
                        <TextInput
                            icon='lock'
                            noLayout={true}
                            password
                            label='Password'
                            name='password'
                            value={this.state.password}
                            onChange={e => this.handleChange(e)}
                        />
                        <TextInput
                            icon='lock'
                            noLayout={true}
                            password
                            label='Confirm'
                            name='password2'
                            value={this.state.password2}
                            onChange={e => this.handleChange(e)}
                        />
                        <TextInput
                            icon='email'
                            noLayout={true}
                            email
                            validate
                            error='Missing or invalid email'
                            label='Email'
                            name='email'
                            value={this.state.email}
                            onChange={e => this.handleChange(e)}
                        />
                        <div style={{ marginTop: 15, color: messageColor }}>
                            <h5>{this.state.displayMessage}</h5>
                        </div>

                        <div style={{ marginTop: 25 }}>
                            <Button className='indigo' onClick={e => this.registerUser(e)}>
                                Register
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Register;
