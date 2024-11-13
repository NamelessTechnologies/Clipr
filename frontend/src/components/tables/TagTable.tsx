import { useEffect, useState } from "react";
import TagModel from "../../types/Tag";

function TagTable() {
  const [data, setData] = useState<TagModel[]>([]);
//   const url = "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/";
const local = "http://localhost:5001/";

  const fetchTags = async () => {
    try {
      const response = await fetch(local + "tag/temp");
      const json = await response.json();
      const tags: TagModel[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.forEach((tag: any) => {
        const Save: TagModel = {
          id: tag.id,
          name: tag.name,
        };
        tags.push(Save);
      });
      setData(tags);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting saves data");
    }
  };

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

        {data?.map((tag) => (
          <tr>
            <td key={tag.id}>{tag.id}</td>
            <td key={tag.name}>{tag.name}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default TagTable;
