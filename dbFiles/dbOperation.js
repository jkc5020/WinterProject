const config                    = require('./dbConfig'),
        sqlConnectionToServer   = require('mssql');




const getCountries = async () =>{

    let pool = await sqlConnectionToServer.connect(config);
    let countries = await pool.request().query("select distinct country from Region")
    return countries;
}
const getEmployees = async () =>{
    try{
        let pool = await sqlConnectionToServer.connect(config);
        let employees = await pool.request().query("select * from MasterTable where id < 5")
        console.log(employees);
        return employees;
    }

    catch(error){
        console.log(error);
    }
}


const getStates = async(country) =>{
    try{
        let pool = await sqlConnectionToServer.connect(config);
        let states = await pool.request().query(`SELECT STATE FROM REGION WHERE COUNTRY =  '${country}'`)
        console.log(country)
        console.log("getting the states")
        console.log(states)
        return states
    }

    catch(error){
        console.log(error)
    }
}

module.exports = {
    getEmployees, getStates, getCountries
}