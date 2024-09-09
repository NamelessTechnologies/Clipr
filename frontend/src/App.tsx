import { useState } from 'react'
import hsr_logo from './assets/hsr_logo.png'
import './App.css'

import User from './types/User';

function App() {
  const [data, setData] = useState<User>();

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/TestData/user');
      const json = await response.json() as User;
      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
      }
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

        <ul>
          <li>First Name: {data ? data.firstName : ""}</li>
          <li>Last Name: {data ? data.lastName : ""}</li>
          <li>Faction: {data ? data.faction : ""}</li>
        </ul>

      </div>
    </>
  )
}

export default App
