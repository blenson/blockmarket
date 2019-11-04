import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";

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
                    <div>{item.title}</div>
                )
            })
        )
    }

    componentDidMount() {
        const results = {
            items: [
                {
                    id:1,
                    title:"Book 1", 
                    genre:"Cooking",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.", 
                    price:1240
                },
                {
                    id:2,
                    title:"Book 2", 
                    genre:"Romance",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.", 
                    price:3495
                },
                {
                    id:3,
                    title:"Book 3", 
                    genre:"Science",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
                    price:1779
                },
                {
                    id:4,
                    title:"Book 4", 
                    genre:"Romance",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
                    price:4299
                },
                {
                    id:5,
                    title:"Book 5", 
                    genre:"Art",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
                    price:4590
                },
                {
                    id:6,
                    title:"Book 6", 
                    genre:"Art",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
                    price:1295
                }
                ,
                {
                    id:7,
                    title:"Book 7", 
                    genre:"Business",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
                    price:2695
                },
                {
                    id:8,
                    title:"Book 8", 
                    genre:"Business",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
                    price:1695
                },
                {
                    id:9,
                    title:"Book 9", 
                    genre:"Business",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed.",
                    price:9300
                }        
            ]
        }
    
        this.setState(results);
    }
}

export default Home;
