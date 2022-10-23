
import { useDispatch, useSelector} from "react-redux";
import { setUser } from "../reducers/userReducer";
import { setBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs"
import {
    Link
  } from "react-router-dom"
const Navigation = ()=>{
    const padding = {
        padding: 5
      }
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user)
    //Logout
    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(setNotification("Logged out", 3));
        blogService.setToken(null);
        window.localStorage.removeItem("loggedUserBlogList");
        dispatch(setUser(null));
        dispatch(setBlogs([]));
    };
    return(
    <div>
        <Link style={padding} to="/">Blogs</Link>
        <Link style={padding} to="/users">Users</Link>
    <em> {user.name} Logged in </em>
    <button onClick={handleLogout}>Logout</button> 
    </div>
    )
}
export default Navigation