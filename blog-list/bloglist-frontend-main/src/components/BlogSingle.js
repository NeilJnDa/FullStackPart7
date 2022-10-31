/* eslint-disable no-unused-vars */
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, fetchBlogs } from "../reducers/blogReducer";
import { useParams, useNavigate} from "react-router-dom"
import NewCommentForm from "./NewCommentForm";

const BlogSingle = () => {
  const blogs = useSelector(state=>state.blog)
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const blogId = useParams().id
  const blog = blogs.find(b => b.id === blogId)

  if(!blog){
    return (<p>This blog page is missing</p>)
  }
  else{
    return (
      <div id={blog.title} className="blog">
        <h2>
          {blog.title}
        </h2>
        <a href={blog.url}>{blog.url}</a>
        <div>
          Likes <span id="LikesNumber">{blog.likes}</span>{" "}
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
        <div>Added by {blog.author}</div>
        <RemoveButton
          blog={blog}
          user={user}
        />
        <h3>Comments</h3>
        <NewCommentForm blog={blog}/>
        <ul>
          {blog.comments.map(c=><li key={c}>{c}</li>)}
        </ul>
      </div>
    );
  }
};
const RemoveButton = ({ blog, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if (user.username && blog.user.username && user.username === blog.user.username)
    return (
      <button
        className="btn btn-danger"
        onClick={() => {
          if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            dispatch(deleteBlog(blog))
            navigate("/")
          }
        }}
      >
        Remove
      </button>
    );
  else return null;
};

export default BlogSingle;
