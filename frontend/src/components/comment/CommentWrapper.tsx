import CommentModel from "../../types/Comment";
import { Comment } from "./Comment";
import { useState } from "react";

function CommentWrapper(props: { commentData: CommentModel, current_user_id: number}) {
    // console.log("from CommentWrapper: " + props.commentData.username);

    // console.log("CommentWrapper:");
    // console.log(props.commentData.comment_id);
    // console.log(props.current_user_id);

    // const [replies, setReplies] = useState<CommentModel[]>([]);

    // testing
    // const mockReply1: CommentModel = {comment_id: 2, parent_id: 2, post_id: 2, user_id: 2, username: "trailblazer", pfp_url: "https://i.pinimg.com/736x/f5/cb/d8/f5cbd8921d9b3b704e209c5807f17fdb.jpg", liked: false, num_likes: 3, content: "wuttt"}
    // const mockReply2: CommentModel = {comment_id: 2, parent_id: 2, post_id: 2, user_id: 2, username: "LilGui", pfp_url: "https://i.pinimg.com/originals/12/1f/2d/121f2d78f062c71a22781f2b756723a8.jpg", liked: false, num_likes: 2, content: "I LOVE YOU ROBIN"}
    const replies: CommentModel[] = [
        // mockReply1,
        // mockReply2

    ]

    // TODO: add GET request to get current comment's replies and populate replies useState with it
    // const getReplies = () => {

    // }

    const [displayReplies, setDisplayReplies] = useState(false);

    // const showReplies = () => {
    //     setDisplayReplies(!displayReplies);
    // }

    return (
        <div className="flex flex-col w-full mt-1">
            <Comment commentData={ props.commentData } isReply={false} current_user_id={props.current_user_id}/>
            {/* <span onClick={showReplies} className=" text-sm text-gray-300 ml-[4.5rem] cursor-pointer w-fit">{displayReplies ? "Hide replies" : "View replies"}</span> */}


            {displayReplies && (
                <div className="ml-16 mt-2 mr-2">
                {replies.map((reply, index) => (
                    <Comment key={index} commentData={reply} isReply={true}  current_user_id={props.current_user_id}/>
                ))}
            </div>
            )}

        </div>
      );
}


export { CommentWrapper };
