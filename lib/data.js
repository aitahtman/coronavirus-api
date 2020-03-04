const { StringStream } = require("scramjet");
const request = require('request');
const _ = require('lodash');
const utils = require('./utils')

const baseAttributes = ['Province/State', 'Country/Region', 'Lat', 'Long']





const transformObject = (obj, sheet) => {

    let generatedRows = []

    const objectKeys = Object.keys(obj);
    const diffFields = _.difference(objectKeys, baseAttributes)

    diffFields.map((field) => {
        let objectToPush = {
            'province': obj[baseAttributes[0]],
            'country': obj[baseAttributes[1]],
            'lat': obj[baseAttributes[2]],
            'long': obj[baseAttributes[3]],
            'date': field
        }
        objectToPush[sheet] = obj[field]
        generatedRows.push(objectToPush)
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
                generatedRows = transformObject(object, file)
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






const mergeSheets = async (data, sheets) => {

    let merged = []
    const firstSheetData = data[sheets[0]].current
    const secondSheetData = data[sheets[1]].current
    const thirdSheetData = data[sheets[2]].current

    for (let i = 0; i < firstSheetData.length; i++) {
        // work only with ordered arrays (be careful)
        merged.push({ ...firstSheetData[i], ...secondSheetData[i], ...thirdSheetData[i] })
    }
    return merged

}

module.exports.mergeSheets = mergeSheets
