import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { Button, TextInput, Row, Col, Switch } from "react-materialize";
import axios from "axios";
import AuthDTO from "../dto/AuthDTO";
import MerchantDTO from "../dto/MerchantDTO";
import BuyerDTO from "../dto/BuyerDTO";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            password2: "",
            email: "",
            isMerchant: false,
            displayMessage: "",
            hasError: false,
            registered: false
        };
    }

    registerUser = async e => {
        const regData = new AuthDTO();
        regData.username = this.state.username;
        regData.password = this.state.password;
        regData.password2 = this.state.password;
        regData.email = this.state.email;
        regData.isMerchant = this.state.isMerchant;

        try {
            if (this.state.isMerchant) {
                const merchantData = new MerchantDTO();
                merchantData.username = this.state.username;
                merchantData.email = this.state.email;
                const user = await axios.post(process.env.REACT_APP_ServiceURL + "/api/merchants", merchantData);

                regData.userid = user.data._id;
                await axios.post(process.env.REACT_APP_ServiceURL + "/api/auth/register", regData);
            } else {
                const buyerData = new BuyerDTO();
                buyerData.username = this.state.username;
                buyerData.email = this.state.email;
                const user = await axios.post(process.env.REACT_APP_ServiceURL + "/api/buyers", buyerData);

                regData.userid = user.data._id;
                await axios.post(process.env.REACT_APP_ServiceURL + "/api/auth/register", regData);
            }

            this.setState({ registered: true });
        } catch (error) {
            this.setState({ displayMessage: error.response.data.msg, hasError: true });
        }
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value, displayMessage: "" });
    }

    render() {
        if (this.state.registered === true) {
            return <Redirect to='/login' />;
        }

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
                        <div>
                            Are you a merchant and want to sell your goods?
                            <Switch
                                offLabel='No'
                                onLabel='Yes'
                                onChange={() => this.setState({ isMerchant: !this.state.isMerchant })}
                            />
                        </div>
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
