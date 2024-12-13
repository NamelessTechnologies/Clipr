import { useState } from "react";
import "../../styles/QuerriedProfile.css";

function QuerriedProfile(props: {
  user_id: string;
  username: string;
  nickname: string;
  pfp: string;
  onClick?: () => void;
}) {
  const [PFP, setPFP] = useState<string>(props.pfp);
  const failedPFP = () => {
    setPFP("https://i.ytimg.com/vi/0XM809ENceM/hqdefault.jpg");
  };
  return (
    <div
      onClick={props.onClick}
      className="flex justify-center  hover:cursor-pointer"
    >
      <div className="flex flex-row">
        <div className="pt-3">
          <div className="circle-small">
            <img
              onError={failedPFP}
              src={
                PFP ? PFP : "https://i.ytimg.com/vi/0XM809ENceM/hqdefault.jpg"
              }
            />
          </div>
        </div>
        <div className="flex flex-col pl-5 pt-5">
          <div className="text-yellow-100 italic text-xl pr-2">
            {props.username}
          </div>
          <div className="text-yellow-100 italic text-m pr-2">
            {props.nickname}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuerriedProfile;
