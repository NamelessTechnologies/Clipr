import PostModel from "../types/Post";
import { LikeIcon } from "./post/LikeIcon";
import { BookmarkIcon } from "./post/BookmarkIcon";
import { ShareIcon } from "./post/ShareIcon";
// import lappland from "../assets/lappland.png";
import { useState } from "react";
// import feixiao from "../assets/feixiao_pull.png";
// import narrow_pic from "../assets/narrow_pic_test.png";
// import father from "../assets/father.jpg"

function Post(props: { postData: PostModel }) {
    console.log(props.postData.post_id + "post.tsx");

    const [showMore, setShowMore] = useState(false);

    const postUser = props.postData.username;
    const postUserPFP = props.postData.user_pfp;
    const title = props.postData.title;
    const description = props.postData.content ?? "";
    const photo_data = props.postData.photo_data;

    const publish_date = props.postData.datePosted?.toLocaleDateString("en-us", { year: 'numeric',month: 'long', day: 'numeric' })

    
    const liked = props.postData.liked ?? false;
    const num_likes = props.postData.num_likes ?? 0;
    const bookmarked = props.postData.bookmarked ?? false;
    const num_bookmarks = props.postData.num_bookmarks ?? 0;

    return (
        <div className="flex-col w-1/2 h-3/5 mr-7 pb-4 rounded-xl">
            {photo_data && (
                <div className="w-auto bg-neutral-900 rounded-xl">
                    <img src={photo_data}
                        className="mb-4 h-auto mx-auto rounded-xl"
                        style={{minHeight: '60vh',  maxHeight: '60vh', }}>
                    </img>
                </div>
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
                        className="w-14 h-14 rounded-full mr-4 shrink-0">
                    </img>
                    <div className="w-full text-white text-2xl mt-3 ">
                        { title }
                    </div>
                </div>

                {/* like, bookmark, share box */}
                <div className="flex ml-auto space-x-5 mr-2">
                    <LikeIcon liked={liked} num_likes={num_likes}/>
                    <BookmarkIcon bookmarked={bookmarked} num_bookmarks={num_bookmarks}/>
                    <ShareIcon/>
                </div>
            </div>

            <div className="text-amber-500">{ postUser }</div>   

            {/* post description */}
            <div className="flex flex-col text-white mt-1 bg-neutral-900 rounded-xl p-2">
                <span className="text-white text-sm font-bold">{ publish_date }</span>

                { (showMore == false) ? description.substring(0, 130) : description}

                { description.length > 120 && (
                    <button onClick={() => setShowMore(!showMore)} className="text-sm text-neutral-300 mt-1 mr-auto">
                        {showMore ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>
        </div>
    )
}

export { Post };