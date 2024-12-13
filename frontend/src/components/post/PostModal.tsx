import { useNavigate } from "react-router-dom";

function PostModal(props: {post_id: number, post_url: string, media_type: string, onClose: ()=>void}) {

    const navigate = useNavigate();

    const goToOGPost = () => {
        navigate(`/IsolatedPost/?id=${props.post_id}`);
      };

    return(
        <>
            <div
            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
            onClick={props.onClose}
            >
                <div
                className="relative p-4 w-full max-w-2xl max-h-full bg-navbar rounded-lg shadow "
                onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
                >
                    {/* post modal header */}
                    <div className="bg-navbar">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <button
                            onClick={goToOGPost}
                            className="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg px-4 py-2"
                            >
                            See Original Post
                        </button>
                        <button
                        onClick={props.onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    </div>
                    {/* Post Content */}
                    {props.media_type == "image" ? (
                        <img 
                        src={props.post_url} 
                        alt="post of type photo" 
                        />
                    ) : (
                        <video 
                        src={props.post_url} 
                        controls
                        autoPlay={true}
                        loop
                        className="mb-4 h-auto mx-auto rounded-xl"/>
                    )}

                </div>

            </div>
        </>
    )
}

export { PostModal }