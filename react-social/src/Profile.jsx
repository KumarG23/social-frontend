import React, { useEffect, useState } from 'react';
import { createPost, fetchUser, getUserPosts, updatePost, deletePost } from './api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        content: '',
        image: null
    });
    const [editingPost, setEditingPost] = useState(null)
    const [firstName, setFirstName] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const [avatar, setAvatar] = useState('')
    console.log('avatar: ', avatar)

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
          setAvatar(userData.avatar)
          console.log('user avatar: ', userData.avatar)
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
            toast.success('New Post Successful!')
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
            const formData = new FormData();
            formData.append('content', newPost.content);
            if (newPost.image instanceof File) {
                formData.append('image', newPost.image);
            }

            await updatePost(postId, formData, { auth: { accessToken }});
            await handleGetPosts();
            setNewPost({ content: '', image: null });
            toast.success('Post Updated Successfully!')
            setEditingPost(null);
        }
        catch (error) {
            console.error('error updating post: ', error);
        }
    };

    const handleEditPost = (post) => {
        setNewPost({ content: post.content, image: null });
        setEditingPost(post.id);
    }

    const handleDeletePost = async (postId) => {
        console.log('Post Id front: ', postId)
        try {
            await deletePost(postId, { auth: { accessToken }});
            await handleGetPosts();
            setNewPost({ content: '', image: null });
            toast.success('Post Deleted Successfully!')
        }
        catch (error) {
            console.error('Error deleting book front: ', error);
        }
    };


    return (
        <div className='container'>
            <h1 className='header'>{firstName}'s Profile Page</h1>
            <img src={`http://localhost:8000/${avatar}`} style={{ width: '20%'}} alt='avatar' />
            <div className='form-group'>
                <h2>{editingPost ? 'Edit Post' : 'Create a new Post'}</h2>
                <form onSubmit={editingPost ? (e) => handleUpdatePost(e, editingPost) : handleCreatePost}>
                    <div className='stuff'>
                        <label htmlFor='content' className='label'>Write something:</label>
                        <textarea id='content' name='content' value={newPost.content} onChange={handlePostChange} />
                    </div>
                    <div>
                        <label htmlFor='image'>Add an Image</label>
                        <input type='file' id='image' name='image' onChange={handlePostChange} className='input-field' />
                    </div>
                    <button className='button-group' type='submit'>{editingPost ? 'Update' : 'Post'}</button>
                </form>
            </div>
            <div>
                <h2>Your Posts</h2>
                <ul className='books-list'>
                {posts.map((post) => (
                    <li key={post.id} className='book-item'>
                        <div className='book-details'>
                        <p>{post.content}</p>
                        {post.image && <img src={`http://127.0.0.1:8000/${post.image}`} 
                        style={{ width: '20%'}}
                        alt="Post" />}
                        </div>
                        <div className='book-actions'>
                        <button onClick={() => handleEditPost(post)}>Edit</button>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}

export default Profile;

