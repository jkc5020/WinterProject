
import './App.css';
import React from 'react';
// import { application } from 'express';
function App() {

  const getData = async (url) =>{
    const newData = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept' : 'application/json'
      }
    })
    .then(res => res.json())
    console.log(newData)
  } 
  
  getData('./api')
  return (
    <div className="App">
      
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
