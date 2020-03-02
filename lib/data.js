const { StringStream } = require("scramjet");
const request = require('request');
const _ = require('lodash');
const utils = require('./utils')

const baseAttributes = ['Province/State', 'Country/Region', 'Lat', 'Long']





const transformObject = (obj) => {

    let generatedRows = []

    const objectKeys = Object.keys(obj);
    const diffFields = _.difference(objectKeys, baseAttributes)

    diffFields.map((field) => {
        generatedRows.push({
            'province': obj[baseAttributes[0]],
            'country': obj[baseAttributes[1]],
            'lat': obj[baseAttributes[2]],
            'long': obj[baseAttributes[3]],
            'date': field,
            'value': obj[field]
        })
    })


    return _.sortBy(generatedRows, ['country', 'date']);
}


const findLastUpdate = (locationDataArray) => {

    const maxArray = utils.getMaxArrayVal(locationDataArray)

    return maxArray

}


const getDataFromCSVByUrl = async (file) => {
    let results = []

    let lastResults = []
    url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-${file}.csv`
    await request.get(url)   // fetch csv
        .pipe(new StringStream)                       // pass to stream
        .CSVParse({
            skipEmptyLines: true,
            header: true,
        })                                   // parse into objects
        .consume(
            object => {
                // results.push(object) 
                generatedRows = transformObject(object)
                lastUpdateData = findLastUpdate(generatedRows)
                // console.log(lastUpdateData)
                results = [...results, ...generatedRows]
                lastResults = [...lastResults, lastUpdateData]
            }
        )  // misc
        .then(() => {
            // TODO : GET LAST NOT NULL VALUE

        }
        )
    return { 'histo': results, 'current': lastResults }
}

module.exports.getDataFromCSVByUrl = getDataFromCSVByUrl


