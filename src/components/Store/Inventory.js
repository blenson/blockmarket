import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";

import axios from "axios";
import InvCard from "./InvCard"
import InvDetails from "./InvDetails"
import { connect } from "react-redux";
import { setLoggedInStatus } from "../../redux/actions/appActions";
import { setProfile } from "../../redux/actions/profileActions";
import { Row, Col } from "react-materialize";
import { selectInvItem } from "../../redux/actions/inventoryActions";


class Inventory extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            authorized: true
        };

        this.props.selectInvItem(null);        
    }

    render() {
        if (this.state.authorized === false) {
            return <Redirect to='/login' />;
        }

        if (this.props.selected !== null) {
            return <InvDetails />;
        }

        let itemsDisplay = this.state.items.map(item => {
            return (
                <Col key={item._id} s={12}>
                    { <InvCard item={item} /> }
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
            .get(process.env.REACT_APP_ServiceURL + "/api/books/mine", config)
            .then(response => {
                if (this._isMounted) {
                    // add to redux here
                    this.setState({ items: response.data });
                }
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
        selected: state.inventory.selected,
        locale: state.app.locale
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInStatus: status => dispatch(setLoggedInStatus(status)),
        setProfile: user => dispatch(setProfile(user)),
        selectInvItem: payload => dispatch(selectInvItem(payload))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
