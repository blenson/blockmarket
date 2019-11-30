import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import M from "materialize-css";
import { Row, Col } from "react-materialize";

import { translate } from "../../i18n/util/translate";

import FormattedCurrency from "../Misc/FormattedCurrency";
import { connect } from "react-redux";
import axios from 'axios';

class OrderCard extends Component {
    componentDidMount() {
        M.FormSelect.init(this.SelectCTL);
        let status = this.props.item.status;
        this.SelectCTL.value = status;
        M.FormSelect.init(this.SelectCTL);
    }


    displayOrderItems = details => {
        return details.map(item => {
            return (
                <Row key={item._id}>
                    <Col s={4}>{item.name}</Col>
                    <Col s={2}>
                        <div className='right'>{<FormattedCurrency amount={item.unitprice} />}</div>
                    </Col>
                    <Col s={2}>
                        <div className='right'>{<FormattedCurrency amount={item.shipping} />}</div>
                    </Col>
                    <Col s={2}>
                        <div className='right'>{item.quantity}</div>
                    </Col>
                    <Col s={2}>
                        <div className='right'>
                            <FormattedCurrency amount={(item.unitprice + item.shipping) * item.quantity} />
                        </div>
                    </Col>
                </Row>
            );
        });
    };

    saveStatus = async (status) => {
        try {
            let item = Object.assign({}, this.props.item);

            item = {
                ...item,
                status: status
            };

            var config = {
                withCredentials: true,
                credentials: "same-origin"
            };

            await axios.put(process.env.REACT_APP_ServiceURL + "/api/orders/" + item._id, item, config);
            
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let shipTo = this.props.item.shipTo;
        let buyerAddress =
            shipTo.street1 + ", " + shipTo.locality + ", " + shipTo.region + ", " + shipTo.country + ", " + shipTo.postCode;

        return (
            <div className='card'>
                <div className='card-content'>
                    <Row>
                        <Col s={2}>
                            <b>{translate(this.props.locale, "store.orderid")}</b>
                        </Col>
                        <Col s={10}>
                            <b>{this.props.item._id}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={2}>
                            <b>{translate(this.props.locale, "store.orderdate")}</b>
                        </Col>
                        <Col s={10}>{new Date(this.props.item.orderDate).toLocaleString(this.props.locale)}</Col>
                    </Row>
                    <Row>
                        <Col s={2}><div style={{marginTop: 10}}><b>{translate(this.props.locale, "store.status")}</b></div></Col>
                        <Col s={3}>
                                <div className='ddInput-field col s12'>
                                    <select
                                        className='ddInput'
                                        ref={SelectCTL => {
                                            this.SelectCTL = SelectCTL;
                                        }}
                                        onChange={()=>{this.saveStatus(this.SelectCTL.value)}}
                                    >
                                        <option value='PACKAGING'>{translate(this.props.locale, "store.status.packaging")}</option>
                                        <option value='SHIPPED'>{translate(this.props.locale, "store.status.shipped")}</option>
                                        <option value='DELIVERED'>{translate(this.props.locale, "store.status.delivered")}</option>
                                        <option value='PAID'>{translate(this.props.locale, "store.status.paid")}</option>
                                    </select>
                                </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={2}>
                            <b>{translate(this.props.locale, "store.buyer")}</b>
                        </Col>
                        <Col s={10}>{this.props.item.buyerName}</Col>
                    </Row>
                    <Row>
                        <Col s={2}>
                            <b>{translate(this.props.locale, "store.address")}</b>
                        </Col>
                        <Col s={10}>{buyerAddress}</Col>
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
                    {this.displayOrderItems(this.props.item.details)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.profile.user,
        locale: state.app.locale
    };
};

export default connect(mapStateToProps)(OrderCard);
