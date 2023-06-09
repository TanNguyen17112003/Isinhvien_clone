const convertToDateTime = (_date, hasTime, hyphen = ' ', format = 'en-GB') => {
    let date = new Date(_date);
    return `${date?.toLocaleDateString('en-GB')}${hasTime ? `${hyphen}${date?.toLocaleTimeString(format)}` : ''}`
}

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB').format(value || 0);
}

const copyText = (value) => {
    return navigator.clipboard.writeText(value);
};


export { convertToDateTime, formatCurrency, copyText }
