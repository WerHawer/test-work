import axios from "axios";

// https://cors-anywhere.herokuapp.com/
// https://thingproxy.freeboard.io/fetch/

axios.defaults.baseURL = "https://api.github.com";

export const fetchUsers = async (page, perPage) => {
  try {
    const response = await axios.get(`/users`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserByLogin = async (login) => {
  try {
    const response = await axios.get(`/users/${login}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchByUrl = async (url) => {
  try {
    return axios.get(url);
  } catch (error) {
    console.log(error);
  }
};
