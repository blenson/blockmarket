export function parseCurrency(amount, country = "us") {
    let currencyFactor = country === "ja" ? 100 : 1;
    let retAmount = 0;
    if (typeof amount === "object") {
        retAmount = parseFloat(amount.$numberDecimal).toFixed(2);
    } else if (typeof amount === "string") {
        retAmount = parseFloat(amount).toFixed(2);
    } else retAmount = amount;
    return parseFloat(retAmount) * currencyFactor;
}

