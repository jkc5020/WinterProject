const express = require('express'),
        cors = require('cors');


const API_PORT = process.env.port || 5000;
const app = express()

app.get('/api', function(req, res){
    console.log("Called");
    res.send({result: 'Hellloooo'})
})


app.get('/quit ', function(req, res){
    console.log("Called");
    res.send({result: ''})
})
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));