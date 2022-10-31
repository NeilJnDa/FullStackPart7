import blogService from "../services/blogs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, fetchBlogs } from "../reducers/blogReducer";
import { Link} from "react-router-dom";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: "solid",
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };
  if (!visible) {
    return (
      <div id={blog.title} className="blog">
        <Link to={`/blogs/${blog.id}`}  >{blog.title} by {blog.author}</Link>
        <button className="btn btn-info" onClick={() => setVisible(true)}>View</button>
      </div>
    );
  } else
    return (
      <div id={blog.title} className="blog">
        <div> 
          <Link to={`/blogs/${blog.id}`}  >{blog.title} by {blog.author}</Link>
          <button className="btn btn-info" onClick={() => setVisible(false)}>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          Likes <span id="LikesNumber">{blog.likes}</span>
          <button
            className="btn btn-secondary"
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
        className="btn btn-danger"
        onClick={() => {
          if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            dispatch(deleteBlog(blog))
            console.log("navigate")
          }
        }}
      >
        Remove
      </button>
    );
  else return null;
};
export default Blog;
