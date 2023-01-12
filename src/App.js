/**
 * App.js 
 * @author Jaron Cummings
 * App.js is the main view of the app. 
 */
import './App.css';
import React, { Suspense, useEffect, useState } from 'react';

function App() {

  let countries = []
  
  const [selected, setSelected] = React.useState("");
  
  // original state of the UI
  var originalState = [
    {
      "Sub_Category": "",
      "tQuanity": 0,
      "Purchase_Year": 0,
      "Count_Year": 0,
      "Purchase_Month": "",
      "count_Month": 0,
      "Female_count": 0,
      "Male_count": 0,
      "avg_Customer_Age": 0,
      "Max_Customer_Age": 0,
      "Min_Customer_Age": 0
    }
  ]

  const [currentCountry, setCurrentCountry] = React.useState(""); // changes state when user changes the country
  
  const [selectedState, setSelectedState] = React.useState("") // changes state when user changes state
  const[theCountries, setCountries] = useState([]) // changes the array of countries depending on the database
  const[theStates, setStates] = useState([]) // displays state of the set of states corresponding to a country
  const[theData, setTheData] = useState(originalState) // changes state of returned data analysis.


  // re-renders UI when countries are retrieved from database
  useEffect(() =>{
   
    async function getCountries(url){

      
     
      const newData = await fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Accept' : 'application/json'
        }
      })
      .then(res => res.json())
      

      setCountries(newData.map(function(obj){
        
        return obj.country;
      }))
    
    }


    getCountries('/fetchCountries')
  
    
    

    

  }, [setCountries])
  const [isLoading, setLoading] = useState(true);

  // changes selected country
  const changeSelectOptionHandlerCountry = (event) => {

    
    setSelected(event.target.value);
   
  }


  // changes selected state
  const changeSelectOptionHandlerState = (event) => {
    setSelectedState(event.target.value)
   
  }





  /**
   * Async function that retrives states based off existing selection of 
   * current country
   */
  async function getStates(){
   
    const newData = await fetch('/fetchstate', {
      method: 'POST',
      headers:{
        'content-type': 'application/json',
        'Accept' : 'application/json2/22/'
      
      },

      body: JSON.stringify({
        country: selected
      })
    })
    .then(res => res.json())
    

    setStates(newData.map(function(obj){
      return obj.STATE
    }))

    // options = theStates.map((el) => <option value = {el}>{el}</option>)
  }


 if(selected){
  getStates()
  if(selected != null){
    setCurrentCountry(selected)
    
  }
 
  setSelected(null)
 }

 
 


  

  

/**
 * Retrieves data based off country and state selected from server
 */
async function postData(){

  
    const newData = await fetch('/retrieveData', {
      method: 'POST',
      headers:{
        'content-type': 'application/json',
        'Accept' : 'application/json2/22/'
      
      },

      body: JSON.stringify({
        country: currentCountry,
        state: selectedState
      })
    })
    
    .then(res => res.json())
    setTheData(newData)
    
    
  }
  

  

  

 // render
  return (
    <div className="App">
      <form>
          <div>
        
            <select onChange={changeSelectOptionHandlerCountry}>
              <option value = "choose">
                -- Select Country --
              </option>
              {theCountries.map(region => (
                <option value = {region}>{region}</option>
              ))}
             
            </select>
          </div>
          <div>
          <select onChange={changeSelectOptionHandlerState}>
              <option value = "choose">
                -- Select State --
              </option>
              {theStates.map(region => (
                <option value = {region}>{region}</option>
              ))}
             
            </select>
          </div>
          <div>
            <button type = "button" onClick={() => postData()}>Retrieve Data</button>
          </div>
          <div>
            <p>
              <h3>The following data analysis is from a dataset of 30+K</h3>
              <h3>Orders made by customers in various parts of the world</h3>
              <h3>Selecing a country and state will perform some analysis on the data</h3>
              <h3>Of that region</h3>
            </p>
          </div>
          <div>
            <p>
              <h2>Most Popular Sub Category:   {theData[0].Sub_Category} </h2>
              <h2>Quanity of Sub Category:       {theData[0].tQuanity}</h2>
              <h2>Most popular Purchase Year:   {theData[0].Purchase_Year}</h2>
              <h2>Count of {theData[0].Purchase_Year}:  {theData[0].Count_Year}</h2>
              <h2>Most popular Purchase Month:  {theData[0].Purchase_Month}</h2>
              <h2>Count of {theData[0].Purchase_Month}:    {theData[0].count_Month}</h2>
              <h2>Number of Females:    {theData[0].Female_count}</h2>
              <h2>Number of Males:      {theData[0].Male_count}</h2>
              <h2>Average Customer Age: {theData[0].avg_Customer_Age}</h2>
              <h2>Max Customer Age:  {theData[0].Max_Customer_Age}</h2>
              <h2>Min Customer Age:  {theData[0].Min_Customer_Age}</h2>
            </p>
          </div>
        
      </form>
    </div>
  );
}

export default App;




























































// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
