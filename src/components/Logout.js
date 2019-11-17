import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.setParentLoginStatusFalse = this.setParentLoginStatusFalse.bind(this);
        this.state = {
            authenticated: true
        };
    }

    setParentLoginStatusFalse() {
        this.props.setLoginState(false);
        this.setState({authenticated: false});
    }

    render() {
        if (this.state.authenticated === false) {
            return <Redirect to='/' />;
        }
    return (
            <Fragment>
                <div>Logout</div>
                <button onClick={this.setParentLoginStatusFalse}>Logout</button>
            </Fragment>
        )
    }
}

export default Logout;
