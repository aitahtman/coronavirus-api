
/* return a last elem of an array */

const lastElemArray = (array) => {
    return array.reduce((prev, current) => (prev.y > current.y) ? prev : current)
}

module.exports.lastElemArray = lastElemArray


/* return the highest value in array of object */
const getMaxArrayVal = (data,sheet) => {
    const max = data.reduce((prev, current) => {
        // console.log(prev[sheet],current[sheet])
        return (prev[sheet] > current[sheet]) ? prev : current
    })
    return max
}

module.exports.getMaxArrayVal = getMaxArrayVal