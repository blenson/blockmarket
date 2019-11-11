import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";

class Register extends Component {

    componentDidMount() {
        M.Modal.init(this.Register);
    }

    render() {
        return (
            <div id="register" className="modal" ref={Register => {
                    this.Register = Register;
                }}>
                <div className="modal-content center">
                    <h4>Register Form</h4>
                    <br/>
                </div>
            </div>
        )
    }
}

export default Register;
