import React from 'react';

const CountBadge = (props) => {

    if (props.counter === null || props.counter === '0') {
        return null;
    }
    return(
        <small className='notification-badge'>{props.counter}</small>
    )
}

export default CountBadge;