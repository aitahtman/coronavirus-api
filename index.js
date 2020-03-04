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

app.get('/getData', async (req, res) => {
    const files = ["Confirmed", "Deaths", "Recovered"]
    const results = {}
    for (let i = 0; i < files.length; i++) {
        const dataType = files[i];
        results[dataType] = await CVData.getDataFromCSVByUrl(dataType)
    }
    res.send(results)

})

app.listen(port, function () {
    console.log(`server is ready 🔥 🔥 🔥 ${port}`)
})

