import { useState } from "react";
import "../../styles/ProfilePreview.css";

function ShareFriendProfile(props: {
  user_id: string;
  nickname: string;
  pfp: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  const [PFP, setPFP] = useState<string>(props.pfp);

  const failedPFP = () => {
    setPFP("https://i.ytimg.com/vi/0XM809ENceM/hqdefault.jpg");
  };

  return (
    <>
      {props.selected ? (
        <div
          onClick={props.onClick}
          className="hover:bg-neutral-700 w-[15vh] cursor-pointer"
        >
          <div className="flex flex-col">
            <div className="ml-5">
              <div className="circle-small">
                <img
                  onError={failedPFP}
                  src={
                    PFP
                      ? PFP
                      : "https://i.ytimg.com/vi/0XM809ENceM/hqdefault.jpg"
                  }
                />
              </div>
            </div>

            <div className="flex flex-row pl-2 ">
              <div className="text-yellow-100 italic text-m pl-8">
                {props.nickname}
              </div>
              <div className="flex text-amber-400 pl-2">&#10003;</div>
            </div>
          </div>
        </div>
      ) : (
        <div onClick={props.onClick} className="hover:bg-neutral-700 w-[15vh]">
          <div className="flex flex-col">
            <div className="ml-5">
              <div className="circle-small">
                <img
                  onError={failedPFP}
                  src={
                    PFP
                      ? PFP
                      : "https://i.ytimg.com/vi/0XM809ENceM/hqdefault.jpg"
                  }
                />
              </div>
            </div>
            <div className="flex flex-col pl-2 ">
              <div className="text-yellow-100 italic text-m pl-8">
                {props.nickname}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { ShareFriendProfile };
