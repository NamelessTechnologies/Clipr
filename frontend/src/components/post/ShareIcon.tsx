import { CiLocationArrow1 } from "react-icons/ci";
import { RiShareForwardLine } from "react-icons/ri";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaRegPaperPlane } from "react-icons/fa6";


function ShareIcon() {

    return (
        <div className="flex flex-col justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-like_button_bg mb-auto cursor-pointer">
                <FaRegPaperPlane className="text-white font-bold text-2xl" />
            </div>
            <span className="text-white text-center">Share</span>
        </div>

    )
}

export { ShareIcon };