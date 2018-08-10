const numeral = require('numeral')

Number._format = function (n?: number) {
    if (n === undefined || Number.isNaN(n))
        return ''
    if(n < 0.001) {
        return n
    }
    return numeral(n).format('0,0.00')
}
