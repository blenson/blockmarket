import React, { Component } from "react";
import CheckoutForm from "./Payments/CheckoutForm";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { Row, Col } from "react-materialize";
import { translate } from "../i18n/util/translate";

import { connect } from "react-redux";
import FormattedCurrency from "./Misc/FormattedCurrency";
import CountrySelector from "./Misc/CountrySelector";
import { clearCart } from "../redux/actions/cartActions";
import OrderDTO from "../dto/OrderDTO";

// Yuck - I really need to be refactored.
// Start by splitting me into lots of subcomponents!
class OrderSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkOut: false,
            orderId: null,
            subtotal: 0,
            shipping: 0,
            tax: 0,
            total: 0,

            buyer: "",
            street: "",
            city: "",
            region: "",
            country: "Canada",
            postcode: "",

            hasError: false,
            displayMessage: "",
            paymentComplete: false
        };
    }

    componentDidMount() {
        let subtotal = 0;
        let shipping = 0;
        let tax = 0;

        // this.createOrder();

        var config = {
            withCredentials: true,
            credentials: "same-origin"
        };

        axios
            .get(process.env.REACT_APP_ServiceURL + "/api/orders/nextorderid", config)
            .then(response => {
                this.setState({ orderId: response.data });
            })
            .catch(error => {
                console.log(error);
            });

        this.props.cart.allIds.forEach(id => {
            let item = this.props.cart.items[id];
            subtotal += parseFloat(item.data.price.$numberDecimal) * item.count;
            shipping += parseFloat(item.data.shipping.$numberDecimal) * item.count;
        });

        this.setState({ subtotal: subtotal, shipping: shipping, tax: 0, total: subtotal + shipping + tax });
        this.setTax();
    }

    displayOrderItems = this.props.cart.allIds.map(itemid => {
        let item = this.props.cart.items[itemid];
        return (
            <Row key={item.data._id}>
                <Col s={4}>{item.data.name}</Col>
                <Col s={2}>
                    <div className='right'>{<FormattedCurrency amount={item.data.price} />}</div>
                </Col>
                <Col s={2}>
                    <div className='right'>{<FormattedCurrency amount={item.data.shipping} />}</div>
                </Col>
                <Col s={2}>
                    <div className='right'>{item.count}</div>
                </Col>
                <Col s={2}>
                    <div className='right'>
                        <FormattedCurrency
                            amount={
                                (parseFloat(item.data.price.$numberDecimal) + parseFloat(item.data.shipping.$numberDecimal)) *
                                item.count
                            }
                        />
                    </div>
                </Col>
            </Row>
        );
    });

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value, displayMessage: "" });
    }

    getTaxPercent = (merchCountry, buyerCountry) => {
        // obviously not right but a start for this demo code
        if ((merchCountry === buyerCountry) === "Canada") {
            return 0.13;
        }
        return 0;
    };

    setTax() {
        // obviously not right but a start for this demo code
        this.setState((prevState, props) => {
            return { tax: prevState.country === "Canada" ? (prevState.subtotal + prevState.shipping) * 0.13 : 0 };
        });
    }

    handleCountryChange(ctr) {
        // obviously not right but a start for this demo code
        this.setState({
            country: ctr.label,
            displayMessage: "",
            tax: ctr.label === "Canada" ? (this.state.subtotal + this.state.shipping) * 0.13 : 0
        });
        this.setTax();
    }

    stringDefault = str => {
        if (!str) return "";
        return str;
    };

    createOrder = async e => {
        // create an order for each merchant's goods purchased by the buyer

        let merchItems = [];
        let merchIds = [];

        this.props.cart.allIds.forEach(id => {
            let item = this.props.cart.items[id];
            if (item.count > 0) {
                const existingMerch = merchItems[item.data.merchantId];
                if (!existingMerch) {
                    merchIds.push(item.data.merchantId);
                    merchItems[item.data.merchantId] = [{ item: item.data, count: item.count }];
                } else {
                    merchItems[item.data.merchantId].push({ item: item.data, count: item.count });
                }
            }
        });

        const user = this.props.user;
        merchIds.forEach(id => {
            let ordData = new OrderDTO();
            ordData.orderDate = Date.now();
            ordData.merchantId = id;
            ordData.buyerName = this.stringDefault(this.state.buyer);
            ordData.buyerId = user._id;
            ordData.shipTo = {
                street1: this.stringDefault(this.state.street),
                locality: this.stringDefault(this.state.city),
                region: this.stringDefault(this.state.region),
                country: this.state.country ? this.state.country : "Canada",
                postCode: this.stringDefault(this.state.postcode), 
            };
            ordData.status = "PAID";

            ordData.orderSubTotal = 0;
            ordData.shippingCost = 0;
            ordData.tax1 = 0;
            ordData.orderTotal = 0;
            ordData.details = [];

            merchItems[id].forEach(mit => {
                ordData.details.push({
                    itemid: mit.item._id,
                    name: mit.item.name,
                    quantity: mit.count,
                    shipping: mit.item.shipping.$numberDecimal,
                    unitprice: mit.item.price.$numberDecimal
                });
                ordData.orderSubTotal += mit.item.price.$numberDecimal * mit.count;
                ordData.shippingCost += mit.item.shipping.$numberDecimal * mit.count;
                ordData.tax1 += this.getTaxPercent(mit.merchantCountry, user.address.country) * (ordData.orderSubTotal + ordData.shippingCost);
            });
            ordData.orderTotal = ordData.orderSubTotal + ordData.shippingCost + ordData.tax1;

         try {
            var config = {
                withCredentials: true,
                credentials: "same-origin"
            };

            axios.post(process.env.REACT_APP_ServiceURL + "/api/orders/" , ordData, config)
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            });


        } catch (error) {
            this.setState({ displayMessage: error.response.data.msg, hasError: true });
        }

        });

    };

    successPayment = data => {
        this.createOrder(data);
        this.props.clearCart();

        // exit to shop
        this.setState({ paymentComplete: true });
    };

    errorPayment = data => {
        console.log(data);
        alert("Payment Error");
        this.setState({ hasError: true, displayMessage: translate(this.props.locale, "orderSummary.problemWithCard") });
    };

    render() {
        if (this.state.checkOut === true) {
            return <Redirect to='/checkout' />;
        }

        if (this.state.paymentComplete === true) {
            return <Redirect to='/' />;
        }
        const messageColor = this.state.hasError ? "red" : "black";

        return (
            <div className='container'>
                <Row>
                    <Col s={12}>
                        <h4>
                            <FormattedMessage id='orderSummary.title' defaultMessage='Order Summary' />
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col s={8}>
                        <Row>
                            <Col s={12}>
                                <b>{translate(this.props.locale, "orderSummary.shipTo")}</b>
                            </Col>
                        </Row>
                        <Row className='nhRow'>
                            <Col s={3} className='nhLabel'>
                                <b>{translate(this.props.locale, "orderSummary.name")}</b>
                            </Col>
                            <Col s={9}>
                                <div className='nhinput-field'>
                                    <input
                                        className='nhInput'
                                        name='buyer'
                                        value={this.state.buyer}
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                </div>
                            </Col>
                        </Row>
                        <Row className='nhRow'>
                            <Col s={3} className='nhLabel'>
                                <b>{translate(this.props.locale, "orderSummary.street")}</b>
                            </Col>
                            <Col s={9}>
                                <div className='nhinput-field'>
                                    <input
                                        className='nhInput'
                                        name='street'
                                        value={this.state.street}
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                </div>
                            </Col>
                        </Row>
                        <Row className='nhRow'>
                            <Col s={3} className='nhLabel'>
                                <b>{translate(this.props.locale, "orderSummary.city")}</b>
                            </Col>
                            <Col s={9}>
                                <div className='nhinput-field'>
                                    <input
                                        className='nhInput'
                                        name='city'
                                        value={this.state.city}
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                </div>
                            </Col>
                        </Row>
                        <Row className='nhRow'>
                            <Col s={3} className='nhLabel'>
                                {<b>{translate(this.props.locale, "orderSummary.region")}</b>}
                            </Col>
                            <Col s={9}>
                                <div className='nhinput-field'>
                                    <input
                                        className='nhInput'
                                        name='region'
                                        value={this.state.region}
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                </div>
                            </Col>
                        </Row>
                        <Row className='nhRow'>
                            <Col s={3} className='nhLabel'>
                                <b>{translate(this.props.locale, "orderSummary.country")}</b>
                            </Col>
                            <Col s={9}>
                                <CountrySelector changeHandler={e => this.handleCountryChange(e)} selected={"Canada"} />
                            </Col>
                        </Row>
                        <Row className='nhRow'>
                            <Col s={3} className='nhLabel'>
                                <b>{translate(this.props.locale, "orderSummary.postCode")}</b>
                            </Col>
                            <Col s={9}>
                                <div className='nhinput-field'>
                                    <input
                                        className='nhInput'
                                        name='postcode'
                                        value={this.state.postcode}
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col s={4}>
                        <Row className='ttRow'>
                            <Col>&nbsp;</Col>
                        </Row>
                        <Row className='ttRow'>
                            <Col>&nbsp;</Col>
                        </Row>
                        <Row className='ttRow'>
                            <Col s={6}>
                                <div className='right'>
                                    <b>{translate(this.props.locale, "orderSummary.subtotal")}</b>
                                </div>
                            </Col>
                            <Col s={6}>
                                <div className='right'>
                                    <FormattedCurrency amount={this.state.subtotal} />
                                </div>
                            </Col>
                        </Row>
                        <Row className='ttRow'>
                            <Col s={6}>
                                <div className='right'>
                                    <b>{translate(this.props.locale, "orderSummary.shipping")}</b>
                                </div>
                            </Col>
                            <Col s={6}>
                                <div className='right'>
                                    <FormattedCurrency amount={this.state.shipping} />
                                </div>
                            </Col>
                        </Row>
                        <Row className='ttRow'>
                            <Col s={6}>
                                <div className='right'>
                                    <b>{translate(this.props.locale, "orderSummary.tax")}</b>
                                </div>
                            </Col>
                            <Col s={6}>
                                <div className='right'>
                                    <FormattedCurrency amount={this.state.tax} />
                                </div>
                            </Col>
                        </Row>
                        <Row className='ttRow'>
                            <Col s={6}>
                                <div className='right'>
                                    <b>{translate(this.props.locale, "orderSummary.total")}</b>
                                </div>
                            </Col>
                            <Col s={6}>
                                <div className='right'>
                                    <FormattedCurrency amount={this.state.total} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col s={12}>
                        <div className='right'>
                            <CheckoutForm
                                name={"Order: " + this.state.orderId}
                                description={"BlockMarket Purchase"}
                                amount={this.state.total}
                                successPayment={data => this.successPayment(data)}
                                errorPayment={data => this.errorPayment(data)}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <div style={{ marginTop: 15, color: messageColor }} className='center'>
                            <h5>{this.state.displayMessage}</h5>
                        </div>
                    </Col>
                </Row>
                <Row></Row>
                <Row></Row>
                <Row>
                    <Col s={4}>
                        <b>{translate(this.props.locale, "orderSummary.itemName")}</b>
                    </Col>
                    <Col s={2}>
                        <div className='right'>
                            <b>{translate(this.props.locale, "orderSummary.itemPrice")}</b>
                        </div>
                    </Col>
                    <Col s={2}>
                        <div className='right'>
                            <b>{translate(this.props.locale, "orderSummary.ship")}</b>
                        </div>
                    </Col>
                    <Col s={2}>
                        <div className='right'>
                            <b>{translate(this.props.locale, "orderSummary.quantity")}</b>
                        </div>
                    </Col>
                    <Col s={2}>
                        <div className='right'>
                            <b>{translate(this.props.locale, "orderSummary.itemTotal")}</b>
                        </div>
                    </Col>
                </Row>
                <Row>{this.displayOrderItems}</Row>
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

const mapDispatchToProps = dispatch => {
    return {
        clearCart: locale => dispatch(clearCart(locale))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
