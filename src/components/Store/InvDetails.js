import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import M from "materialize-css";
import axios from "axios";

import { Row, Col, Icon, TextInput } from "react-materialize";
import { connect } from "react-redux";
import { selectInvItem, setInvItem } from "../../redux/actions/inventoryActions";
import { translate } from "../../i18n/util/translate";

class InventoryDetails extends Component {
    constructor(props) {
        super(props);

        let item = props.selected;
        if (item === null) {
            return;
        }

        this.state = {
            name: this.defaultValue(item.name),
            itemurl: this.defaultValue(item.image.largeUrl),
            price: this.defaultValue(item.price),
            shipping: this.defaultValue(item.shipping),
            stock: this.defaultValue(item.stock),
            desc: this.defaultValue(item.desc),
            pages: this.defaultValue(item.pages),
            publishYear: this.defaultValue(item.publishYear),
            publisher: this.defaultValue(item.publisher),
            genre: this.defaultValue(item.genre),
            author: this.defaultValue(item.author),
            isbn10: this.defaultValue(item.isbn10),
            isbn13: this.defaultValue(item.isbn13)
        };
    }

    defaultValue(field, val = "") {
        if (!field) {
            return val;
        }
        if (field.$numberDecimal) {
            return field.$numberDecimal;
        }
        return field;
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value, displayMessage: "" });
    }

    async saveInvDetails() {
        try {
            let details = Object.assign({}, this.props.selected);

            details = {
                ...details,
                name: this.state.name,
                image: {
                    largeUrl: this.state.itemurl
                },
                price: this.state.price,
                shipping: this.state.shipping,
                stock: this.state.stock,
                desc: this.state.desc,
                pages: this.state.pages,
                publishYear: this.state.publishYear,
                publisher: this.state.publisher,
                genre: this.state.genre,
                author: this.state.author,
                isbn10: this.state.isbn10,
                isbn13: this.state.isbn13
            };

            var config = {
                withCredentials: true,
                credentials: "same-origin"
            };

            let newDetails = null;
            if (this.props.selected._id) {
                newDetails = await axios.put(process.env.REACT_APP_ServiceURL + "/api/books/" + details._id, details, config);
            }
            else {
                newDetails = await axios.post(process.env.REACT_APP_ServiceURL + "/api/books/" , details, config);
            }
            console.log(newDetails)
            this.props.setInvItem(newDetails);
            
        } catch (error) {
            this.setState({ displayMessage: error.response.data.msg, hasError: true });
        }
    }

    componentDidMount() {
        let item = this.props.selected;

        if (item === null) {
            return;
        }

        M.textareaAutoResize(this.TArea);
    }

    render() {
        if (this.state === null) {
            return null;
        }

        return (
            <div className='card'>
                <div className='card-content'>
                    <Row>
                        <Col s={12}>
                            <span
                                className='btn-floating waves-effect waves-light indigo right'
                                onClick={e => this.saveInvDetails()}
                            >
                                <Icon>save</Icon>
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span
                                className='btn-floating waves-effect waves-light indigo'
                                onClick={e => this.props.selectInvItem(null)}
                            >
                                <Icon>navigate_before</Icon>
                            </span>{" "}
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <div className='center'>
                                <img src={this.state.itemurl} alt='' height='180' />
                            </div>
                            <div className='center'>
                                <span className='btn-floating btn-small waves-effect waves-light indigo center'>
                                    <Icon>edit</Icon>
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <Row></Row>
                    <Row>
                        <Col s={12}>
                            <TextInput
                                noLayout={true}
                                label={translate(this.props.locale, "books.title")}
                                name='name'
                                value={this.state.name}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <TextInput
                                noLayout={true}
                                label={translate(this.props.locale, "books.author")}
                                name='author'
                                value={this.state.author}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <div className='input-field col s12'>
                            <textarea
                                id='descTextarea'
                                className='materialize-textarea'
                                label={translate(this.props.locale, "books.description")}
                                value={this.state.desc}
                                onChange={e => this.handleChange(e)}
                                name='desc'
                                ref={TArea => {
                                    this.TArea = TArea;
                                }}
                            ></textarea>
                            <label htmlFor='descTextarea' className='active'>
                            {translate(this.props.locale, "books.description")}
                            </label>
                        </div>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <TextInput
                                noLayout={true}
                                label={translate(this.props.locale, "books.price")}
                                name='price'
                                value={"" + this.state.price}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <TextInput
                                noLayout={true}
                                label={translate(this.props.locale, "books.shipping")}
                                name='shipping'
                                value={"" + this.state.shipping}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <TextInput
                                noLayout={true}
                                label={translate(this.props.locale, "books.stocklevel")}
                                name='stock'
                                value={"" + this.state.stock}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <TextInput
                                noLayout={true}
                                label={translate(this.props.locale, "books.pages")}
                                name='pages'
                                value={"" + this.state.pages}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <TextInput
                                noLayout={true}
                                label={translate(this.props.locale, "books.publishyear")}
                                name='publishYear'
                                value={"" + this.state.publishYear}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <TextInput
                                noLayout={true}
                                label={translate(this.props.locale, "books.publisher")}
                                name='publisher'
                                value={this.state.publisher}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <TextInput
                                noLayout={true}
                                label={translate(this.props.locale, "books.genre")}
                                name='genre'
                                value={this.state.genre}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <TextInput
                                noLayout={true}
                                label='ISBN10'
                                name='isbn10'
                                value={this.state.isbn10}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <TextInput
                                noLayout={true}
                                label='ISBN13'
                                name='isbn13'
                                value={this.state.isbn13}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        locale: state.app.locale,
        selected: state.inventory.selected,
        loggedIn: state.app.loggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectInvItem: payload => dispatch(selectInvItem(payload)),
        setInvItem: item => dispatch(setInvItem(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryDetails);
