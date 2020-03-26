const { StringStream } = require("scramjet");
const request = require('request');
const _ = require('lodash');
const utils = require('./utils')

const baseAttributes = ['Province/State', 'Country/Region', 'Lat', 'Long']

const transformObject = (obj, sheet) => {

    let generatedRows = []

    // trim() est pour supprimer un espace invisible 
    const objectKeys = Object.keys(obj).map(o => String(o).trim())

    const diffFields = _.difference(objectKeys, baseAttributes)

    diffFields.map((field) => {
        
        let objectToPush = {
            'province': obj[baseAttributes[0]] ? obj[baseAttributes[0]] : '',
            'country': obj[baseAttributes[1]],
            'lat': obj[baseAttributes[2]],
            'long': obj[baseAttributes[3]],
            'date': field
        }
        objectToPush[sheet] = parseInt(obj[field])
        generatedRows.push(objectToPush)
    })


    return _.sortBy(generatedRows, ['country', 'date']);
}


const findLastUpdate = (locationDataArray, sheet) => {
    // console.log(locationDataArray)
    const maxArray = utils.getMaxArrayVal(locationDataArray, sheet)
    // console.log(maxArray)
    return maxArray

}


const getDataFromCSVByUrl = async (file) => {
    let results = []

    let lastResults = []
    const url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_${file}_global.csv
    `
    // url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-${file}.csv`
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
                lastUpdateData = findLastUpdate(generatedRows, file)

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
    // const thirdSheetData = data[sheets[2]].current

    for (let i = 0; i < firstSheetData.length; i++) {
        // work only with ordered arrays (be careful)
        merged.push({ ...firstSheetData[i], ...secondSheetData[i] })
    }
    return merged

}

module.exports.mergeSheets = mergeSheets


const stringToDate = (_date) => {

    const formatedDate = new Date(_date)
    const dd = formatedDate.getDate()
    const mm = parseInt(formatedDate.getMonth()) + 1
    const yyyy = formatedDate.getFullYear()
    const dateParse = { 'dd': dd < 10 ? `0${dd}` : dd, 'mm': mm < 10 ? `0${mm}` : mm, 'yyyy': `${yyyy}` }
    return `${dateParse['yyyy']}/${dateParse['mm']}/${dateParse['dd']}`
}

const getSumBySheetName = (data, uniqueDates, sheet) => {
    const sheetData = data[sheet].histo
    return uniqueDates.map((d) => {
        const summary = sheetData.filter(o => o.date === d).map(k => {
            return parseInt(k[sheet])
        }).reduce((acc, curr) => { return acc + curr })

        const parsedDate = stringToDate(d)
        return { 'date': parsedDate, 'value': summary }
    })

}

const getStats = async (data, sheets) => {
    // console.time('stats')
    let uniqueDates = [...new Set(data[sheets[0]].histo.map(item => item.date))];


    let stats = {}

    for (let i = 0; i < sheets.length; i++) {
        const sheet = sheets[i];
        stats[sheet] = getSumBySheetName(data, uniqueDates, sheet).sort((a, b) => (a.date > b.date ? 1 : -1))
    }

    // console.timeEnd('stats')
    return stats
}

module.exports.getStats = getStats
