import blogService from "../services/blogs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, fetchBlogs } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  if (!visible) {
    return (
      <div style={blogStyle} id={blog.title} className="blog">
        {blog.title} {blog.author}{" "}
        <button onClick={() => setVisible(true)}>View</button>
      </div>
    );
  } else
    return (
      <div style={blogStyle} id={blog.title} className="blog">
        <div>
          {blog.title} <button onClick={() => setVisible(false)}>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          Likes <span id="LikesNumber">{blog.likes}</span>{" "}
          <button
            onClick={() => {
              blogService.addLikes(blog)
              dispatch(fetchBlogs())
            }}
          >
            Like
          </button>
        </div>
        <div>{blog.author}</div>
        <RemoveButton
          blog={blog}
          user={user}
        />
      </div>
    );
};
const RemoveButton = ({ blog, user }) => {
  const dispatch = useDispatch()
  if (user && blog.user.username && user.username === blog.user.username)
    return (
      <button
        onClick={() => {
          if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            dispatch(deleteBlog(blog))
          }
        }}
      >
        Remove
      </button>
    );
  else return null;
};
export default Blog;
