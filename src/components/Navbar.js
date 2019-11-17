import React, { Component, Fragment } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
    componentDidMount() {
        const options = {
            inDuration: 400,
            outDuration: 400,
            draggable: true
        };

        M.Sidenav.init(this.Sidenav, options);
    }

    render() {
        const isLoggedIn = this.props.loggedIn;
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
                            <li><NavLink activeClassName='selectedLink' exact to='/' className='hide-on-med-and-down'>Shop</NavLink></li>
                            <li><NavLink activeClassName='selectedLink' to='/store' className='hide-on-med-and-down'>Store</NavLink></li>
                            {isLoggedIn ? (
                                <li><NavLink activeClassName='selectedLink' to='/logout' className='hide-on-med-and-down'>Logout</NavLink></li>
                            ) : (
                                <Fragment> 
                                    <li><NavLink activeClassName='selectedLink' to='/login' className='hide-on-med-and-down'>Login</NavLink></li>
                                    <li><NavLink activeClassName='selectedLink' to='/register' className='hide-on-med-and-down'>Register</NavLink></li>
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
                <ul
                    className='sidenav'
                    id='mobile-nav'
                    ref={Sidenav => {
                        this.Sidenav = Sidenav;
                    }}
                >
                    <li><Link to='/'>Shop</Link></li>
                    <li><Link to='/store'>Store</Link></li>
                    {isLoggedIn ? (
                        <li><Link to='/logout' className='modal-trigger'>Logout</Link></li>
                    ) : (
                        <Fragment>
                            <li><Link to='/login' className='modal-trigger'>Login</Link></li>
                            <li><Link to='/register' className='modal-trigger'>Register</Link></li>
                        </Fragment>
                    )}
                </ul>
            </Fragment>
        );
    }
}

export default Navbar;
