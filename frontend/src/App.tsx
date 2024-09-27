import hsr_logo from './assets/hsr_logo.png'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { NavBar } from './components/Navbar';
import CreateAccount from './pages/CreateAccount';
import Home from './pages/Home.tsx';
// import TableViewUser from './TableViewUser';
// import PostTest from './pages/PostTest';
// import SaveTest from './pages/SaveTest';
// import CommentTest from './pages/CommentTest';
// import TableViewConversation from './TableViewConversation';
// import TableViewMessage from './TableViewMessage';
// import TagTest from './pages/TagTest';
// import LikeTest from './pages/LikeTest';
// import PostTagTest from './pages/PostTagTest';
// import CommentLikeTest from './pages/CommentLikeTest';
// import MediaTemp from './pages/Media';

function App() {

  return (
    <>

  <Router>
        <NavBar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Sign Up" element={<CreateAccount/>} />
        </Routes>
    </Router>

      {/* <div>
        <a href="https://hsr.hoyoverse.com/en-us/" target="_blank">
          <img src={hsr_logo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>The Nameless</h1>

      <TableViewUser></TableViewUser>
      <TableViewConversation></TableViewConversation>
      <TableViewMessage></TableViewMessage>
      <CommentTest></CommentTest>
      <PostTest></PostTest>
      <SaveTest></SaveTest>     
      <TagTest></TagTest> 
      <LikeTest></LikeTest>
      <PostTagTest></PostTagTest>
      <CommentLikeTest></CommentLikeTest>
      <MediaTemp></MediaTemp> */}
    </>
  )
}

export default App
