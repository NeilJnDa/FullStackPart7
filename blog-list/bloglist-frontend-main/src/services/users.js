import axios from "axios";
const baseUrl = "/api/users";

let token = null;
const setToken = (newToken) => {
  if (newToken === "") {
    axios.defaults.headers.common["Authorization"] = "";
  } else {
    token = `bearer ${newToken}`;
    axios.defaults.headers.common["Authorization"] = token;
  }
  //console.log(`NewToken ${token}`)
};

const getAllUsers = () => {
  //console.log(token)
  const request = axios.get(baseUrl)
  return request.then((response) => response.data);
};

const addUserBlogs = (blogId)=> {
  const request = axios.put(baseUrl, {blogId})

  //return updated user
  return request.then((response) => response.data);
};
const deleteUserBlogs = (blogId) =>{
  const request = axios.delete(baseUrl, {blogId})
  //return updated user
  return request.then((response) => response.data);
};
export default {getAllUsers, addUserBlogs, deleteUserBlogs, setToken};
