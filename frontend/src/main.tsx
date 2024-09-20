import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import PostTest from './pages/PostTest.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <PostTest></PostTest> */}
  </StrictMode>,
)
