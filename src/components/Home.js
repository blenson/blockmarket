import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import axios from "axios";

class Home extends Component {
    
    constructor() {
        super();

        this.state = {
            items: []
        };

    }

    render() {
        return (
                this.state.items.map(item=>{
                    return(
                        <div className="col s12 m6 l4 xl2" >
                            <div className="card">
                                <div className="center">
                                    <img src="img/fantasy-bookcover.jpg" alt=""/>
                                </div>
                                <div className="card-content">
                                    <span className="card-title">{item.title}</span>
                                    <p>{item.desc}</p>
                                    <p><b>Price: ${parseFloat(item.price / 100).toFixed(2)}</b></p>
                                </div>
                            </div>
                        </div>
                    )
                })
        )
    }

    componentDidMount() {
        axios.get("http://localhost:4000/api/items")
        .then(res => {
            const items = res.data;
            console.log(items);
            this.setState(res.data);
        })
    }
}

export default Home;
