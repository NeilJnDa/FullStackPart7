import { useSelector  } from "react-redux";

import Login from "./components/Login";
import BlogList from "./components/BlogList";
import "./index.css";

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
        <BlogList/>
      </div>
    );
  }
};

export default App;
