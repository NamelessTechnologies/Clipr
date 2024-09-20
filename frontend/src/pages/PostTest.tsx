import { fetchPosts } from "../api";

function PostTest() {

    return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold">Display Post Data</h1>
        <p>testing</p>

        <button onClick={fetchPosts}>
          Fetch Data
        </button>

      </div>
    );
  }
  
export default PostTest;