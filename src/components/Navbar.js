import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";

import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";
import CountBadge from "./CountBadge";

import { connect } from "react-redux";
import { setLocale } from "../redux/actions";

class Navbar extends Component {
    componentDidMount() {
        const options = {
            inDuration: 400,
            outDuration: 400,
            draggable: true
        };

        M.Sidenav.init(this.Sidenav, options);

        this.onSelectFlag = this.onSelectFlag.bind(this);
    }

    persistLocale(locale) {
        this.props.setLocale(locale);
        localStorage.setItem("HVSLocale", locale);
    }

    onSelectFlag(countrycode) {
        switch (countrycode) {
            case "GB":
                this.persistLocale("engb");
                break;
            case "FR":
                this.persistLocale("fr");
                break;
            case "DE":
                this.persistLocale("de");
                break;
            case "ES":
                this.persistLocale("es");
                break;
            case "JP":
                this.persistLocale("ja");
                break;
            default:
                this.persistLocale("en");
                break;
        }
    }

    countryFromLocale(localeCode) {
        let cc = "US";
        switch (localeCode) {
            case "en":
                cc = "US";
                break;
            case "engb":
                cc = "GB";
                break;
            case "fr":
                cc = "FR";
                break;
            case "de":
                cc = "DE";
                break;
            case "es":
                cc = "ES";
                break;
            case "ja":
                cc = "JP";
                break;
            default:
                cc = "US";
        }
        return cc;
    }

    render() {
        const isLoggedIn = this.props.loggedIn;
        const defaultCountry = this.countryFromLocale(this.props.locale);
        return (
            <Fragment>
                <nav className='nav-wrapper indigo'>
                    <div className='container'>
                        <a href='/' className='brand-logo'>
                            BlockMarket
                        </a>
                        <a href='/' className='sidenav-trigger hide-on-large-and-up' data-target='mobile-nav'>
                            <i className='material-icons'>menu</i>
                        </a>
                        <ul className='right'>
                            <li>
                                <NavLink activeClassName='selectedLink' exact to='/' className='hide-on-med-and-down'>
                                    <FormattedMessage id='nav.Shop' defaultMessage='Shop' />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName='selectedLink' to='/store' className='hide-on-med-and-down'>
                                    <FormattedMessage id='nav.Store' defaultMessage='Store' />
                                </NavLink>
                            </li>
                            {isLoggedIn ? (
                                <li>
                                    <NavLink activeClassName='selectedLink' to='/logout' className='hide-on-med-and-down'>
                                        <FormattedMessage id='nav.Logout' defaultMessage='Logout' />
                                    </NavLink>
                                </li>
                            ) : (
                                <Fragment>
                                    <li>
                                        <NavLink activeClassName='selectedLink' to='/login' className='hide-on-med-and-down'>
                                            <FormattedMessage id='nav.Login' defaultMessage='Login' />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink activeClassName='selectedLink' to='/register' className='hide-on-med-and-down'>
                                            <FormattedMessage id='nav.Register' defaultMessage='Register' />
                                        </NavLink>
                                    </li>
                                </Fragment>
                            )}
                            <li>
                                <Link to='/cart' className='btn-floating indigo darken-4 z-depth-0'>
                                    <i className='material-icons'>shopping_cart</i>
                                </Link>
                                <CountBadge counter='0' />
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='right blue flags'>
                    <ReactFlagsSelect
                        countries={["US", "GB", "FR", "DE", "ES", "JP"]}
                        defaultCountry={defaultCountry}
                        showSelectedLabel={false}
                        showOptionLabel={false}
                        selectedSize={16}
                        optionsSize={14}
                        onSelect={country => this.onSelectFlag(country)}
                    />
                </div>
                <ul
                    className='sidenav'
                    id='mobile-nav'
                    ref={Sidenav => {
                        this.Sidenav = Sidenav;
                    }}
                >
                    <li>
                        <Link to='/'>
                            <FormattedMessage id='nav.Shop' defaultMessage='Shop' />
                        </Link>
                    </li>
                    <li>
                        <Link to='/store'>
                            <FormattedMessage id='nav.Store' defaultMessage='Store' />
                        </Link>
                    </li>
                    {isLoggedIn ? (
                        <li>
                            <Link to='/logout' className='modal-trigger'>
                                <FormattedMessage id='nav.Logout' defaultMessage='Logout' />
                            </Link>
                        </li>
                    ) : (
                        <Fragment>
                            <li>
                                <Link to='/login' className='modal-trigger'>
                                    <FormattedMessage id='nav.Login' defaultMessage='Login' />
                                </Link>
                            </li>
                            <li>
                                <Link to='/register' className='modal-trigger'>
                                    <FormattedMessage id='nav.Register' defaultMessage='Register' />
                                </Link>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        locale: state.app.locale,
        loggedIn: state.app.loggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLocale: (locale) => dispatch(setLocale(locale))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
