import { useState } from 'react'
import hsr_logo from './assets/hsr_logo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={hsr_logo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>The Nameless</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Fetch Data
        </button>
      </div>
    </>
  )
}

export default App
