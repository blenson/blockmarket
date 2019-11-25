import React from "react";
import { FormattedNumber } from "react-intl";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import StarRatings from "react-star-ratings";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";

let cultureInfo = require("../../i18n/util/cultures.json");

const BookCard = props => {
    const locale = useSelector(state => state.app.locale);
    const dispatch = useDispatch();

    const truncate = (input, len) => (input.length > len ? `${input.substring(0, len)}...` : input);

    let item = props.item;
    if (item == null) {
        return null;
    }

    //!TODO - DEMO ONLY = Remove the next line after real currency conversions are implemented
    let currencyFactor = locale === "ja" ? 100 : 1;

    return (
        <div className='card'>
            <div className='center'>
                <img src={item.image.largeUrl} alt='' height='178' />
            </div>
            <div className='card-content'>
                <span>
                    <b>{truncate(item.name, 20)}</b>
                </span>
                <p>{truncate(item.author, 25)}</p>
                <StarRatings rating={item.rating / 10} starRatedColor='blue' starDimension='15px' starSpacing='3px' />
                <span style={{ marginLeft: 10 }}>({item.numRatings})</span>
                <p style={{ marginTop: 15 }}>
                    <span
                        className='btn-floating waves-effect waves-light red right z-depth-0'
                        style={{ bottom: 10 }}
                        onClick={e => {
                            dispatch(addToCart(item));
                        }}
                    >
                        <i className='material-icons'>add</i>
                    </span>
                    <b>
                        <FormattedNumber
                            value={parseFloat(item.price.$numberDecimal).toFixed(2) * currencyFactor}
                            style={`currency`}
                            currency={cultureInfo[locale].currency}
                        />
                    </b>
                </p>
            </div>
        </div>
    );
};

export default BookCard;
