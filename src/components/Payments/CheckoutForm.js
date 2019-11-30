import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { Button, Icon } from "react-materialize";
import { translate } from "../../i18n/util/translate";

let cultureInfo = require("../../i18n/util/cultures.json");

class CheckoutForm extends Component {
    onToken = (amount, description, currency) => token => {
        axios
            .post(process.env.REACT_APP_ServiceURL + "/api/payment", {
                description: description,
                source: token.id,
                currency: currency,
                amount: Math.trunc(amount * 100)
            })
            .then(this.props.successPayment)
            .catch(this.props.errorPayment);
    };

    render() {
        const currency = cultureInfo[this.props.locale].currency;
        return (
            <StripeCheckout
                name={this.props.name}
                description={this.props.description}
                amount={Math.trunc(this.props.amount * 100)}
                token={this.onToken(this.props.amount, this.props.description, currency)}
                currency={currency}
                stripeKey={process.env.REACT_APP_PUBKEY}
            >
                <Button className='indigo' waves='light' small onClick={e => this.setState({ checkOut: true })}>
                    {translate(this.props.locale, "checkoutform.paycard")}
                    <Icon right>payment</Icon>
                </Button>
            </StripeCheckout>
        );
    }
}

const mapStateToProps = state => {
    return {
        locale: state.app.locale
    };
};

export default connect(mapStateToProps)(CheckoutForm);
