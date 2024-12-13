import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function PostModal(props: {
  post_id: number;
  post_url: string;
  media_type: string;
  onClose: () => void;
}) {
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
                className="relative p-4 w-full max-w-xl max-h-full bg-navbar rounded-lg shadow"
                onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
                >
                    {/* post modal header */}
                    <div className="bg-navbar">
                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                        <button
                            onClick={goToOGPost}
                            className="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg px-4 py-2"
                            >
                            See Original Post
                        </button>
                        <RxCross2 className={`absolute top-2 right-2 rounded-md w-7 h-7 text-white hover:cursor-pointer hover:text-zinc-400`}
                                            onClick={props.onClose}/>
                    </div>
                    </div>
                    {/* Post Content */}
                    {props.media_type == "image" ? (
                        <img 
                        src={props.post_url} 
                        alt="post of type photo" 
                        // className="mb-4 h-auto mx-auto rounded-xl object-contain"
                        className="mb-4 mx-auto min-w-[400px] min-h-[400px] rounded-xl max-w-full max-h-full object-contain"
                        />
                    ) : (
                        <video 
                        src={props.post_url} 
                        controls
                        autoPlay={true}
                        loop
                        className="mb-4 mx-auto rounded-xl min-w-[400px] min-h-[400px] rounded-xl max-w-full max-h-full object-contain"/>
                    )}

                </div>

            </div>
        </>
    )
}

export { PostModal };
