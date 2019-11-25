import React from "react";
import { FormattedNumber } from "react-intl";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import StarRatings from "react-star-ratings";
import { CollectionItem, Icon, Row, Col } from "react-materialize";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, decCartItemCount, incCartItemCount } from "../../redux/actions/cartActions";

let cultureInfo = require("../../i18n/util/cultures.json");

const CartCard = props => {
    const locale = useSelector(state => state.app.locale);
    const dispatch = useDispatch();

    const truncate = (input, len) => (input.length > len ? `${input.substring(0, len)}...` : input);

    let item = props.item;
    if (item === null) {
        return null;
    }

    //!TODO - DEMO ONLY = Remove the next line after real currency conversions are implemented
    let currencyFactor = locale === "ja" ? 100 : 1;

    return (
        <CollectionItem className='avatar'>
            <Row>
                <Col s={12} m={3} l={2}>
                    <img src={item.image.largeUrl} alt='' height='120' />
                </Col>
                <Col s={12} m={6} l={8}>
                    <div className='title'>
                        <b>{item.name}</b>
                    </div>
                    <div>{item.author}</div>
                    <div>{item.genre}</div>
                    <StarRatings rating={item.rating / 10} starRatedColor='blue' starDimension='15px' starSpacing='3px' />
                    <span style={{ marginLeft: 10 }}>({item.numRatings})</span>

                    <p>
                        <FormattedNumber
                            value={parseFloat(item.price.$numberDecimal).toFixed(2) * currencyFactor}
                            style={`currency`}
                            currency={cultureInfo[locale].currency}
                        />
                    </p>
                </Col>
                <Col s={12} m={3} l={2}>
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
                <Col s={2}>
                    <h5>
                        <FormattedNumber
                            value={parseFloat(item.price.$numberDecimal).toFixed(2) * currencyFactor * props.count}
                            style={`currency`}
                            currency={cultureInfo[locale].currency}
                        />
                    </h5>
                </Col>
            </Row>
        </CollectionItem>
    );
};

export default CartCard;
