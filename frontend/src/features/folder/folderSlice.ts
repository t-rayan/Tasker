import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  createFolderService,
  deleteFolderService,
  getAllFoldersService,
  getSingleFolderService,
  markFolderAsCompleteService,
  searchFoldersAndTasksService,
  updateFolderService,
} from "./folderService";
import { RootState } from "../../app/store";
import { toast } from "react-hot-toast";
import { closeAddFolderModal, closeEditFolderModal } from "../ui/uiSlice";
import { ITask } from "../task/taskSlice";

export interface IFolder {
  _id: string;
  name: string;
  userId: string;
  tasks: ITask[];
  color: string;
  isComplete: boolean;
}

interface IFolderState {
  isLoading: boolean;
  loading: any;
  message: any;
  isError: boolean;
  folders: IFolder[];
  currentFolder: IFolder | any;
  searchResults: any;
}

const initialState: IFolderState = {
  isLoading: false,
  loading: {
    create: false,
    read: false,
    update: false,
    delete: false,
  },
  message: null,
  isError: false,
  folders: [],
  currentFolder: null,
  searchResults: null,
};

export const getFoldersAction = createAsyncThunk(
  "get/folders",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: RootState | any = getState();
      const token: string = state?.auth?.token;

      const { status, data } = await getAllFoldersService(token);

      if (status === 200) {
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

export const createFolderAction = createAsyncThunk(
  "create/folder",
  async (
    payload: { name: string; color: any },
    { rejectWithValue, getState, dispatch },
  ) => {
    try {
      console.log(payload);
      const state: RootState | any = getState();
      const token: string = state?.auth?.token;
      const { status, data } = await createFolderService(token, payload);
      if (status === 201) {
        toast.success("Folder added");

        dispatch(closeAddFolderModal());
        return data.newFolder;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteFolderAction = createAsyncThunk(
  "delete/folder",
  async (
    payload: { id: any; cb: () => void },
    { rejectWithValue, getState, dispatch },
  ) => {
    try {
      const state: RootState | any = getState();
      const token: string = state?.auth?.token;
      const { status, data } = await deleteFolderService(token, payload.id);
      if (status === 200) {
        dispatch(() => payload.cb());
        toast.success("Folder Deleted");
        return data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getSingleFolderAction = createAsyncThunk(
  "get/folder",
  async (payload: string | null, { rejectWithValue, getState }) => {
    try {
      const state: RootState | any = getState();
      const token: string = state?.auth?.token;
      const { status, data } = await getSingleFolderService(token, payload);
      if (status === 200) {
        return data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const updateFolderAction = createAsyncThunk(
  "update/folder",
  async (
    payload: { name: string; color: string; id: string; onClose: () => void },
    { rejectWithValue, getState, dispatch },
  ) => {
    try {
      const state: RootState | any = getState();
      const token: string = state?.auth?.token;
      const folderId: string = payload?.id;

      const { status, data } = await updateFolderService(token, folderId, {
        name: payload?.name,
        color: payload?.color,
      });
      if (status === 200) {
        toast.success("Folder updated");
        payload.onClose();
        return data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
export const markFolderAsCompleteAction = createAsyncThunk(
  "mark-complete/folder",
  async (payload: { id: any }, { rejectWithValue, getState }) => {
    try {
      const state: RootState | any = getState();
      const token: string = state?.auth?.token;
      const folderId: string = payload?.id;

      const { status, data } = await markFolderAsCompleteService(
        token,
        folderId,
      );
      console.log(data);
      if (status === 200) {
        toast.success("Completed");
        return data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const searchFoldersAndTasksAction = createAsyncThunk(
  "search/folders-tasks",
  async (payload: string, { rejectWithValue, getState }) => {
    try {
      const state: RootState | any = getState();
      const token: string = state?.auth?.token;
      const { status, data } = await searchFoldersAndTasksService(
        token,
        payload,
      );
      if (status === 200) {
        return data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setCurrentFolderId: (state, action) => {
      console.log(action.payload);
      state.currentFolder = action.payload;
    },
    clearCurrentFolder: (state) => {
      state.currentFolder = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = null;
    },
    updateFolderWithTask: (state, action) => {
      const { recentTask, currentFolder } = action.payload;
      if (state.currentFolder) {
        state.currentFolder.tasks.push(recentTask);
        const cFolder = state.currentFolder;
        const folderIndex = state.folders.findIndex(
          (folder) => folder._id === cFolder._id,
        );
        state.folders[folderIndex] = cFolder;
      }
      const folderIndex = state.folders.findIndex(
        (folder) => folder._id === currentFolder._id,
      );
      state.folders[folderIndex] = currentFolder;
    },
    updateFolderTaskStatus: (state, action) => {
      const updatedFolder = action.payload;
      // console.log(updatedTask);
      if (state.currentFolder) {
        const index = state.currentFolder.tasks.findIndex(
          (task: any) => task._id === updatedFolder._id,
        );
        // state.currentFolder.tasks[index] = updatedTask;
        state.currentFolder = updatedFolder;
      }
    },
    updateFolderAfterTaskDeleted: (state, action) => {
      const deletedTask = action.payload;

      console.log(deletedTask);

      // when task deleted
      // update in
      // folders
      if (state.currentFolder) {
        // updating state in current folders tasks array
        state.currentFolder.tasks = state.currentFolder.tasks?.filter(
          (task: any) => task._id !== deletedTask._id,
        );

        const folderIndex = state.folders.findIndex(
          (folder) => folder._id === state.currentFolder._id,
        );
        const cFolder = state.currentFolder;
        state.folders[folderIndex] = cFolder;
      }
      // find index of deleted task`s folder
      const fIndex = state.folders.findIndex(
        (folder) => folder._id === deletedTask.folder,
      );
      state.folders[fIndex].tasks = state.folders[fIndex].tasks?.filter(
        (task: any) => task._id !== deletedTask._id,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFoldersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFoldersAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.folders = action.payload;
      })
      .addCase(getFoldersAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createFolderAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFolderAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.folders.push(action.payload);
      })
      .addCase(createFolderAction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteFolderAction.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteFolderAction.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.isError = false;
        state.folders = state.folders.filter(
          (folder) => folder._id !== action.payload._id,
        );
      })
      .addCase(deleteFolderAction.rejected, (state, action) => {
        state.isError = true;
        state.loading.delete = false;
        state.message = action.payload;
      })
      .addCase(getSingleFolderAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleFolderAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.currentFolder = action.payload;
      })
      .addCase(getSingleFolderAction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateFolderAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFolderAction.fulfilled, (state, action) => {
        const updatedFolder = action.payload;

        const index = state.folders.findIndex(
          (folder) => folder._id === updatedFolder._id,
        );
        if (index !== -1) {
          state.folders[index] = updatedFolder;
        }

        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateFolderAction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(markFolderAsCompleteAction.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(markFolderAsCompleteAction.fulfilled, (state, action) => {
        const completedFolder = action.payload;

        const index = state.folders.findIndex(
          (folder) => folder._id === completedFolder._id,
        );
        if (index !== -1) {
          state.folders[index] = completedFolder;
        }

        state.loading.update = false;

        state.isError = false;
      })
      .addCase(markFolderAsCompleteAction.rejected, (state, action) => {
        state.isError = true;
        state.loading.update = false;

        state.message = action.payload;
      })
      .addCase(searchFoldersAndTasksAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchFoldersAndTasksAction.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.searchResults = data;
      })
      .addCase(searchFoldersAndTasksAction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});
export const {
  setCurrentFolderId,
  clearCurrentFolder,
  updateFolderWithTask,
  updateFolderTaskStatus,
  clearSearchResults,
  updateFolderAfterTaskDeleted,
} = folderSlice.actions;
export default folderSlice.reducer;
