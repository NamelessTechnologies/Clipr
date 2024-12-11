import { useState } from "react";

function ShareFriendProfile(props: {
  pfp: string;
  user_id: string;
  nickname: string;
}) {
  const [PFP, setPFP] = useState<string>(props.pfp);
  const failedPFP = () => {
    setPFP("https://i.ytimg.com/vi/0XM809ENceM/hqdefault.jpg");
  };
  return (
    <div className="flex justify-center w-screen h-scree hover:cursor-pointer">
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
          <div className="text-yellow-100 italic text-m pr-2">
            {props.nickname}
          </div>
        </div>
      </div>
    </div>
  );
}
export { ShareFriendProfile };
