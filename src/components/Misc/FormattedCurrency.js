import React from "react";
import { FormattedNumber } from "react-intl";
import { useSelector } from "react-redux";
import { parseCurrency } from "../../i18n/util/i18nHelpers";

let cultureInfo = require("../../i18n/util/cultures.json");

const FormattedCurrency = props => {
    const locale = useSelector(state => state.app.locale);
    return (
        <FormattedNumber
            value={parseCurrency(props.amount, locale)}
            style={`currency`}
            signDisplay='never'
            currency={cultureInfo[locale].currency}
        />
    );
};

export default FormattedCurrency;
