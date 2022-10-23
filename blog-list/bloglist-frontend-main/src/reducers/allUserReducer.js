import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users"
const allUserSlice = createSlice({
  name: "allUser",
  initialState: [],
  reducers: {
    setAllUser(state, action) {
      return action.payload;
    },
  },
});

export default allUserSlice.reducer;
//export const { setAllUser} = allUserSlice.actions;
export const fetchAllUsers = () => async (dispatch) => {
  const users = await userService.getAllUsers();
  dispatch(allUserSlice.actions.setAllUser(users));
};
