import React, { useContext, useEffect, useState } from 'react';
import { createPost, fetchUser, getPosts } from './api';

const Profile = () => {

    const [posts, setPosts] = useState([])
    const [newPost, setNewPosts] = useState({
        content: '',
        image: ''
    });
    const [firstName, setFirstName] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (accessToken) {
            handleFetchUser();
            handleGetPosts();
        }
    }, [accessToken])
    

    const handleFetchUser = async () => {
        try {
          const userData = await fetchUser({ auth: { accessToken } });
          console.log("User Data: ", userData);
          setFirstName(userData.first_name);
        } catch (error) {
          console.error("Error getting user: ", error);
        }
      };

      const handleGetPosts = async () => {
        try {
            console.log('Auth: ', accessToken);
            const postData = await getPosts({ auth: { accessToken }});
            console.log('Post Data: ', postData)
            setPosts(postData);
        }
        catch (error) {
            console.error('Error getting posts: ', error);
        }
      };

      const handleCreatePost = async () => {
        try {
            console.log('Auth-create: ', accessToken);
            await createPost(newPost, { auth: { accessToken }});
            console.log('Create post Response: ', response);
            setNewPosts({ content: '', image: '' });
            await handleGetPosts();
        }
        catch (error) {
            console.error('Error creating post: ', error);
        }
      }

      const handlePostChange = (e) => {
        const { name, value } = e.target;
        setNewPosts(prevState => ({
            ...prevState,
            [name]: value
        }));
      };
   

  return (
    <div className='container'>
        <h1 className='header'>{firstName}'s Profile Page</h1>
        <div>
            <h2>Create a new Post</h2>
            <form onSubmit={handleCreatePost}>
                <div>
                    <label htmlFor='content'>Write something:</label>
                    <textarea id='content' name='content' value={newPost.content} onChange={handlePostChange} />
                </div>
                <div>
                    <label htmlFor='image'>Add an Image</label>
                    <input type='file' id='image' name='image' onChange={handlePostChange} />
                </div>
                <button type='submit'>Post</button>
            </form>
        </div>
    </div>
  )
}

export default Profile
