import { useEffect, useState } from "react";
import MediaModel from "../../types/Media";
import { uri } from "../../App";

function MediaTable() {
  const [data, setData] = useState<MediaModel[]>([]);

  const fetchMedia = async () => {
    try {
      const response = await fetch(uri + "media/");
      const json = await response.json();
      const medias: MediaModel[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.forEach((media: any) => {
        const NewMedia: MediaModel = {
          media_id: media.mediaID,
          post_id: media.postID,
          url: media.url,
        };
        medias.push(NewMedia);
      });
      setData(medias);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting post data");
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <>
      <hr></hr>
      <h2 className="table_title">Media Table:</h2>
      <table>
        <tr>
          <th>media_id</th>
          <th>post_id</th>
          <th>URL</th>
        </tr>

        {data?.map((media) => (
          <tr>
            <td key={media.media_id}>{media.media_id}</td>
            <td key={media.media_id}>{media.post_id}</td>
            <td key={media.media_id}>{media.url}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default MediaTable;
