// import hsr_logo from '../assets/hsr_logo.png'
// import './App.css'

import TableViewUser from '../TableViewUser';
import PostTest from './PostTest';
import SaveTest from './SaveTest';
import CommentTest from './CommentTest';
import TableViewConversation from '../TableViewConversation';
import TableViewMessage from '../TableViewMessage';
import TagTest from './TagTest';
import LikeTest from './LikeTest';
import PostTagTest from './PostTagTest';
import CommentLikeTest from './CommentLikeTest';
import MediaTemp from './Media';

function Home() {

  return (
    <>
      <div>
        {/* <a href="https://hsr.hoyoverse.com/en-us/" target="_blank">
          <img src={hsr_logo} className="logo react" alt="React logo" />
        </a> */}
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
      <MediaTemp></MediaTemp>
    </>
  )
}

export default Home;
