import { useEffect, useState } from "react";
import Media from "../types/Media";

function MediaTemp() {

  const [data, setData] = useState<Media[]>([]); 
  const url = 'https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/';

  const fetchMedia = async () => {
    try {
        const response = await fetch(url + 'media/');
        const json = await response.json();
        const medias: Media[] = [];
        json.forEach((media: any) => {
            const NewMedia: Media = {
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
}

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
  
          {data?.map(media => (
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
  
export default MediaTemp;