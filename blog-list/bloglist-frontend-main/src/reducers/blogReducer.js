import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import userService from "../services/users"
const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
  },
});
export default blogSlice.reducer;
export const { setBlogs, appendBlog } = blogSlice.actions;
export const fetchBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};
export const createBlog = (newBlog) => async (dispatch) => {
  try {
    const createdBlog = await blogService.createNew(newBlog);
    dispatch(appendBlog(createdBlog));
    userService.addUserBlogs(createdBlog.id);
  } catch (error) {
    console.error(error);
  }
};
export const deleteBlog = (blog) => async (dispatch) =>{
  try {
    const response = await blogService.removeOne(blog);
    if(response.status !== 404)
    {
      const updatedUser = await userService.deleteUserBlogs(blog);
      console.log(updatedUser)
      
      dispatch(fetchBlogs())
    }
  } catch (error) {
    console.error(error);
  }
}
export const addComment = ({blog, comment}) => async (dispatch) =>{
  console.log(blog)
  try {
    await blogService.addComment({blog, comment})
    await dispatch(fetchBlogs())
  } catch (error) {
    console.error(error);
  }
}
