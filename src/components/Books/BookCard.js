import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import StarRatings from "react-star-ratings";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import FormattedCurrency from "../Misc/FormattedCurrency";

const BookCard = props => {
    const dispatch = useDispatch();

    const truncate = (input, len) => (input.length > len ? `${input.substring(0, len)}...` : input);

    let item = props.item;
    if (item == null) {
        return null;
    }

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
                        <FormattedCurrency amount={item.price} />
                    </b>
                </p>
            </div>
        </div>
    );
};

export default BookCard;
