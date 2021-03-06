import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { setLocale, setLoggedInStatus } from "./redux/actions/appActions";
import { setProfile } from "./redux/actions/profileActions";
import locales from "./i18n/locales";

import Navbar from "./components/Navbar";
import Shop from "./components/Shop";
import Store from "./components/Store";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Cart from "./components/Cart";
import Checkout from "./components/OrderSummary";
import Profile from "./components/Profile";
import InventoryDetails from "./components/Store/InvDetails";


class App extends Component {
    render() {
        let locale = this.props.locale;
        let messages = locales[`${locale}`];
        
        return (
            <IntlProvider locale={locale === "engb" ? "en-gb" : locale} defaultLocale={locale} key={locale} messages={messages}>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route exact path='/'>
                            <Shop />
                        </Route>
                        <Route path='/store'>
                            <Store />
                        </Route>
                        <Route path='/logout'>
                            <Logout />
                        </Route>
                        <Route path='/login'>
                            <Login />
                        </Route>
                        <Route path='/register'>
                            <Register />
                        </Route>
                        <Route path='/cart'>
                            <Cart />
                        </Route>
                        <Route path='/checkout'>
                            <Checkout />
                        </Route>
                        <Route path='/invdetails'>
                            <InventoryDetails />
                        </Route>
                        <Route path='/profile'>
                            <Profile />
                        </Route>
                    </Switch>
                </Router>
            </IntlProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        locale: state.app.locale
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLocale: (locale) => dispatch(setLocale(locale)),
        setLoggedInStatus: (status) => dispatch(setLoggedInStatus(status)),
        setProfile: (user) => dispatch(setProfile(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
