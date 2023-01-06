
import './App.css';
import React, { Suspense, useEffect, useState } from 'react';
// import { application } from 'express';
function App() {

  let countries = []
  let states = []
  const [selected, setSelected] = React.useState("");
  const test = ["1", "2", "3"]



  const[theCountries, setCountries] = useState([])



  useEffect(() =>{
    console.log("in the useEffect")
    async function getCountries(url){

      console.log("in the async function")
     
      const newData = await fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Accept' : 'application/json'
        }
      })
      .then(res => res.json())
      

      setCountries(newData.map(function(obj){
        console.log(obj.country)
        return obj.country;
      }))
      console.log(theCountries)
    }


    getCountries('/fetchCountries')
    console.log(theCountries)
    
    

    

  }, [setCountries])
  const [isLoading, setLoading] = useState(true);
  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  }


 
  function processCountries(newData){
    for(var i = 0; i < newData.length; i ++){
      countries.push(newData[i].country)
     
    }
    //console.log(countries)
  

  }
  

  async function getStates(url){

  }


  const postData = async(country) =>{
    const newData = await fetch('/fetchStates', {
      method: 'POST',
      headers:{
        'content-type': 'application/json',
        'Accept' : 'application/json2/22/'
      
      },

      body: JSON.stringify({
        country: country
      })
    })
    .then(res => res.json())
    //console.log(newData);
  }
  

  function demo(){
    return <option>Hello</option>
  }
  function getCountry(){
    console.log(countries)
    return countries.map((country) =>{
      
      return <option>{country}</option>;
    })
  }

  
  
  

 
  
  
 
  return (
    <div className="App">
      <form>
          <div>
        
            <select onChange={changeSelectOptionHandler}>
              <option value = "choose" disabled selected = "selected">
                -- Select Country --
              </option>
              {theCountries.map(region => (
                <option value = "choose">{region}</option>
              ))}
             
            </select>
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
