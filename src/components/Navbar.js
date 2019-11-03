import React from 'react';

 const Navbar = () => {
    return(
        <nav className="nav-wrapper indigo" >
            <div className="container">
                <a href="#" className="brand-logo">BlockMarket</a>
                
                <ul className="right">
                    <li><a href="#">Store</a></li>
                    <li><a href="#">Shop</a></li>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Register</a></li>
                    <li>
                        <a href="#" className="btn-floating indigo darken-4 z-depth-0">
                            <i className="material-icons">shopping_cart</i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>  
    )
}

export default Navbar;
