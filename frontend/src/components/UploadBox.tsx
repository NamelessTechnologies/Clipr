import React, { useEffect, useState } from 'react';
// import User from '../types/User';

interface PostContent {
  content: string;
}

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [post, setPost] = useState<PostContent>({ content: '' });
    const [currentUser,setCurrentUser] = useState(localStorage.getItem("user") || '');
    var userInfo = JSON.parse(currentUser);
    useEffect(() => {
      const handleStorageChange = (event: any) => {
        if (event.key == 'storage') {
          setCurrentUser(localStorage.getItem('user') || '');
          userInfo = JSON.parse(currentUser);
        }
      }
      window.addEventListener('storage',handleStorageChange);

      return () => {
        window.removeEventListener('storage',handleStorageChange);
      }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPost({ ...post, content: e.target.value });
    };

    const createPost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        var uid =userInfo["user_id"];
        console.log("Using id "+uid);
        const newPost = { UserID: uid, Title: title, Content: post.content }

        try {
            const response = await fetch("https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/post/", {
              body: JSON.stringify(newPost),
              method: "POST",
              headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            });
            console.log(response);
            if (response.status === 200){
              alert('Success!')
            }
            else{
              alert(`${response.status}: ${response.statusText}`);
            }
          } 
          catch (error) {
            alert(error);
            console.error(error);
          }
        
        console.log("Post submitted: ", post);
        setTitle('')
        setPost({ content: '' });
    };

  return (
    <div className='flex-col w-1/3 h-3/5 mt-14 px-10 bg-navbar border border-x-gray-300'>
        <div className='w-full text-white text-center text-3xl mt-6 mb-6'>Create New Post</div>
        <form onSubmit={createPost} className=" rounded items-center">
            <div>
                <label className="block text-white text-lg font-semibold mb-2">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder='Title'
                className="w-full py-2 px-3 text-white bg-navbar border border-white focus:outline-none focus:border-amber-500"/>
                <span className="text-white text-sm float-right">
                    {title.length} / 100
                </span>

                <label className="block text-white text-lg font-semibold mt-6 mb-2">Content:</label>
                <textarea id="content" value={post.content} onChange={handleInputChange} rows={6}
                className='w-full h-2/3 py-2 px-3 text-white bg-navbar border border-white focus:outline-none focus:border-amber-500'
                placeholder="Share your thoughts!"
                />
              <span className="text-white text-sm float-right">
                {post.content.length} / 500
              </span>
            </div>
            <button type="submit" className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 mt-3 rounded'>Post</button>
        </form>
        <h1 className='text-white'>UID: {userInfo["user_id"]}</h1>
    </div>
  );
};

export default CreatePost;
