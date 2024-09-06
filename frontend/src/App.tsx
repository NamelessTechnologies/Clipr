import { useEffect, useState } from 'react'
import hsr_logo from './assets/hsr_logo.png'
import './App.css'

function App() {
  // const [data, setData] = useState([])
  const [data, setData] = useState({ firstName: String, lastName: String, faction: String});

  const fetchData = () => {
    fetch('http://localhost:5001/TestData/user')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error("skibidi: " + error);
      })
      console.log(data);
  }

  return (
    <>
      <div>
        <a href="https://hsr.hoyoverse.com/en-us/" target="_blank">
          <img src={hsr_logo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>The Nameless</h1>
      <div className="card">
        <button onClick={fetchData}>
          Fetch Data
        </button>

        <tbody>
        <tr>
          {/* <th>First Name</th>
          <th>Last Name</th>
          <th>Faction</th> */}
        </tr>
        <tr>
          <td>{data.firstName}</td>
          <td>{data.lastName}</td>
          <td>{data.faction}</td>
        </tr>
      </tbody>
      </div>
    </>
  )
}

export default App
