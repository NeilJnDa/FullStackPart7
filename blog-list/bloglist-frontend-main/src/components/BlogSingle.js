import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, fetchBlogs } from "../reducers/blogReducer";
import { useParams } from "react-router-dom"
const Blog = () => {
  const blogs = useSelector(state=>state.blog)
  const user = useSelector(state=>state.user)
  const blog =blogs.find(b => b.id === useParams().id)
  console.log(blogs)
  console.log(useParams().id)
  const dispatch = useDispatch()
  if(!blog){
    return (<p>This blog page is missing</p>)
  }

    return (
      <div id={blog.title} className="blog">
        <h2>
          {blog.title}
        </h2>
        <a href={blog.url}>{blog.url}</a>
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
        <div>Added by {blog.author}</div>
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
