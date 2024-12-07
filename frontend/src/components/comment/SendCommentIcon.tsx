import { CiLocationArrow1 } from "react-icons/ci";

import { useState } from "react";

function SendIcon() {

    const [animate, setAnimate] = useState(false);


    return (
        <div className="flex flex-col justify-center">
            <CiLocationArrow1 className={`text-white w-6 h-6 text-3xlcursor-pointer ${animate ? "enlarge-shrink " : ""}`} />
        </div>
    )
}

export { SendIcon };