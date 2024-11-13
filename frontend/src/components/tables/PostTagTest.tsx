import { useEffect, useState } from "react";
import PostTagModel from "../../types/PostTag";

function PostTagTable() {
  const [data, setData] = useState<PostTagModel[]>([]);
//   const url = "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/";
const local = "http://localhost:5001/";

  const fetchPostTags = async () => {
    try {
      const response = await fetch(local + "post_tag/temp");
      const json = await response.json();
      const postTags: PostTagModel[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.forEach((tag: any) => {
        const PostTag: PostTagModel = {
          post_id: tag.postID,
          tag_id: tag.tagID,
        };
        postTags.push(PostTag);
      });
      setData(postTags);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting saves data");
    }
  };

  useEffect(() => {
    fetchPostTags();
  }, []);

  return (
    <>
      <hr></hr>
      <h2 className="table_title">Post Tag Table:</h2>
      <table>
        <tr>
          <th>id</th>
          <th>tag_id</th>
        </tr>

        {data?.map((tag) => (
          <tr>
            <td key={tag.post_id}>{tag.post_id}</td>
            <td key={tag.tag_id}>{tag.tag_id}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default PostTagTable;
