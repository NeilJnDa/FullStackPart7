import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
const blogSlice = createSlice({
  name: "blog",
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
  } catch (error) {
    console.error(error);
  }
};
