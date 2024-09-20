import { useEffect, useState } from "react";
import Tag_Temp from "../types/Tag_Temp";

function TagTest() {

  const [data, setData] = useState<Tag_Temp[]>([]); 
  const url = 'http://localhost:5001/';

  const fetchTags = async () => {
    try {
        const response = await fetch(url + 'tag/temp');
        const json = await response.json();
        const tags: Tag_Temp[] = [];
        json.forEach((tag: any) => {
            const Save: Tag_Temp = {
                id: tag.id,
                name: tag.name
            };        
            tags.push(Save);
        });
      setData(tags); 
    } catch (error) {
        console.error(error);
        throw new Error("Error getting saves data");
    }
}

  useEffect(() => {
    fetchTags();
  }, []);

    return (
      <>
      <hr></hr>
      <h2 className="table_title">Tag Table:</h2>
        <table>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
  
          {data?.map(tag => (
            <tr>
              <td key={tag.id}>{tag.id}</td>
              <td key={tag.name}>{tag.name}</td>
            </tr>
          ))}
        </table>
      </>
    );
  }
  
export default TagTest;