import { CommentLikeIcon } from "./CommentLikeIcon";
import CommentModel from "../../types/Comment";

function Comment(props: { commentData: CommentModel, isReply: boolean }) {

    const username = props.commentData.username;
    const user_pfp = props.commentData.pfp_url;
    const content = props.commentData.content;
    const liked = props.commentData.liked;
    const num_likes = props.commentData.num_likes;


    return (
        <div className={`flex w-full text-sm px-3 ${props.isReply ? 'pt-2 pb-1' : 'pt-3 pb-2'}`}>
            <img
                src={ user_pfp }
                className={`${props.isReply ? 'w-10 h-10' : 'w-12 h-12'} rounded-full mr-3`}>
            </img>

            <div className="flex flex-col w-9/12 mr-2">

                <span className={`${props.isReply ? 'text-replySize' : 'text-sm'} text-white cursor-pointer w-fit`}>{ username }</span>
                <span className={`${props.isReply ? 'text-replySize mt-1' : 'text-sm mt-2'} text-white`}>{ content }</span>
                <span className={`${props.isReply ? 'text-replySize' : 'text-sm'} text-gray-300 mt-1 cursor-pointer w-fit`}>Reply</span>
                
            </div>

            <CommentLikeIcon liked={liked} num_likes={num_likes}/>
        </div>
      );
}


export { Comment };
