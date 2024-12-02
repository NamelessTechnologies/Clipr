import PostModel from "../types/Post";

function PostBox(props: { postData: PostModel }) {

    const postUser = props.postData.username;
    const postUserPFP = props.postData.user_pfp;
    const title = props.postData.title;
    const description = props.postData.content;
    const photo_data = props.postData.photo_data;

    return (
        <div className="flex-col w-1/3 h-3/5 mt-14 mx-auto bg-navbar border border-x-gray-300 p-4">
            {photo_data && (
                <img
                    src={`data:image/jpeg;base64,${photo_data}`} 
                    alt={ title }
                    className="my-4 h-auto mx-auto"
                />
            )} 

            <div className="flex">
                <img
                    src={ postUserPFP }
                    className="w-14 h-14 rounded-full mr-4">
                </img>
                <div className="w-full text-white text-2xl mt-3 mb-6">
                    { title }
                </div>
            </div>
            <div className="text-amber-500">{ postUser }</div>
            <div className="text-white text-center">{ description }</div>
        </div>
    )

}

export { PostBox };