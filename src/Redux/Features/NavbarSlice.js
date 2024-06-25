import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggleSidebar: false,
}

export const fcmTokenUpdate = createAsyncThunk(
    "/fcm_token",
    async (name, thunkAPI) => {
      console.log(name, "thunkdata");
  
      try {
        const resp = ["fewrfegf","rgergrg"]
        console.log(resp);
        return resp;
      } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
    }
  );

const NavbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        openSidebar: (state) => {
            state.toggleSidebar = !state.toggleSidebar;
        }
    }
})

export default NavbarSlice.reducer;
export const { openSidebar } = NavbarSlice.actions;