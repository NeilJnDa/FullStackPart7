import { useEffect} from "react";
import { useDispatch, useSelector  } from "react-redux";
import { Link } from "react-router-dom"; 

import Table from "react-bootstrap/Table";
// import blogService from "../services/blogs";

// import { setNotification } from "../reducers/notificationReducer";
// import { fetchBlogs, createBlog, setBlogs } from "../reducers/blogReducer";
// import { setUser } from "../reducers/userReducer";
import { fetchAllUsers } from "../reducers/allUserReducer";
const UserList = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    //Waiting for updating of token.
    setTimeout(() => {
      dispatch(fetchAllUsers())
    }, 1);
  },[dispatch])
  const allUsers = useSelector(state => state.allUser)
  if(allUsers.length === 0 )
    return(
      <div>
        <h1>Users</h1>
        <p>No Users</p>
      </div>
    )
  return(
    <div>   
      <h1>Users</h1>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
          {allUsers.map(user => userRow(user))}
        </tbody>
      </Table>
    </div>
  )
};
const userRow = (user)=>{
  return(
    <tr key={user.name}>
      <td><Link to={`/users/${user.id}`}>{user.name} </Link> </td>
      <td>{user.blogs.length}</td>
    </tr>
  ) 
}
export default UserList;
