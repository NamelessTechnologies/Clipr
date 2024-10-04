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

function TablesTEMP() {
  return (
    <div className="flex">
      <div className="flex-1 p-5"> {/* This div takes the remaining space */}
        <h1>The Nameless</h1>
        <TableViewUser />
        <TableViewConversation />
        <TableViewMessage />
        <CommentTest />
        <PostTest />
        <SaveTest />
        <TagTest />
        <LikeTest />
        <PostTagTest />
        <CommentLikeTest />
        <MediaTemp />
      </div>
    </div>
  );
}

export default TablesTEMP;
