import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { Button, Checkbox, TextInput, Row, Col } from 'react-materialize';


class Login extends Component {
    
    render() {
        return (
            <div className="container" color="indigo" style={{ marginTop: 75 }}>
                <h4 className="center">User Login</h4>
                <Row style={{ marginTop: 25 }}>
                    <Col s={12} m={8} l={8} xl={6} offset="m2 l2 xl3">
                        <TextInput icon="person" noLayout={true} label="Username" />
                        <TextInput icon="lock"  noLayout={true} password label="Password" />
                        <Checkbox style={{marginLeft: 5}} value="remember" label="Remember me" />
                        <div className="center"  style={{marginTop: 25}}> 
                            <Button className="indigo">Login</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Login;
