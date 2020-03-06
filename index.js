const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const CVData = require('./lib/data')

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/getDataHisto', async (req, res) => {
    const files = ["Confirmed", "Deaths", "Recovered"]
    const results = {}
    for (let i = 0; i < files.length; i++) {
        const dataType = files[i];
        results[dataType] = await CVData.getDataFromCSVByUrl(dataType)
        console.log(results[dataType].histo.length, results[dataType].current.length)
    }
    res.send(results)
})


app.get('/getData', async (req, res) => {
    const files = ["Confirmed", "Deaths", "Recovered"]
    const results = {}
    for (let i = 0; i < files.length; i++) {
        const dataType = files[i];
        results[dataType] = await CVData.getDataFromCSVByUrl(dataType)
    }
    const formatedResults = await CVData.mergeSheets(results, files)

    const stats = await CVData.getStats(results, files)

    res.send({ 'current': results, 'stats': stats })


})

app.listen(port, function () {
    console.log(`server is ready 🔥 🔥 🔥 ${port}`)
})

