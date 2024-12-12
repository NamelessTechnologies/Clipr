import MessageModel from "../../types/Message";
import ProfilePost from "../profile/ProfilePost";

interface ExtendedMessageModel extends MessageModel {
  hasMedia?: boolean;
  mediaType: string;
}
const EmbeddedPost = (props: {
  msg: ExtendedMessageModel;
  sender: boolean;
}) => {
  return (
    <div>
      {props.sender ? (
        <div className="flex py-4 justify-end">
          <ProfilePost
            post_url={props.msg.content}
            media_type={props.msg.mediaType}
          ></ProfilePost>
          <img
            src={props.msg.user_pfp}
            className="w-8 h-8 rounded-full ml-3"
          ></img>
        </div>
      ) : (
        <div className="flex py-4 ">
          <img
            src={props.msg.user_pfp}
            className="w-8 h-8 rounded-full mr-3"
          ></img>
          <ProfilePost
            post_url={props.msg.content}
            media_type={props.msg.mediaType}
          ></ProfilePost>
        </div>
      )}
    </div>
  );
};

export { EmbeddedPost };
