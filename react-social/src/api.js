import axios from "axios";

const url = 'http://127.0.0.1:8000';

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

  export const createPost = async ({ content, image }, { auth }) => {
    return axios({
        method: 'post',
        url: `${url}/posts/create/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
        data: {
            content,
            image
        },
    })
        .then((response) => {
            console.log('create-post: ', response);
            return response.data;
        })
        .catch((error) => {
            console.error('error: ', error);
            throw error;
        });
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