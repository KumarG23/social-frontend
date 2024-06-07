import axios from "axios";

export const url = 'https://social-backend.fly.dev';

export const createUser = ({ username, password, firstName, lastName }) => {
    axios({
      method: "post",
      url: `${url}/create-user/`,
      data: {
        username,
        password,
        first_name: firstName,
        last_name: lastName,
      },
    })
      .then((response) => {
        console.log("create-user: ", response);
      })
      .catch((error) => console.log("Error: ", error));
  };

  export const getToken = async ({ username, password }) => {
    try {
      const response = await axios.post(`${url}/token/`, {
        username,
        password,
      });
      console.log("response: ", response);
      return response.data.access; // Return the access token
    } catch (error) {
      console.log("Error: ", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  export const fetchUser = async ({ auth }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${url}/profile`,
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log("Fetch Response: ", response);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error("Error fetching user: ", error);
      throw error; // Re-throw the error to be caught by the calling function
    }
  };

  export const createPost = async (formData, { auth }) => {
    try {
      const response = await axios({
          method: 'post',
          url: `${url}/posts/create/`,
          headers: {
              Authorization: `Bearer ${auth.accessToken}`,
          },
          data: formData,
      });
      console.log('create-post: ', response);
      return response.data;
    } catch (error) {
      console.error('error: ', error);
      throw error;
    }
};

    export const getPosts = async ({ auth }) => {
        try {
            const response = await axios ({
                url: `${url}/posts/`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            });
            console.log('getPosts: ', response);
            return response.data;
        }
        catch (error) {
            console.error('Error getting posts: ', error);
            throw error;
        }
    };

    export const getUserPosts = async ({ userId, auth }) => {
      try {
          const response = await axios ({
              url: `${url}/user/posts/`,
              method: 'get',
              headers: {
                  Authorization: `Bearer ${auth.accessToken}`,
              },
          });
          console.log('getUserPosts: ', response);
          return response.data;
      }
      catch (error) {
          console.error('Error getting posts: ', error);
          throw error;
      }
  };

  export const updatePost = async (postId, newData, {auth}) => {
    try {
      const response = await axios.put(`${url}/posts/${postId}/update/`,
        newData, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          }
        }
      )
      console.log('updated post: ', response);
      return response.data;

    } catch (error) {
      console.error('Error updating post: ', error);
      throw error;
    }
  }

export const deletePost = async (postId, {auth}) => {
  try {
    const response = await axios.delete(`${url}/posts/${postId}/delete/`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
    console.log('Post id: ', postId)
    console.log('Delete post: ', response);
  } catch (error) {
    console.error ('Error deleting post: ', error);
    throw error;
  }
}