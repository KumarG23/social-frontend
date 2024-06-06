import React, { useContext, useEffect, useState } from 'react';
import { createPost, fetchUser, getUserPosts, updatePost, deletePost } from './api';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        content: '',
        image: null
    });
    const [editingPost, setEditingPost] = useState(null)
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
            const postData = await getUserPosts({ auth: { accessToken }});
            console.log('Post Data: ', postData)
            setPosts(postData);
        }
        catch (error) {
            console.error('Error getting posts: ', error);
        }
    };

    const handleCreatePost = async (event) => {
        event.preventDefault();
        try {
            console.log('Auth-create: ', accessToken);
            const formData = new FormData();
            formData.append('content', newPost.content);
            if (newPost.image) {
                formData.append('image', newPost.image);
            }

            const response = await createPost(formData, { auth: { accessToken }});
            console.log('Create post: ', response);
            setNewPost({ content: '', image: null });
            await handleGetPosts();
        }
        catch (error) {
            console.error('Error creating post: ', error);
        }
    }

    const handlePostChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files.length > 0) {
            setNewPost(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        } else {
            setNewPost(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        
    };

    const handleUpdatePost = async (event, postId) => {
        event.preventDefault();
        try {
            await updatePost(postId, newPost, { auth: { accessToken }});
            await handleGetPosts();
            setNewPost({ content: '', image: null });
            setEditingPost(null);
        }
        catch (error) {
            console.error('error updating post: ', error);
        }
    };

    const handleEditPost = (post) => {
        setNewPost({ content: post.content, image: post.image });
        setEditingPost(post.id);
    }

    const handleDeletePost = async (postId) => {
        console.log('Post Id front: ', postId)
        try {
            await deletePost(postId, { auth: { accessToken }});
            await handleGetPosts();
            setNewPost({ content: '', image: null });
        }
        catch (error) {
            console.error('Error deleting book front: ', error);
        }
    };


    return (
        <div className='container'>
            <h1 className='header'>{firstName}'s Profile Page</h1>
            <div className='form-group'>
                <h2>{editingPost ? 'Edit Post' : 'Create a new Post'}</h2>
                <form onSubmit={editingPost ? (e) => handleUpdatePost(e, editingPost) : handleCreatePost}>
                    <div>
                        <label htmlFor='content'>Write something:</label>
                        <textarea id='content' name='content' value={newPost.content} onChange={handlePostChange} />
                    </div>
                    <div>
                        <label htmlFor='image'>Add an Image</label>
                        <input type='file' id='image' name='image' onChange={handlePostChange} />
                    </div>
                    <button type='submit'>{editingPost ? 'Update' : 'Post'}</button>
                </form>
            </div>
            <div>
                <h2>Posts</h2>
                {posts.map((post) => (
                    <div key={post.id}>
                        <p>{post.content}</p>
                        {post.image && <img src={`http://127.0.0.1:8000/${post.image}`} 
                        style={{ width: '20%'}}
                        alt="Post" />}
                        <button onClick={() => handleEditPost(post)}>Edit</button>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;

