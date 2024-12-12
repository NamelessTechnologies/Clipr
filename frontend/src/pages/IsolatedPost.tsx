import { useSearchParams } from "react-router-dom";
import { IsolatedPostComponent } from "../components/IsolatedPostComponent";

function IsolatedPost() {
  const [searchParams] = useSearchParams();
  const postID = searchParams.get("id") as string;

  return (
    <div className="flex justify-center w-screen h-screen">
      <IsolatedPostComponent post_id={postID}></IsolatedPostComponent>
    </div>
  );
}
export default IsolatedPost;
