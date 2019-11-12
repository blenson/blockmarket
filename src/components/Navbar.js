import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { Link } from "react-router-dom";

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
        return (
            <React.Fragment>
                <nav className="nav-wrapper indigo" >
                    <div className="container">
                        <a href="/" className="brand-logo">BlockMarket</a>
                        <a href="/" className="sidenav-trigger hide-on-large-and-up" data-target="mobile-nav">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right">
                            <li><Link to="/" className="hide-on-med-and-down">Shop</Link></li>
                            <li><Link to="/store"  className="hide-on-med-and-down">Store</Link></li>
                            <li><Link to="/login" className="hide-on-med-and-down">Login</Link></li>
                            <li><Link to="/register" className="hide-on-med-and-down">Register</Link></li>
                            <li>
                                <Link to="/cart" className="btn-floating indigo darken-4 z-depth-0">
                                    <i className="material-icons">shopping_cart</i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <ul className="sidenav" id="mobile-nav" ref={Sidenav => {
                        this.Sidenav = Sidenav;
                    }}>
                    <li><Link to="/">Shop</Link></li>
                    <li><Link to="/store">Store</Link></li>
                    <li><Link to="/login" className="modal-trigger">Login</Link></li>
                    <li><Link to="/register" className="modal-trigger">Register</Link></li>
                </ul>
            </React.Fragment>
        )
    }
}

export default Navbar;
