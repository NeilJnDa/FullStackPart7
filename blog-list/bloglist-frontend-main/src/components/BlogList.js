import { useRef} from "react";
import { useDispatch, useSelector  } from "react-redux";

import blogService from "../services/blogs";

import { setNotification } from "../reducers/notificationReducer";
import { fetchBlogs, createBlog, setBlogs } from "../reducers/blogReducer";
import { setUser } from "../reducers/userReducer";


import Notification from "./Notification";
import Blog from "./Blog";
import Toggle from "./Toggle";
import NewBlogForm from "./NewBlogForm";

const BlogList = () => {
  const createToggleRef = useRef();
  const blogs = useSelector(state => state.blog);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  //Logout
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(setNotification("Logged out", 3));

    blogService.setToken(null);
    window.localStorage.removeItem("loggedUserBlogList");
    dispatch(setUser(null));
    dispatch(setBlogs([]));
  };
  //New blog
  const createNewBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog));
      createToggleRef.current.toggleVisibility();
      dispatch(
        setNotification(
          `New blog created: ${newBlog.title} by ${newBlog.author}`,
          3
        )
      );
    } catch (exception) {
      dispatch(
        setNotification(`Create blog Error: ${exception.name}`, 3, true)
      );
      console.error(exception);
    }
  };
  function refreshBlogList() {
    dispatch(fetchBlogs());
  }
  //Blog page
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <Toggle buttonLabel="Create New" ref={createToggleRef}>
        <NewBlogForm createNewBlog={createNewBlog} />
      </Toggle>
      <h2>List</h2>
      <div>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              refreshBlogList={refreshBlogList}
              user={user}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
