import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { Icon, Row, Col } from "react-materialize";

import { useDispatch, useSelector } from "react-redux";
import FormattedCurrency from "../Misc/FormattedCurrency";
import { selectInvItem } from "../../redux/actions/inventoryActions";
import { translate } from "../../i18n/util/translate";

const InventoryCard = props => {
    const dispatch = useDispatch();
    const locale = useSelector(state => state.app.locale);

    return (
        <div className='card'>
            <div className='card-content'>
                <Row>
                    <Col s={12}>
                        <span
                            className='btn-floating btn-small waves-effect waves-light indigo right'
                            onClick={e => dispatch(selectInvItem(props.item))}
                        >
                            <Icon>edit</Icon>
                        </span>{" "}
                    </Col>
                </Row>
                <Row>
                    <Col s={12} m={2} l={2}>
                        <div className='center'>
                            <img src={props.item.image.largeUrl} alt='' height='120' />
                        </div>
                    </Col>
                    <Col s={12} m={5} l={5}>
                        <Row>
                            <Col s={3}>
                                <b>{translate(locale, "store.bookname")}</b>
                            </Col>
                            <Col s={9}>{props.item.name}</Col>
                        </Row>
                        <Row>
                            <Col s={3}>
                                <b>{translate(locale, "store.author")}</b>
                            </Col>
                            <Col s={9}>{props.item.author}</Col>
                        </Row>
                        <Row>
                            <Col s={3}>
                                <b>{translate(locale, "store.genre")}</b>
                            </Col>
                            <Col s={9}>{props.item.genre}</Col>
                        </Row>
                    </Col>
                    <Col s={12} m={5} l={5}>
                        <Row>
                            <Col s={3}>
                                <b>{translate(locale, "store.stock")}</b>
                            </Col>
                            <Col s={9}>{props.item.stock}</Col>
                        </Row>
                        <Row>
                            <Col s={3}>
                                <b>{translate(locale, "store.price")}</b>
                            </Col>
                            <Col s={9}>
                                <FormattedCurrency amount={props.item.price} />
                            </Col>
                        </Row>
                        <Row>
                            <Col s={3}>
                                <b>{translate(locale, "store.shipping")}</b>
                            </Col>
                            <Col s={9}>
                                <FormattedCurrency amount={props.item.shipping} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default InventoryCard;
