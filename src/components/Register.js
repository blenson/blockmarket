import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { Button, TextInput, Row, Col } from 'react-materialize';

class Register extends Component {

    render() {
        return (
            <div className="container center" color="indigo" style={{ marginTop: 75 }}>
                <h4>Register New User</h4>
                <Row style={{ marginTop: 25 }}>
                    <Col s={12} m={8} l={8} xl={6} offset="m2 l2 xl3">
                        <TextInput icon="person" noLayout={true} label="Username" />
                        <TextInput icon="lock"  noLayout={true} password label="Password" />
                        <TextInput icon="lock"  noLayout={true} password label="Confirm" />
                        <TextInput icon="email" noLayout={true} email validate error="Missing or invalid email" label="Email" />
                        <div style={{marginTop: 25}}>
                            <Button className="indigo">Register</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Register;
