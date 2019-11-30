import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import StarRatings from "react-star-ratings";
import { CollectionItem, Icon, Row, Col } from "react-materialize";

import { useDispatch } from "react-redux";
import { decCartItemCount, incCartItemCount } from "../../redux/actions/cartActions";
import FormattedCurrency from "../Misc/FormattedCurrency";

const CartCard = props => {
    const dispatch = useDispatch();

    let item = props.item;
    if (item === null) {
        return null;
    }

    return (
        <CollectionItem>
            <Row>
                <Col s={12} m={3} l={3}>
                    <img src={item.image.largeUrl} alt='' height='120' />
                </Col>
                <Col s={12} m={4} l={4}>
                    <div className='title'>
                        <b>{item.name}</b>
                    </div>
                    <div>{item.author}</div>
                    <div>{item.genre}</div>
                    <StarRatings rating={item.rating / 10} starRatedColor='blue' starDimension='15px' starSpacing='3px' />
                    <span style={{ marginLeft: 10 }}>({item.numRatings})</span>
                    <div></div>

                    <p>
                        <FormattedCurrency amount={item.price} />
                    </p>
                </Col>
                <Col s={12} m={3} l={3}>
                    <h5>
                        <span
                            className='btn-floating btn-small waves-effect waves-light indigo'
                            onClick={e => {
                                dispatch(decCartItemCount(item._id));
                            }}
                        >
                            <Icon>remove</Icon>
                        </span>{" "}
                        {props.count}{" "}
                        <span
                            className='btn-floating btn-small waves-effect waves-light indigo'
                            onClick={e => {
                                dispatch(incCartItemCount(item._id));
                            }}
                        >
                            <Icon>add</Icon>
                        </span>
                    </h5>
                </Col>
                <Col s={12} m={2} l={2}>
                    <h5>
                        <FormattedCurrency amount={parseFloat(item.price.$numberDecimal) * props.count} />
                    </h5>
                </Col>
            </Row>
        </CollectionItem>
    );
};

export default CartCard;
