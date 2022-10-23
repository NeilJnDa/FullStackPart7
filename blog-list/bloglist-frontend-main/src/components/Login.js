import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";

import blogService from "../services/blogs";
import loginService from "../services/login";

import { setNotification } from "../reducers/notificationReducer";
import { fetchBlogs } from "../reducers/blogReducer";
import { setUser } from "../reducers/userReducer";


import Notification from "./Notification";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // Use local token to log in
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUserBlogList");
    if (loggedUserJson) {
      const newUser = JSON.parse(loggedUserJson);
      dispatch(setUser(newUser));
      blogService.setToken(newUser.token);
      dispatch(fetchBlogs());
    }
  }, []);
  //Login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      console.log("logged in with", username, password);
      dispatch(setNotification(`Logged in with ${username}`, 3));
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUserBlogList", JSON.stringify(user));
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      dispatch(fetchBlogs());
    } catch (exception) {
      dispatch(setNotification("Wrong username or password", 20, true));
      console.log(exception.name);
    }
  };
  return (
    //Log in page
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            id="username"
            name="Username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            id="password"
            name="Password"
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-submit" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
