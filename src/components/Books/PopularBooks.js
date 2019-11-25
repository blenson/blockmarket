import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import axios from "axios";
import BookCard from "./BookCard";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { setLoggedInStatus } from "../../redux/actions/appActions";
import { setProfile } from "../../redux/actions/profileActions";


class PopularBooks extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            authorized: true
        };
    }

    render() {
        if (this.state.authorized === false) {
            return <Redirect to='/login' />;
        }

        let itemsDisplay = this.state.items.map(item => {
            return (
                <div key={item._id} className='col s12 m12 l6 xl4'>
                    <BookCard item={item} />
                </div>
            );
        });

        return (
            <Fragment>
                <h4>
                    <FormattedMessage id='books.popular' defaultMessage='Popular Books' />
                </h4>
                {itemsDisplay}
            </Fragment>
        );
    }

    componentDidMount() {
        this._isMounted = true;

        var config = {
            withCredentials: true,
            credentials: "same-origin"
        };

        axios
            .get(process.env.REACT_APP_ServiceURL + "/api/books/limit/9", config)
            .then(response => {
                if (this._isMounted) {
                    this.setState({ items: response.data });
                }
            })
            .catch(error => {
                console.log(error);
                if (this._isMounted) {
                    this.props.setLoggedInStatus(false);
                    this.props.setProfile(null);
                    this.setState({ authorized: false });
                }
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
}

const mapStateToProps = state => {
    return {
        locale: state.app.locale
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInStatus: (status) => dispatch(setLoggedInStatus(status)),
        setProfile: (user) => dispatch(setProfile(user)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularBooks);
