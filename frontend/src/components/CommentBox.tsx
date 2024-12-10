import CommentModel from "../types/Comment";
import { SendIcon } from "./comment/SendCommentIcon";
import "../styles/Scrollbar.css";
import { CommentWrapper } from "./comment/CommentWrapper";
import { useEffect, useState } from "react";
import { local_uri, uri } from "../App";

function CommentBox(props: {
  post_id: number;
  user_id: number;
  username: string;
  user_pfp: string;
}) {
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState<CommentModel[]>([]);

  // const mockComment1: CommentModel = {comment_id: 1, parent_id: 1, post_id:1, user_id: 1, username: "Robin's Lapdog", pfp_url: "https://i.pinimg.com/736x/9a/8b/fc/9a8bfcc4eb554336950585d10c120403.jpg", liked: false, num_likes: 34, content: "penis in my butt"}
  // const mockComment2: CommentModel = {comment_id: 1, parent_id: 1, post_id:1, user_id: 2, username: "March 8th", pfp_url: "https://i.pinimg.com/originals/0a/c8/eb/0ac8eba1285276250042186395f05935.jpg", liked: true, num_likes: 70, content: "Yippee I love HSR. Where my memories at tho. WHO AM I??"}
  // const mockComment3: CommentModel = {comment_id: 1, parent_id: 1, post_id:1, user_id: 3, username: "Blade's Burner Account", pfp_url: "https://i.pinimg.com/736x/4d/d6/ab/4dd6ab4b787b4998b91ffc70a2fc40ff.jpg", liked: false, num_likes: 1, content: "I want to die"}
  // const [mock_comments, setMockComments] = useState<CommentModel[]>([mockComment1, mockComment2, mockComment3]);

  // FOR TESTING
  // const user_id = 1
  // const username = "chillwafflez"
  // const pfp_url = "https://i.pinimg.com/originals/6f/bd/2e/6fbd2e62dddb28723603aace97f9ac67.jpg"

  useEffect(() => {
    setComments([]);
    fetchComments();
  }, [props]);

    const fetchComments = async() => {
        // console.log("fetching posts : " + uri + "comment/post/" + props.post_id + '/' + props.user_id);
        const response = await fetch(local_uri + "comment/post/" + props.post_id + '/' + props.user_id);
        const json = await response.json();

        const comments: CommentModel[] = [];
        json.forEach((comment: any) => {
            const PostComment: CommentModel = {
                comment_id: comment.commentID,
                parent_id: comment.parentID,
                post_id: comment.postID,
                user_id: comment.userID,
                username: comment.username,
                content: comment.content,
                pfp_url: comment.pfp,
                num_likes: comment.likeCount,
                liked: comment.liked
            };
            console.log(PostComment.username);
            comments.push(PostComment);
        });
        setComments(comments);
    }

  // ADD BACKEND LOGIC TO POST NEW COMMENT TO DATABASE
  const postComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // comment cant be empty or only whitespaces
    if (userComment.length == 0 || userComment.trim() == "") {
      return;
    }

    try {
      // const newComment: CommentModel = {user_id: user_id, username: username, pfp_url: pfp_url, liked: false, num_likes: 0, content: userComment};
      const newComment = new FormData();
      newComment.append("post_id", props.post_id.toString());
      newComment.append("user_id", props.user_id.toString());
      newComment.append("content", userComment);

      const response = await fetch(uri + "comment/", {
        body: newComment,
        method: "POST",
      });

      if (response.status == 200) {
        console.log("Successfully posted comment yippee");
      } else {
        console.log("Error posting comment");
      }

      const json = await response.json();
      const comment_id = json.comment_id;
      const newlyPostedComment: CommentModel = {
        comment_id: comment_id,
        parent_id: null,
        post_id: props.post_id,
        user_id: props.user_id,
        username: props.username,
        pfp_url: props.user_pfp,
        liked: false,
        num_likes: 0,
        content: userComment,
      };

      setComments((prevComments) => [...prevComments, newlyPostedComment]);
      setUserComment("");
    } catch (exception) {
      console.log("Error posting comment");
      console.log(exception);
    }
  };

    return (
        <div className="flex flex-col w-96 h-5/6 bg-neutral-900 rounded-xl">
            {/* comment section header */}
            <div className="flex items-center pl-4 w-full h-16 bg-navbar rounded-t-xl border-b">
                <span className="text-xl text-white">{comments.length} Comments</span>
            </div>

            {/* all comments */}
            <div className="flex flex-col items-center w-full overflow-auto" style={{ height: '70vh', maxHeight: '70vh' }}>
                {comments.map((comment, index) => (
                    <CommentWrapper key={index} commentData={comment} current_user_id={props.user_id} />
                ))}
            </div>

      {/* textbox to post comment */}
      <div className="flex items-center pl-4 pr-6 py-10 mt-auto w-full h-16 rounded-b-xl border-t">
        <img
          src={props.user_pfp}
          className="w-12 h-12 shrink-0 rounded-full mr-3"
        ></img>

        {/* <input type="text" className="bg-transparent outline-none border-b text-white px-1 my-auto w-full" placeholder="Leave a comment"></input>
                <SendIcon/> */}
        <form onSubmit={postComment} className="flex w-full">
          <input
            type="text"
            className="text-white w-full mr-2 bg-transparent outline-none border-b py-1"
            placeholder="Leave a comment"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          ></input>

          <button type="submit" className="">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

export { CommentBox };
