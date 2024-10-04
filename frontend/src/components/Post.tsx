import React from 'react';
import { useEffect, useState } from "react";
import PostType from "../types/Post";

function Post() {

    const [post, setPost] = useState<PostType[]>([]);
    // const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const url = 'https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/';

    // const image = "https://admin.esports.gg/wp-content/uploads/2024/03/robin-honkai-star-rail.jpg-968x544.jpg";

    const fetchPosts = async () => {
        try {
            const response = await fetch(url + 'post/'); // must not be hard coded
            const json = await response.json();

            // const post: PostType = {
            //     post_id: json.postID,
            //     user_id: json.userID,
            //     title: json.title,
            //     description: json.description,
            //     datePosted: json.datePosted,
            //     mediaType: json.mediaType,
            // }

            const posts: PostType[] = [];
            json.forEach((post: any) => {
                const NewPost: PostType = {
                    post_id: post.postID,
                    user_id: post.userID,
                    title: post.title,
                    description: post.description,
                    datePosted: post.datePosted,
                    mediaType: post.mediaType,
                };        
                posts.push(NewPost);
            });
            setPost(posts); 
            setLoading(false);
        } catch (error) {
            console.error(error);
            throw new Error("Error getting post data");
        }
    
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
            <div className="post-container">
                {/* <div key={post ? post.post_id : "ERROR"} className=" p-4 text-white ">
                        <div className="text-2xl font-bold">{post ? post.title : "ERROR"}</div>
                        <div className="text-base">{post ? post.description : "ERROR"}</div>
                        <div className="text-xs">{post ? (typeof post.datePosted === 'string' ? post.datePosted : post.datePosted.toLocaleString()) : "ERROR"}</div>
                    </div> */}
                {post?.map(post => (
                    <div className=" p-4 text-white " key={post.post_id}>
                        <div className='text-sm'>User ID: {post.user_id}</div>
                        <div className="text-2xl font-bold">{post.title}</div>
                        <p className="text-base">{post.description}</p>
                        <div className="text-xs">{post.datePosted.toString()}</div>
                    </div>
                ))}
                
            </div>
        )
    }
export { Post }