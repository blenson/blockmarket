import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { FormattedMessage, FormattedNumber } from "react-intl";

import { Collection, Row, Col, Button, Icon } from "react-materialize";
import CartCard from "./Books/CartCard";

import { connect } from "react-redux";
let cultureInfo = require("../i18n/util/cultures.json");

class Cart extends Component {
    render() {
        let user = this.props.user;
        if (user == null) {
            // fix later to redirect to the login page
            return null;
        }

        //!TODO - DEMO ONLY = Remove the next line after real currency conversions are implemented
        let currencyFactor = this.props.locale === "ja" ? 100 : 1;

        let cartDisplay = this.props.cart.allIds.map(itemid => {
            let item = this.props.cart.items[itemid];
            console.log(item);
            return <CartCard item={item.data} count={item.count} key={itemid} />;
        });

        let totalPrice = parseFloat(this.props.cart.totalPrice).toFixed(2) * currencyFactor;
        if (totalPrice < 0) {
            totalPrice = 0.00;
        }

        return (
            <div className='container'>
                <Row>
                    <Col s={12}>
                        <h4>
                            <FormattedMessage id='cart.cartTitle' defaultMessage='Shopping Cart' />
                        </h4>
                    </Col>
                </Row>
                <Collection>{cartDisplay}</Collection>
                <Row>
                    <Col s={12}>
                        <div className='right'>
                            <h5>
                                Total:{" "}
                                <FormattedNumber
                                    value={totalPrice}
                                    style={`currency`}
                                    signDisplay = "never"
                                    currency={cultureInfo[this.props.locale].currency}
                                />
                            </h5>
                        </div>
                    </Col>
                    <Col s={12}>
                        <div className='right'>
                            <Button className="indigo" waves="light" small >
                                Check Out
                                <Icon right>payment</Icon>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.profile.user,
        cart: state.cart,
        locale: state.app.locale
    };
};

export default connect(mapStateToProps)(Cart);
