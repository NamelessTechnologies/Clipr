import "../../styles/QuerriedProfile.css";

function QuerriedProfile(props: {
  user_id: string;
  username: string;
  nickname: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={props.onClick}
      className="flex justify-center w-screen h-scree hover:cursor-pointer"
    >
      <div className="flex flex-row">
        <div className="pt-3">
          <div className="circle-small">
            <img
              src="https://ih1.redbubble.net/image.5503365970.2431/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg"
              alt="you are my sunshine"
            ></img>
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
