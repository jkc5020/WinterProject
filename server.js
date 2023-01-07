
const express = require('express'),
        dbOperation = require('./dbFiles/dbOperation'),
        cors = require('cors');


const API_PORT = process.env.port || 5000;
const app = express()

var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({extended: false})

// app.get('/api', function(req, res){
//     console.log("Called");
//     console.log("hellooo")
// })



app.get('/fetchCountries', async (req, res) =>{
    
    const result = await dbOperation.getCountries()
    res.send(result.recordset)
    
})

app.post('/fetchstate', jsonParser, async (req, res) => {
    console.log(' fetchState called');
    console.log(req.body.country)
    const result = await dbOperation.getStates(req.body.country)
    res.send(result.recordset)
    console.log(result)
})

app.get('/quit ', function(req, res){
    console.log("Called");
    res.send({result: ''})
})
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));


dbOperation.getEmployees().then(res => {
    console.log(res);
})