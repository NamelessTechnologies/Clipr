import { useState, useEffect } from 'react'
import hsr_logo from './assets/hsr_logo.png'
import './App.css'

// import User from './types/User';
import TableViewUser from './TableViewUser';
import PostTest from './pages/PostTest';
import SaveTest from './pages/SaveTest';
import CommentTest from './pages/CommentTest';
import TableViewConversation from './TableViewConversation';
import TableViewMessage from './TableViewMessage';
import TagTest from './pages/TagTest';
import LikeTest from './pages/LikeTest';
import PostTagTest from './pages/PostTagTest'

function App() {
  // const [data, setData] = useState<User>();
  // const [url, setURL] = useState<string>("");
  // let url: string | undefined = "";


  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async (): Promise<string> => {
  //   try {
  //     const response = await fetch('http://localhost:5001/TestData/user');
  //     const json = await response.json() as User;
  //     console.log("setting URL to " + json.firstName);
  //     setURL(json.firstName);
  //     return json.firstName;
  //     // console.log(json.firstName);
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("This is a custom error message");
  //     }
    
  // }
  return (
    <>
      <div>
        <a href="https://hsr.hoyoverse.com/en-us/" target="_blank">
          <img src={hsr_logo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>The Nameless</h1>
      {/* <div className="card">
        <button onClick={fetchData}>
          Fetch Data
        </button>

        <ul>
          <li>First Name: {data ? data.firstName : ""}</li>
          <li>Last Name: {data ? data.lastName : ""}</li>
          <li>Faction: {data ? data.faction : ""}</li>
        </ul>

      </div> */}

      {/* {url} */}
      <TableViewUser></TableViewUser>
      <TableViewConversation></TableViewConversation>
      <TableViewMessage></TableViewMessage>
      <CommentTest></CommentTest>
      <PostTest></PostTest>
      <SaveTest></SaveTest>     
      <TagTest></TagTest> 
      <LikeTest></LikeTest>
      <PostTagTest></PostTagTest>
    </>
  )
}

export default App
