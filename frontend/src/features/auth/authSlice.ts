import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
  getProfileService,
  loginService,
  registerService,
  requestPasswordResetService,
  updatePasswordService,
} from "./authServices";
import { toast } from "react-hot-toast";
import { clearCurrentUser, getProfileAction } from "../user/userSlice";

export interface AuthState {
  isLoading: boolean;
  token: any;
  message: any;
  isError: boolean;
  user: any;
}

const exitToken: any = localStorage.getItem("token");

const initialState: AuthState = {
  isLoading: false,
  token: exitToken,
  message: "",
  isError: false,
  user: null,
};

export const registerAction = createAsyncThunk(
  "auth/register",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await registerService({
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });
      const { data, status } = res;
      if (status === 201) {
        localStorage.setItem("token", data.token);
        toast.success("Registration successful");
        return data.newUser;
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

export const loginAction = createAsyncThunk(
  "auth/login",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      const res = await loginService({
        email: payload.email,
        password: payload.password,
      });
      const { data, status } = res;
      if (status === 200) {
        localStorage.setItem("token", data);
        toast.success("Login successful");
        dispatch(getProfileAction(data));
        return data;
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

export const requestPasswordResetAction = createAsyncThunk(
  "auth/reset-password",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      const res = await requestPasswordResetService({ email: payload?.email });
      const { data, status } = res;
      console.log(res);
      // if (status === 200) {
      //   localStorage.setItem("token", data);
      //   toast.success("Login successful");
      //   dispatch(getProfileAction(data));
      //   return data;
      // }
      // The value we return becomes the `fulfillenamed` action payload
    } catch (error: any) {
      if (error) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);
export const updatePasswordAction = createAsyncThunk(
  "auth/reset-password",
  async (
    payload: { token: any; password: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const res = await updatePasswordService(payload);

      // console.log(payload);
      // if (status === 200) {
      //   localStorage.setItem("token", data);
      //   toast.success("Login successful");
      //   dispatch(getProfileAction(data));
      //   return data;
      // }
      // The value we return becomes the `fulfillenamed` action payload
    } catch (error: any) {
      if (error) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      localStorage.removeItem("token");
      dispatch(clearCurrentUser());

      // The value we return becomes the `fulfillenamed` action payload
    } catch (error: any) {
      if (error) {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);

// export const getProfileAction = createAsyncThunk(
//   "auth/profile",
//   async (_, {rejectWithValue } ) => {
//     try {
//       const token:any = localStorage.getItem('token')
//       const res = await getProfileService(token);
//      const {status,data} = res;
//      if(status === 200) {
//       return data;
//      }
//     // The value we return becomes the `fulfillenamed` action payload
//     } catch (error:any) {
//       if(error) {
//         toast.error(error.response.data.message)
//       }
//       return rejectWithValue(error.response.data.message)
//     }

//   },
// )

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   state.value += 1
    // },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = "";
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.token = action.payload.token;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.isLoading = false;
        state.token = "";
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.token = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.token = "";
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.token = null;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.isLoading = false;
        state.token = "";
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(requestPasswordResetAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestPasswordResetAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(requestPasswordResetAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
