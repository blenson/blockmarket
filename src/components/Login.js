import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";

class Login extends Component {
    
    componentDidMount() {
        M.Modal.init(this.LoginModal);
    }

    render() {
        return (
            <div id="login" className="modal" ref={LoginModal => {
                    this.LoginModal = LoginModal;
                }}>
                <div className="modal-content center">
                    <h4>Login Form</h4>
                    <br/>
                </div>
            </div>
        )
    }
}

export default Login;
