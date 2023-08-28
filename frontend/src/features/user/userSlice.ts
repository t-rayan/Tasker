import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { getProfileService } from "./userService";
import { toast } from "react-hot-toast";

export interface UserState {
  isLoading: boolean;
  message: any;
  isError: boolean;
  currentUser: any;
}

const initialState: UserState = {
  isLoading: false,
  message: "",
  isError: false,
  currentUser: null,
};

export const getProfileAction = createAsyncThunk(
  "user/profile",
  async (payload: string, { rejectWithValue, getState }) => {
    try {
      // const state:RootState|any = getState();
      // const token:string = state?.auth?.token;

      if (payload) {
        const res = await getProfileService(payload);

        const { status, data } = res;
        if (status === 200) {
          return data;
        }
      }
      // The value we return becomes the `fulfillenamed` action payload
    } catch (error: any) {
      if (error) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProfileAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.currentUser = action.payload;
      })
      .addCase(getProfileAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentUser = null;
      });
  },
});

export const { clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;
