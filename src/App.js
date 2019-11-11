import React from "react";
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Store from './components/Store';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Cart from './components/Cart';

function App() {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/">
                    <Shop/>
                </Route>
                <Route path="/store">
                    <Store/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/logout">
                    <Logout/>
                </Route>
                <Route path="/cart">
                    <Cart/>
                </Route>
            </Switch>            
        </Router>
    );
}

export default App;
