import { useState } from "react";
import "../../styles/QuerriedProfile.css";

function ProfilePreview(props: {
  user_id: string;
  nickname: string;
  pfp: string;
  lastMessage: string;
  date?: Date;
  selected?: boolean;
  onClick?: () => void;
}) {
  const [PFP, setPFP] = useState<string>(props.pfp);
  const failedPFP = () => {
    setPFP("https://i.ytimg.com/vi/0XM809ENceM/hqdefault.jpg");
  };
  return (
    <div onClick={props.onClick} className="hover:bg-neutral-700">
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
        <div className="flex flex-col pl-5 pt-6">
          <div className="text-yellow-100 italic text-m pr-2">
            {props.nickname}
          </div>
          <div className="text-neutral-400  text-sm pr-2">
            {props.lastMessage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePreview;
