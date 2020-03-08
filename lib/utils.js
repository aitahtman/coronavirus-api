
/* return a last elem of an array */

const lastElemArray = (array) => {
    return array.reduce((prev, current) => (prev.y > current.y) ? prev : current)
}

module.exports.lastElemArray = lastElemArray


/* return the highest value in array of object */
const getMaxArrayVal = (data, sheet) => {

    const max = data.reduce((prev, current) => {
        return (parseInt(prev[sheet]) > parseInt(current[sheet])) ? prev : current
    })

    return max
}

module.exports.getMaxArrayVal = getMaxArrayVal