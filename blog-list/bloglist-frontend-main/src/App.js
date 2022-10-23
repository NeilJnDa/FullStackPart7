import { useSelector  } from "react-redux";

import Login from "./components/Login";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import Navigation from "./components/Navigation";


import "./index.css";

import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"

const App = () => {
  const user = useSelector(state=>state.user);


  //JSX returned by react
  if (user === null)
    return (
      <div>
        <Login/>
      </div>
    );
  else {
    return (
      <div>
        <Router>
          <Navigation/>
          <Routes>
            <Route path="/" element={<BlogList/>} />
            <Route path="/users" element={<UserList/>} />
          </Routes>
        </Router>
      </div>
    );
  }
};

export default App;
