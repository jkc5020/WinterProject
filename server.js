/**
 * Server.js
 * @author Jaron Cummings
 * Implements API endpoints for front end to access database
 */
const express = require('express'),
        dbOperation = require('./dbFiles/dbOperation'),
        cors = require('cors');


const API_PORT = process.env.port || 5000;
const app = express()

var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()





/**
 * API endpoint to retrieve countries from database
 */
app.get('/fetchCountries', async (req, res) =>{
    
    const result = await dbOperation.getCountries()
    res.send(result.recordset)
    
})

/**
 * API endpoint to retrieve states from database based on the country provided
 */
app.post('/fetchstate', jsonParser, async (req, res) => {
    
    const result = await dbOperation.getStates(req.body.country)
    res.send(result.recordset)
    
})


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

/**
 * Retrieves data based off selected state and country
 */
app.post('/retrieveData', jsonParser, async(req, res) => {
   
    const result = await dbOperation.retrieveData(req.body.country, req.body.state)
    res.send(result.recordset)
    
})

