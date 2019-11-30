import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";

import axios from "axios";
import OrderCard from "./OrderCard"
import { connect } from "react-redux";
import { setLoggedInStatus } from "../../redux/actions/appActions";
import { setProfile } from "../../redux/actions/profileActions";
import { Row, Col } from "react-materialize";
import { selectOrderItem } from "../../redux/actions/orderActions";


class Orders extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            authorized: true
        };

        this.props.selectOrderItem(null);        
    }

    render() {
        if (this.state.authorized === false) {
            return <Redirect to='/login' />;
        }

        let itemsDisplay = this.state.items.map(item => {
            return (
                <Col key={item._id} s={12}>
                    { <OrderCard item={item} /> }
                </Col>
            );
        });

        return (
            <Row style={{marginTop: 25}}>
                {itemsDisplay}
            </Row>
        );
    }

    componentDidMount() {
        this._isMounted = true;

        var config = {
            withCredentials: true,
            credentials: "same-origin"
        };

        axios
            .get(process.env.REACT_APP_ServiceURL + "/api/orders", config)
            .then(response => {
                this.setState({ items: response.data });
            })
            .catch(error => {
                console.log(error);
                if (this._isMounted) {
                    this.props.setLoggedInStatus(false);
                    this.props.setProfile(null);
                    this.setState({ authorized: false });
                }
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
}

const mapStateToProps = state => {
    return {
        user: state.profile.user,
        selected: state.order.selected,
        locale: state.app.locale
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInStatus: status => dispatch(setLoggedInStatus(status)),
        setProfile: user => dispatch(setProfile(user)),
        selectOrderItem: payload => dispatch(selectOrderItem(payload))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Orders);
