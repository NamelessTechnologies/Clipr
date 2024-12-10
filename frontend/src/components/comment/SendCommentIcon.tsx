import { CiLocationArrow1 } from "react-icons/ci";
import "../../styles/PostIcons.css";
import { useState } from "react";

function SendIcon() {
  const [animate] = useState(false);

  return (
    <div className="flex flex-col justify-center">
      <CiLocationArrow1
        className={`text-white w-7 h-7 text-3xl cursor-pointer ${animate ? "enlarge-shrink " : ""}`}
      />
    </div>
  );
}

export { SendIcon };
