import { useState} from "react";
import { useDispatch} from "react-redux";

import blogService from "../services/blogs";
import userService from "../services/users";

import loginService from "../services/login";

import { setNotification } from "../reducers/notificationReducer";
import { fetchBlogs } from "../reducers/blogReducer";
import { setUser } from "../reducers/userReducer";


import Notification from "./Notification";

import {Form, Button, FormGroup, FormLabel } from "react-bootstrap"


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
      <Form onSubmit={handleLogin}>
        <FormGroup>
          <FormLabel>Username</FormLabel> 
          <Form.Control
            id="username"
            name="Username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </FormGroup>
        <FormGroup>
        <FormLabel>Password</FormLabel> 
          <Form.Control
            id="password"
            name="Password"
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </FormGroup>
        <Button variant="primary" id="login-submit" type="submit">
          login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
