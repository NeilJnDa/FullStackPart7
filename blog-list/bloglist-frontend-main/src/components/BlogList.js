import { useRef} from "react";
import { useDispatch, useSelector  } from "react-redux";


import { setNotification } from "../reducers/notificationReducer";
import { fetchBlogs, createBlog } from "../reducers/blogReducer";


import Notification from "./Notification";
import Blog from "./Blog";
import Toggle from "./Toggle";
import NewBlogForm from "./NewBlogForm";

const BlogList = () => {
  const createToggleRef = useRef();
  const blogs = useSelector(state => state.blog);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
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
