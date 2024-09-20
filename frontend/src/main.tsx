import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import PostWithCommentsTest from './pages/PostWithCommentsTest.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <PostWithCommentsTest></PostWithCommentsTest> */}
  </StrictMode>,
)
