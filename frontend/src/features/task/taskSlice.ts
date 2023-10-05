import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { toast } from "react-hot-toast";
import { closeAddTaskModal } from "../ui/uiSlice";
import {
  ITaskUpdateData,
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTodaysTasksService,
  updateTaskService,
} from "./taskService";
import {
  updateFolderAfterTaskDeleted,
  updateFolderTaskStatus,
  updateFolderWithTask,
} from "../folder/folderSlice";

export interface ITask {
  _id?: string | any;
  title: string;
  isCompleted?: boolean;
  dueDate: Date;
  folder: any;
}

interface ITaskState {
  isLoading: boolean;
  isDeleting: boolean;
  message: any;
  isError: boolean;
  tasks: ITask[];
  todaysTasks: ITask[];
}

const initialState: ITaskState = {
  isLoading: false,
  isDeleting: false,
  message: null,
  isError: false,
  tasks: [],
  todaysTasks: [],
};
export const getAllTasksAction = createAsyncThunk(
  "get/tasks",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state: RootState | any = getState();
      const token: string = state?.auth?.token;
      const { status, data } = await getAllTasksService(token);
      if (status === 200) {
        return data.tasks;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
export const getTodaysTasksAction = createAsyncThunk(
  "get/todaytasks",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state: RootState | any = getState();
      const token: string = state?.auth?.token;
      const { status, data } = await getTodaysTasksService(token);
      if (status === 200) {
        return data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
export const createTaskAction = createAsyncThunk(
  "create/task",
  async (payload: ITask, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(payload);
      const state: RootState | any = getState();
      const token: string = state?.auth?.token;
      const { status, data } = await createTaskService(token, payload);
      if (status === 201) {
        dispatch(updateFolderWithTask(data));
        dispatch(closeAddTaskModal());
        toast.success("Task added");
        return data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
export const updateTaskAction = createAsyncThunk(
  "update/task",
  async (payload: ITaskUpdateData, { rejectWithValue, getState, dispatch }) => {
    try {
      const state: RootState | any = getState();
      const token: string = state?.auth?.token;
      const { status, data } = await updateTaskService(token, payload);
      if (status === 201) {
        dispatch(updateFolderTaskStatus(data.modifiedFolder));
        // dispatch(closeAddTaskModal());
        return data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
export const deleteTaskAction = createAsyncThunk(
  "delete/task",
  async (payload: string, { rejectWithValue, getState, dispatch }) => {
    try {
      const state: RootState | any = getState();
      const token: string = state?.auth?.token;
      const { status, data } = await deleteTaskService(token, payload);

      if (status === 200) {
        dispatch(updateFolderAfterTaskDeleted(data));
        toast.error("Task deleted");
        return data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllTasksAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasksAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.tasks = action.payload;
      })
      .addCase(getAllTasksAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTaskAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTaskAction.fulfilled, (state, action) => {
        const newTask = action.payload.recentTask;
        state.isLoading = false;
        state.isError = false;
        state.todaysTasks.push(newTask);
      })
      .addCase(createTaskAction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getTodaysTasksAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodaysTasksAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.todaysTasks = action.payload;
      })
      .addCase(getTodaysTasksAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTaskAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskAction.fulfilled, (state, action) => {
        const updatedTask = action.payload?.updatedTask;
        const taskIndex = state.todaysTasks?.findIndex(
          (task) => task?._id === updatedTask._id,
        );
        const tIndex = state.tasks.findIndex(
          (task) => task._id === updatedTask._id,
        );
        state.isLoading = false;
        state.isError = false;
        state.todaysTasks[taskIndex] = updatedTask;
        state.tasks[tIndex] = updatedTask;
      })
      .addCase(updateTaskAction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteTaskAction.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteTaskAction.fulfilled, (state, action) => {
        const deletedTask = action.payload;
        state.isLoading = false;
        state.isDeleting = false;
        state.isError = false;
        state.todaysTasks = state.todaysTasks.filter(
          (task) => task._id !== deletedTask._id,
        );
        state.tasks = state.tasks.filter(
          (task) => task._id !== deletedTask._id,
        );
      })
      .addCase(deleteTaskAction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isDeleting = false;
        state.message = action.payload;
      });
    // .addCase(getSingleFolderAction.pending,(state) => {
    //   state.isLoading = true
    // })
    // .addCase(getSingleFolderAction.fulfilled, (state,action) => {
    //   state.isLoading = false;
    //   state.isError = false;
    //   state.currentFolder = action.payload
    // })
    // .addCase(getSingleFolderAction.rejected,(state,action) => {
    //   state.isError = true;
    //   state.isLoading = false;
    //   state.message = action.payload;
    // })
    // .addCase(updateFolderAction.pending,(state) => {
    //   state.isLoading = true
    // })
    // .addCase(updateFolderAction.fulfilled, (state,action) => {
    //   const updatedFolder = action.payload;

    //   const index = state.folders.findIndex((folder) => folder._id === updatedFolder._id)
    //   if(index !== -1) {
    //     state.folders[index] = updatedFolder
    //   }

    //   state.isLoading = false;
    //   state.isError = false;
    // })
    // .addCase(updateFolderAction.rejected,(state,action) => {
    //   state.isError = true;
    //   state.isLoading = false;
    //   state.message = action.payload;
    // })
  },
});
// export const {clearCurrentFolder} = taskSlice.actions
export default taskSlice.reducer;
