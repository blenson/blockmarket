import React, { Component } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

// stolen example from https://www.npmjs.com/package/react-select-country-list
// slightly modified
class CountrySelector extends Component {
    constructor(props) {
        super(props);

        this.options = countryList().getData();

        this.state = {
            options: this.options,
        };
    }

    customStyles = (height = 35) => {
        return {
            control: (base, state) => ({
                ...base,
                borderColor: state.isFocused
                ? 'teal'
                : base.borderColor,
                boxShadow: state.isFocused ? "0 0 0 1px teal" : base.boxShadow,
                "&:hover": {
                    borderColor: state.isFocused ? "teal" : base.borderColor },
                height: height,
                minHeight: height
            }),
            container: base => ({
                ...base,
                height: height,
                minHeight: height
            }),
            input: base => ({
                ...base,
                height: height,
                minHeight: height
            }),
            valueContainer: base => ({
                ...base,
                height: height,
                minHeight: height
            })
        };
    };

    render() {
        return (
            <Select
                styles={this.customStyles()}
                options={this.state.options}
                defaultValue={this.options.filter(option => option.label === this.props.selected)}
                onChange={this.props.changeHandler}
            />
        );
    }
}

export default CountrySelector;
