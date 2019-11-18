import React from 'react';
import PopularBooks from './Books/PopularBooks';

const Shop = (props) => {
    return(
        <div className="container">
            <div className="row">
                <PopularBooks setLoginState = {props.setLoginState} />
            </div>
        </div>
    )
}

export default Shop;