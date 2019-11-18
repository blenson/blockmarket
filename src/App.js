import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Shop from "./components/Shop";
import Store from "./components/Store";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Cart from "./components/Cart";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: JSON.parse(localStorage.getItem('HVSLoggedIn') || "false")
        };
        this.setLoginState = this.setLoginState.bind(this);
    }

    setLoginState(isLoggedIn) {
        localStorage.setItem('HVSLoggedIn', isLoggedIn.toString());
        this.setState({loggedIn: isLoggedIn});
    }

    render() {
        return (
            <Router>
                <Navbar loggedIn={this.state.loggedIn}/>
                <Switch>
                    <Route exact path='/'>
                        <Shop setLoginState={this.setLoginState} />
                    </Route>
                    <Route path='/store'>
                        <Store />
                    </Route>
                    <Route path='/logout'>
                        <Logout setLoginState={this.setLoginState} loggedIn={this.state.loggedIn}/>
                    </Route>
                    <Route path='/login'>
                        <Login setLoginState={this.setLoginState} loggedIn={this.state.loggedIn}/>
                    </Route>
                    <Route path='/register'>
                        <Register />
                    </Route>
                    <Route path='/cart'>
                        <Cart />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
