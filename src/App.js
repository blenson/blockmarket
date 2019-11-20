import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import locales from "./i18n/locales";

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
            loggedIn: JSON.parse(localStorage.getItem("HVSLoggedIn") || "false"),
            locale: localStorage.getItem("HVSLocale") == null ? "en" : localStorage.getItem("HVSLocale") 
        };
        this.setLoginState = this.setLoginState.bind(this);
        this.setLocale = this.setLocale.bind(this);
    }

    setLoginState(isLoggedIn) {
        localStorage.setItem("HVSLoggedIn", isLoggedIn.toString());
        this.setState({ loggedIn: isLoggedIn });
    }

    setLocale(locale) {
        localStorage.setItem("HVSLocale", locale);
        this.setState({ locale: locale });
    }

    expandLocaleName(locale) {
        if (locale === 'engb') {
            return 'en-gb';
        }
        return locale;
    }

    render() {
        let messages = locales[`${this.state.locale}`];
        let locale = this.state.locale;

        return (
            <IntlProvider locale={this.expandLocaleName(locale)} defaultLocale={locale} key={locale} messages={messages}>
                <Router>
                    <Navbar loggedIn={this.state.loggedIn} setLocale={this.setLocale} locale={this.state.locale}/>
                    <Switch>
                        <Route exact path='/'>
                            <Shop setLoginState={this.setLoginState} locale={locale} />
                        </Route>
                        <Route path='/store'>
                            <Store />
                        </Route>
                        <Route path='/logout'>
                            <Logout setLoginState={this.setLoginState} loggedIn={this.state.loggedIn} />
                        </Route>
                        <Route path='/login'>
                            <Login setLoginState={this.setLoginState} loggedIn={this.state.loggedIn} />
                        </Route>
                        <Route path='/register'>
                            <Register locale={this.state.locale}/>
                        </Route>
                        <Route path='/cart'>
                            <Cart />
                        </Route>
                    </Switch>
                </Router>
            </IntlProvider>
        );
    }
}

export default App;
