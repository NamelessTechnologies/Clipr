import CommentTable from "../components/tables/CommentTable";
import CommentLikeTable from "../components/tables/CommentLikeTable";
import ConversationTable from "../components/tables/ConversationTable";
import LikeTable from "../components/tables/LikeTable";
import MediaTable from "../components/tables/Media";
import MessageTable from "../components/tables/MessageTable";
import PostTable from "../components/tables/PostTable";
import PostTagTable from "../components/tables/PostTagTest";
import SavedTable from "../components/tables/SavedTable";
import TagTable from "../components/tables/TagTable";
import UserTable from "../components/tables/UserTable";

function Tables() {
  return (
    <div className="flex">
      <div className="flex-1 p-5">
        {" "}
        {/* This div takes the remaining space */}
        <h1>The Nameless</h1>
        <UserTable />
        <ConversationTable />
        <MessageTable />
        <CommentTable />
        <PostTable />
        <SavedTable />
        <TagTable />
        <LikeTable />
        <PostTagTable />
        <CommentLikeTable />
        <MediaTable />
      </div>
    </div>
  );
}

export default Tables;
