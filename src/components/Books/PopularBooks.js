import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import axios from "axios";

class PopularBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            authorized: true
        };
    }

    render() {
        if (this.state.authorized === false) {
            return <Redirect to='/login' />;
        }
        return this.state.items.map(item => {
            return (
                <div key={item._id} className='col s12 m6 l4 xl2'>
                    <div className='card'>
                        <div className='center'>
                            <img src='img/fantasy-bookcover.jpg' alt='' />
                        </div>
                        <div className='card-content'>
                            <span className='card-title'>{item.title}</span>
                            <p>{item.desc}</p>
                            <p>
                                <b>Price: ${parseFloat(item.price.$numberDecimal).toFixed(2)}</b>
                            </p>
                        </div> 
                    </div>
                </div>
            );
        });
    }

    componentDidMount() {
        var config = {
            withCredentials: true,
            credentials: 'same-origin'
        };

        axios
            .get(process.env.REACT_APP_ServiceURL + "/api/books", config)
            .then(response => {
                this.setState({ items: response.data });
            })
            .catch(error => {
                this.setState({ authorized: false });
            });
    }
}

export default PopularBooks;
