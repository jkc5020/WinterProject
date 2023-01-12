/**
 * dbOperation.js
 * @author - Jaron Cummings
 * Performs operations on the database and sends results to the server
 */

const config                    = require('./dbConfig'),
        sqlConnectionToServer   = require('mssql');



/**
 * Database operation to retrieve distinct list of countries
 * @returns the countries
 */
const getCountries = async () =>{

    let pool = await sqlConnectionToServer.connect(config);
    let countries = await pool.request().query("select distinct country from Region")
    return countries;
}


/**
 * Database operation to retrieve the list of states corresponding to a selected country
 * @param {} country - the coutry selected
 * @returns - states of that country
 */
const getStates = async(country) =>{
    try{
        let pool = await sqlConnectionToServer.connect(config);
        let states = await pool.request().query(`SELECT STATE FROM REGION WHERE COUNTRY =  '${country}'`)
        return states
    }

    catch(error){
        console.log(error)
    }
}


/**
 * Retrieves analysis of data from the database
 * @param {} country - selected country
 * @param {*} state  - selected states
 * @returns - analysis of the data from that  region
 */
const retrieveData = async(country, state) =>{
    try{
        let pool = await sqlConnectionToServer.connect(config);
        let data = await pool.request().query(`select * 
        from
        (select top 1 x.Sub_Category, SUM((x.c * Quantity)) as tQuanity
        from
        (select Sub_Category, count(Sub_Category) as c, Quantity
            from MasterTable
            where Country = '${country}' and State_Region = '${state}'
            group by Sub_Category, Quantity
            ) x
        group by x.Sub_Category
        order by tQuanity desc)a cross join
        
        (select distinct top 1 Purchase_Year, COUNT(Purchase_Year) as Count_Year
        from MasterTable
        where Country = '${country}' and State_Region = '${state}'
        group by Purchase_Year
        order by Count_Year desc)b cross join
        
        (select distinct top 1 Purchase_Month, COUNT(Purchase_Month) as count_Month
        from MasterTable
        where Country = '${country}' and State_Region = '${state}'
        group by Purchase_Month
        order by count_Month desc)c cross join
        
        (select f.Female_count, M.Male_count
        from(select count(Customer_Gender) as Female_count from MasterTable 
                where Country = '${country}' and State_Region = '${state}'and Customer_Gender = 'F')f cross join
            (select count(Customer_Gender) as Male_count from MasterTable
                where Country = '${country}' and State_Region = '${state}' and Customer_Gender = 'M')M)d cross join
        
        (select ROUND(AVG(Customer_Age), 0) as avg_Customer_Age
        from MasterTable
        where Country = '${country}' and State_Region = '${state}')e cross join
        
        (select ROUND(MAX(Customer_Age), 0) as Max_Customer_Age
        from MasterTable
        where Country = '${country}' and State_Region = '${state}')f cross join
        
        (select ROUND(MIN(Customer_Age), 0) as Min_Customer_Age
        from MasterTable
        where Country = '${country}' and State_Region = '${state}')g`)
        return data
    }


    catch(error){
        console.log(error)
    }
}

module.exports = {
    getStates, getCountries, retrieveData
}