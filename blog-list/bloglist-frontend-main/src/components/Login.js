import { useState} from "react";
import { useDispatch} from "react-redux";

import blogService from "../services/blogs";
import userService from "../services/users";

import loginService from "../services/login";

import { setNotification } from "../reducers/notificationReducer";
import { fetchBlogs } from "../reducers/blogReducer";
import { setUser } from "../reducers/userReducer";


import Notification from "./Notification";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  //Login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      console.log("logged in with", username, password);
      dispatch(setNotification(`Logged in with ${username}`, 3));

      //Set Token. There is better way for this
      blogService.setToken(user.token);
      userService.setToken(user.token);

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
