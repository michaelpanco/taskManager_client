const getPercentage = (value: any, total: any, decimalPlaces = 0) => {
    const percentage = (value / total) * 100;
    return percentage.toFixed(decimalPlaces);
};

const currencyFormatter = (amount: number, decimalPlaces: number = 2) => {
    let formatted_amount = amount.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '$' + formatted_amount;
};

const numberFormatter = (num: number) => {
    let formatted_amount = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formatted_amount;
};

export { getPercentage, currencyFormatter, numberFormatter };
