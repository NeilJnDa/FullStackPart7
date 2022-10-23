import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import allUserReducer from "./reducers/allUserReducer";



const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer,
    allUser : allUserReducer
  },
});
export default store;
