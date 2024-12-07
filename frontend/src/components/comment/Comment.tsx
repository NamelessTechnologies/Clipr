import { CommentLikeIcon } from "./CommentLikeIcon";
import CommentModel from "../../types/Comment";

function Comment(props: { commentData: CommentModel }) {

    const username = props.commentData.username;
    const user_pfp = props.commentData.pfp_url;
    const content = props.commentData.content;
    const liked = props.commentData.liked;
    const num_likes = props.commentData.num_likes;


    return (
        <div className="flex w-full text-sm pt-3 pb-2 px-3">
            <img
                src={ user_pfp }
                className="w-12 h-12 rounded-full mr-3">
            </img>

            <div className="flex flex-col w-9/12 mr-2">

                <span className="text-sm text-gray-300">{ username }</span>
                <span className="text-m text-white mt-2">{ content }</span>
                <span className="text-sm text-gray-300 mt-1 cursor-pointer">Reply</span>
                <span className="text-sm text-gray-200 mt-1.5 cursor-pointer">View Replies</span>
            </div>

            <CommentLikeIcon liked={liked} num_likes={num_likes}/>
        </div>
      );
}


export { Comment };
