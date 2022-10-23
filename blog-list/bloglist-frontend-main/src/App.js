import { useState } from "react";
import Login from "./components/Login";
import BlogList from "./components/BlogList";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);

  //JSX returned by react
  if (user === null)
    return (
      <div>
        <Login user={user} setUser={setUser} />
      </div>
    );
  else {
    return (
      <div>
        <BlogList user={user} setUser={setUser} />
      </div>
    );
  }
};

export default App;
