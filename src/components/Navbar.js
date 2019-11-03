import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";

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
                        <a href="#" className="brand-logo">BlockMarket</a>
                        <a href="#" className="sidenav-trigger hide-on-large-and-up" data-target="mobile-nav">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right">
                            <li><a href="#" className="hide-on-med-and-down">Store</a></li>
                            <li><a href="#" className="hide-on-med-and-down">Shop</a></li>
                            <li><a href="#" className="hide-on-med-and-down">Login</a></li>
                            <li><a href="#" className="hide-on-med-and-down">Register</a></li>
                            <li>
                                <a href="#" className="btn-floating indigo darken-4 z-depth-0">
                                    <i className="material-icons">shopping_cart</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <ul className="sidenav" id="mobile-nav" ref={Sidenav => {
                        this.Sidenav = Sidenav;
                    }}>
                    <li><a href="#">Store</a></li>
                    <li><a href="#">Shop</a></li>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Register</a></li>
                </ul>
            </React.Fragment>
        )
    }
}

export default Navbar;
