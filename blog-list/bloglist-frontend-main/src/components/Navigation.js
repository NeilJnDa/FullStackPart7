
import { useDispatch, useSelector} from "react-redux";
import { setUser } from "../reducers/userReducer";
import { setBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs"
import {
    Link
  } from "react-router-dom"

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";


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
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">   
            <Link style={padding} to="/">Blogs</Link>
          </Nav.Link>    
          <Nav.Link href="#" as="span">  
            <Link style={padding} to="/users">Users</Link>
          </Nav.Link>    
          <Nav.Link href="#" as="span">   
            <em> {user.name} Logged in </em>
            <Button variant="primary" onClick={handleLogout}>Logout</Button> 
          </Nav.Link>    
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    </div>
    )
}
export default Navigation