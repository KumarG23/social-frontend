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

    const timeDifference = (createdAt) => {
        const currentTime = new Date();
        const postTime = new Date(createdAt);
        const difference = currentTime - postTime;
        const minutes = Math.floor(difference / (1000 * 60));
        if (minutes < 60) {
            return `Posted ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else {
            const hours = Math.floor(minutes / 60);
            if (hours < 24) {
                return `Posted ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
            } else {
                const days = Math.floor(hours / 24);
                return `Posted ${days} ${days === 1 ? 'day' : 'days'} ago`;
            }
        }
    };
    

   
    return (
        <div className='posts-container'>
            <h1>Posts</h1>
            <ul className='post-list'>
                {posts.map((post, index) => (
                    <li key={index} className='book-item'>
                        <div className='book-details'>
                            <p>{post.profile.user.username}</p>
                            {post.profile.avatar && (
                                <img className='pic'
                                src={`http://localhost:8000${post.profile.avatar}`}
                                alt='user avatar'
                                style={{ width: '5%' }}
                                />
                            )}
                        <p>{post.content}</p>
                        {post.image && <img src={`http://127.0.0.1:8000/${post.image}`} 
                        style={{ width: '20%'}}
                        alt="Post" />}
                        <p>{timeDifference(post.created_at)}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;



