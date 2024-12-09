import CommentModel from "../types/Comment";
import { SendIcon } from "./comment/SendCommentIcon";
import "../styles/Scrollbar.css";
import { CommentWrapper } from "./comment/CommentWrapper";

function CommentBox() {

    const mockComment1: CommentModel = {user_id: 1, username: "Robin's Lapdog", pfp_url: "https://i.pinimg.com/736x/9a/8b/fc/9a8bfcc4eb554336950585d10c120403.jpg", liked: false, num_likes: 34, content: "penis in my butt"}
    const mockComment2: CommentModel = {user_id: 2, username: "March 8th", pfp_url: "https://i.pinimg.com/originals/0a/c8/eb/0ac8eba1285276250042186395f05935.jpg", liked: true, num_likes: 70, content: "Yippee I love HSR. Where my memories at tho. Ching chong"}
    const mockComment3: CommentModel = {user_id: 3, username: "Blade's Burner Account", pfp_url: "https://i.pinimg.com/736x/4d/d6/ab/4dd6ab4b787b4998b91ffc70a2fc40ff.jpg", liked: false, num_likes: 1, content: "I want to die"}

    const mock_comments: CommentModel[] = [
        mockComment1,
        mockComment2,
        mockComment3,
        // mockComment1,
        // mockComment2,
        // mockComment1,
        // mockComment2,
    ]


    return (
        <div className="flex flex-col w-96 h-5/6 bg-neutral-900 rounded-xl">
            <div className="flex items-center pl-4 w-full h-16 bg-navbar rounded-t-xl border-b">
                <span className="text-xl text-white">69 Comments</span>
            </div>

            <div className="flex flex-col items-center w-full overflow-auto" style={{ height: '70vh', maxHeight: '70vh' }}>
                {mock_comments.map((comment, index) => (
                    <CommentWrapper key={index} commentData={comment} />
                ))}
            </div>

            <div className="flex items-center pl-4 pr-6 py-10 mt-auto w-full h-16 rounded-b-xl border-t">
                <img
                    src="https://i.pinimg.com/originals/6f/bd/2e/6fbd2e62dddb28723603aace97f9ac67.jpg"
                    className="w-12 h-12 rounded-full mr-3">
                </img>
                <input type="text" className="bg-transparent outline-none border-b text-white px-1 my-auto w-full" placeholder="Leave a comment"></input>
                <SendIcon/>
            </div>
        </div>
      );
}


export { CommentBox };