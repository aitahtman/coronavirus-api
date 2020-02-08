const express = require('express')
const app = express()
const port = 8080

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(port, function () {
    console.log(`server is ready 🔥🔥🔥 ${port}`)
})