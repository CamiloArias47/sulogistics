export function formatPrice(price) {
    const formatOptions = { style: 'currency', currency: 'COP', maximumFractionDigits: 0, minimumFractionDigits: 0, }
    return new Intl.NumberFormat('es-CO', formatOptions).format(price)
}

export function formatDate(dateStr) {

    if(dateStr === '') return dateStr

    const options = { year: 'numeric', month: 'short', day:'numeric'};

    const date = new Date(dateStr)
    const formatedDate = new Intl.DateTimeFormat('es-CO',options).format(date)
    return formatedDate
}

export function formatNum(num) {
    return new Intl.NumberFormat('es-CO').format(num)
}