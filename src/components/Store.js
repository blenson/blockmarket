import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import M from "materialize-css";

import { Row, Col, Icon } from "react-materialize";

import { connect } from "react-redux";
import { selectInvItem } from "../redux/actions/inventoryActions";

import { FormattedMessage } from "react-intl";
import { translate } from "../i18n/util/translate";

import StoreDetails from "./Store/StoreDetails";
import Inventory from "./Store/Inventory";
import Orders from "./Store/Orders";

class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: "inventory",
            addItem: false
        };
    }

    componentDidMount() {
        M.Tabs.init(this.TTab);
    }

    addNewItem = () => {
        let details = {
            merchantId: this.props.user._id,
            merchantCountry: this.props.user.address.country,
            name: "New Book",
            image: {
                largeUrl: process.env.REACT_APP_ServiceURL + "/images/default-bookcover.jpg"
            },
            price: 0.0,
            shipping: 0.0,
            stock: 0,
            desc: "",
            pages: 0,
            rating: 0,
            numRatings: 0,
            publishYear: 0,
            publisher: "",
            genre: "",
            author: "",
            isbn10: "",
            isbn13: ""
        };
        this.props.selectInvItem(details);
    };

    render() {
        return (
            <div className='container'>
                <Row>
                    <Col>
                        <h4>
                            <FormattedMessage id='store.title' defaultMessage='Store Management' />
                        </h4>
                    </Col>
                </Row>

                <Row>
                    <div className='col s12'>
                        <div className='card'>
                            <ul
                                className='tabs'
                                ref={TTab => {
                                    this.TTab = TTab;
                                }}
                            >
                                <li className='tab col s3'>
                                    <a
                                        id='1'
                                        href='#tab1'
                                        onClick={e => {
                                            this.setState({ selectedTab: "details" });
                                        }}
                                    >
                                        {translate(this.props.locale, "store.details")}
                                    </a>
                                </li>
                                <li className='tab col s3'>
                                    <a
                                        className='active'
                                        id='2'
                                        href='#tab2'
                                        onClick={e => {
                                            this.setState({ selectedTab: "inventory" });
                                        }}
                                    >
                                        {translate(this.props.locale, "store.inventory")}
                                    </a>
                                </li>
                                <li className='tab col s3'>
                                    <a
                                        href='#tab3'
                                        id='3'
                                        onClick={e => {
                                            this.setState({ selectedTab: "orders" });
                                        }}
                                    >
                                        {translate(this.props.locale, "store.orders")}
                                    </a>
                                </li>
                                {this.state.selectedTab === "inventory" ? (
                                    <li className='col s3'>
                                        <span
                                            className='btn-floating btn-small waves-effect waves-light indigo right'
                                            style={{ marginTop: 5 }}
                                            onClick={() => {
                                                this.addNewItem();
                                            }}
                                        >
                                            <Icon>add</Icon>
                                        </span>
                                    </li>
                                ) : (
                                    " "
                                )}
                            </ul>
                        </div>
                    </div>
                    <div id='tab1' className='col s12'>
                        <StoreDetails />
                    </div>
                    <div id='tab2' className='col s12'>
                        <Inventory addItem='aaa' />
                    </div>
                    <div id='tab3' className='col s12'>
                        <Orders />
                    </div>
                </Row>
            </div>
        );
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
        selectInvItem: payload => dispatch(selectInvItem(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
