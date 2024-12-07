import PostModel from "../types/Post";
import { LikeIcon } from "./post/LikeIcon";
import { BookmarkIcon } from "./post/BookmarkIcon";
import { ShareIcon } from "./post/ShareIcon";
import lappland from "../assets/lappland.png";

function Post(props: { postData: PostModel }) {

    const postUser = props.postData.username;
    const postUserPFP = props.postData.user_pfp;
    const title = props.postData.title;
    const description = props.postData.content;
    const photo_data = props.postData.photo_data;
    
    const liked = props.postData.liked ?? false;
    const num_likes = props.postData.num_likes ?? 0;
    const bookmarked = props.postData.bookmarked ?? false;
    const num_bookmarks = props.postData.num_bookmarks ?? 0;

    return (
        // <div className="flex-col w-1/2 h-3/5 mt-8 mx-auto bg-navbar p-4 border border-x-rose-600">
        <div className="flex-col w-1/2 h-3/5 bg-navbar mr-7 pb-4 rounded-xl">
            {photo_data && (
                <img src={lappland}
                    className="mb-4 h-auto mx-auto rounded-xl">
                </img>
                // <img
                //     src={`data:image/jpeg;base64,${photo_data}`} 
                //     alt={ title }
                //     className="my-4 h-auto mx-auto"
                // />
            )} 

            <div className="flex">
                {/* pfp + title */}
                <div className="flex">
                    <img
                        src={ postUserPFP }
                        className="w-14 h-14 rounded-full mr-4">
                    </img>
                    <div className="w-full text-white text-2xl mt-3 ">
                        { title }
                    </div>
                </div>

                {/* like, bookmark, share box */}
                <div className="flex ml-auto space-x-5 mr-8">
                    <LikeIcon liked={liked} num_likes={num_likes}/>
                    <BookmarkIcon bookmarked={bookmarked} num_bookmarks={num_bookmarks}/>
                    <ShareIcon/>
                </div>
            </div>

            
            <div className="text-amber-500">{ postUser }</div>

            
            <div className="text-white text-center">{ description }</div>
        </div>
    )

}

export { Post };