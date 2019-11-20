import React, { Component, Fragment } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { Link, NavLink } from "react-router-dom";
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import { FormattedMessage } from 'react-intl';

class Navbar extends Component {

    componentDidMount() {
        const options = {
            inDuration: 400,
            outDuration: 400,
            draggable: true
        };

        M.Sidenav.init(this.Sidenav, options);

        this.onSelectFlag = this.onSelectFlag.bind(this);

        //this.props.setLocale('engb');
    }

    onSelectFlag(countrycode) {
        console.log(countrycode);
        switch (countrycode) {
            //"US", "GB", "FR", "DE", "ES", "JP"
            case 'GB': this.props.setLocale("engb"); break;
            case 'FR': this.props.setLocale("fr"); break;
            case 'DE': this.props.setLocale("de"); break;
            case 'ES': this.props.setLocale("es"); break;
            case 'JP': this.props.setLocale("ja"); break;
            default: this.props.setLocale("en"); break;
        }
    }

    countryFromLocale(localeCode) {
        let cc = 'US';
        switch (localeCode) {
            //"US", "GB", "FR", "DE", "ES", "JP"
            case 'en': cc = "US"; break;
            case 'engb': cc = "GB"; break;
            case 'fr': cc = "FR"; break;
            case 'de': cc = "DE"; break;
            case 'es': cc = "ES"; break;
            case 'ja': cc = "JP"; break;
            default: cc = "US";
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
                            <li><NavLink activeClassName='selectedLink' exact to='/' className='hide-on-med-and-down'><FormattedMessage id="nav.Shop" defaultMessage="Shop" /></NavLink></li>
                            <li><NavLink activeClassName='selectedLink' to='/store' className='hide-on-med-and-down'><FormattedMessage id="nav.Store" defaultMessage="Store" /></NavLink></li>
                            {isLoggedIn ? (
                                <li><NavLink activeClassName='selectedLink' to='/logout' className='hide-on-med-and-down'><FormattedMessage id="nav.Logout" defaultMessage="Logout" /></NavLink></li>
                            ) : (
                                <Fragment> 
                                    <li><NavLink activeClassName='selectedLink' to='/login' className='hide-on-med-and-down'><FormattedMessage id="nav.Login" defaultMessage="Login" /></NavLink></li>
                                    <li><NavLink activeClassName='selectedLink' to='/register' className='hide-on-med-and-down'><FormattedMessage id="nav.Register" defaultMessage="Register" /></NavLink></li>
                                </Fragment>
                            )}
                            <li>
                                <Link to='/cart' className='btn-floating indigo darken-4 z-depth-0'>
                                    <i className='material-icons'>shopping_cart</i>
                                </Link>
                            </li>
                        </ul>
                   </div>
                </nav>
                <div className="right blue" >
                    <ReactFlagsSelect countries={["US", "GB", "FR", "DE", "ES", "JP"]} defaultCountry={defaultCountry} showSelectedLabel={false} showOptionLabel={false} selectedSize={16} optionsSize={14} 
                    onSelect={country => this.onSelectFlag(country)}/>
                </div>
                 <ul
                    className='sidenav'
                    id='mobile-nav'
                    ref={Sidenav => {
                        this.Sidenav = Sidenav;
                    }}
                >
                    <li><Link to='/'><FormattedMessage id="nav.Shop" defaultMessage="Shop" /></Link></li>
                    <li><Link to='/store'><FormattedMessage id="nav.Store" defaultMessage="Store" /></Link></li>
                    {isLoggedIn ? (
                        <li><Link to='/logout' className='modal-trigger'><FormattedMessage id="nav.Logout" defaultMessage="Logout" /></Link></li>
                    ) : (
                        <Fragment>
                            <li><Link to='/login' className='modal-trigger'><FormattedMessage id="nav.Login" defaultMessage="Login" /></Link></li>
                            <li><Link to='/register' className='modal-trigger'><FormattedMessage id="nav.Register" defaultMessage="Register" /></Link></li>
                        </Fragment>
                    )}
                </ul>
            </Fragment>
        );
    }
}

export default Navbar;
