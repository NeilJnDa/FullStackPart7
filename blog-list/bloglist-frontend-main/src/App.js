import { useSelector, useDispatch  } from "react-redux";
import { useEffect } from "react";
import Login from "./components/Login";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import Navigation from "./components/Navigation";
import UserSingle from "./components/UserSingle"


import blogService from "./services/blogs";
import userService from "./services/users";

import { setUser } from "./reducers/userReducer";
import { fetchBlogs } from "./reducers/blogReducer";
import "./index.css";

import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"

const App = () => {
  const user = useSelector(state=>state.user);
  const dispatch = useDispatch()
  // Use local token to log in
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUserBlogList");
    if (loggedUserJson) {
      const newUser = JSON.parse(loggedUserJson);
      //Set Token. There is better way for this
      blogService.setToken(newUser.token);
      userService.setToken(newUser.token);
      console.log("Set Token To", newUser.token)

      dispatch(setUser(newUser));
      dispatch(fetchBlogs());
    }
  }, []);

  //JSX returned by react
  if (user === null)
    return (
      <div>
        <Login/>
      </div>
    );
  else {
    return (
      <div>
        <Router>
          <Navigation/>
          <Routes>
            <Route path="/" element={<BlogList/>} />
            <Route path="/users" element={<UserList/>} />
            <Route path="/users/:id" element={<UserSingle/>} />

          </Routes>
        </Router>
      </div>
    );
  }
};

export default App;
