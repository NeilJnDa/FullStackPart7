import {
  // ...
  useParams
} from "react-router-dom"
// import { useEffect} from "react";
// import { useDispatch, useSelector  } from "react-redux";
// import { Link, Route } from "react-router-dom"

// import blogService from "../services/blogs";

// import { setNotification } from "../reducers/notificationReducer";
// import { fetchBlogs, createBlog, setBlogs } from "../reducers/blogReducer";
// import { setUser } from "../reducers/userReducer";
// import { fetchAllUsers } from "../reducers/allUserReducer";

// import Notification from "./Notification";
// import Blog from "./Blog";
// import Toggle from "./Toggle";
// import NewBlogForm from "./NewBlogForm";

const UserSingle = ({allUsers}) => {
  const id = useParams().id
  console.log(id)
  console.log(allUsers)

    return(
      <div>
        <h2>Users</h2>
        <p>No Users</p>
      </div>
    )
};

export default UserSingle;
