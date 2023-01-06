
const express = require('express'),
        dbOperation = require('./dbFiles/dbOperation'),
        cors = require('cors');


const API_PORT = process.env.port || 5000;
const app = express()

// app.get('/api', function(req, res){
//     console.log("Called");
//     console.log("hellooo")
// })



app.get('/fetchCountries', async (req, res) =>{
    console.log("fetchCountries")
    const result = await dbOperation.getCountries()
    res.send(result.recordset)
    
})

app.post('/fetchstate', async (req, res) => {
    console.log('called');
    const result = await dbOperation.getStates()
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