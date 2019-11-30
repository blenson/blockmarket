import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";

import { Collection, Row, Col, Button, Icon } from "react-materialize";
import CartCard from "./Books/CartCard";
import FormattedCurrency from "./Misc/FormattedCurrency";

import { connect } from "react-redux";

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkOut: false
        };
    }

    render() {
        if (this.state.checkOut === true) {
            if (this.props.loggedIn !== true) {
                console.log('redirecting to login')
                return <Redirect to='/login' />;
            }
            return <Redirect to='/checkout' />;
        }

        let cartDisplay = this.props.cart.allIds.map(itemid => {
            let item = this.props.cart.items[itemid];
            return <CartCard item={item.data} count={item.count} key={itemid} />;
        });

        return (
            <div className='container'>
                <Row style={{ marginBottom: 0 }}>
                    <Col s={6}>
                        <h4 style={{ marginBottom: 0 }}>
                            <FormattedMessage id='cart.cartTitle' defaultMessage='Shopping Cart' />
                        </h4>
                    </Col>
                    <Col s={6}>
                        <div className='right'>
                            <h4 style={{ marginBottom: 0 }}>
                                <FormattedCurrency amount={this.props.cart.totalPrice} />
                                &nbsp;
                                <Button
                                    className='indigo'
                                    style={{ marginBottom: 5 }}
                                    waves='light'
                                    small
                                    onClick={e => this.setState({ checkOut: true })}
                                >
                                    <FormattedMessage id='cart.checkOut' defaultMessage='Checkout' />
                                    <Icon right>payment</Icon>
                                </Button>
                            </h4>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <div className='right'></div>
                    </Col>
                </Row>
                <Collection>{cartDisplay}</Collection>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.profile.user,
        cart: state.cart,
        locale: state.app.locale,
        loggedIn: state.app.loggedIn
    };
};

export default connect(mapStateToProps)(Cart);
