import React, { useContext, useEffect, useState } from 'react';
import { url, getPosts } from './api';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (accessToken) {
            handleGetPosts();
        }
    }, [accessToken])

    const handleGetPosts = async () => {
        try {
            console.log('Auth: ', accessToken);
            const postData = await getPosts({ auth: { accessToken }});
            console.log('Post User Data: ', postData)
            setPosts(postData);
        }
        catch (error) {
            console.error('Error getting posts: ', error);
        }
    };

   
    return (
        <div>
            <h1>Posts</h1>
            <div>
                {posts.map((post, index) => (
                    <div key={index}>
                        <p>{post.content}</p>
                        {post.image && <img src={`http://127.0.0.1:8000/${post.image}`} 
                        style={{ width: '20%'}}
                        alt="Post" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;



