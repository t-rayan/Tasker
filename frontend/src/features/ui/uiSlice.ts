import { createSlice } from "@reduxjs/toolkit";


interface IUiState {
  isAddFolderModal: boolean;
  isEditFolderModal:boolean;
  isPopMenu: boolean;
  isAddTaskModal:boolean;
}

const initialState:IUiState = {
  isAddFolderModal: false,
  isEditFolderModal: false,
  isPopMenu: false,
  isAddTaskModal: false
}

export const uiSlice = createSlice({
  name:"ui",
  initialState,
  reducers:{
    openAddFolderModal:(state) => {
      state.isAddFolderModal = true;
    },
    closeAddFolderModal:(state) => {
      state.isAddFolderModal = false;
    },

    openEditFolderModal:(state) => {
      state.isEditFolderModal = true;
    },
    closeEditFolderModal:(state) => {
      state.isEditFolderModal = false;
    },
    openPopMenu:(state) => {
      state.isPopMenu = true;
    },
    closePopMenu:(state) => {
      state.isPopMenu = false;
    },  
    togglePopMenu:(state) => {
      state.isPopMenu = !state.isPopMenu;
    },

    openAddTaskModal:(state) => {
      state.isAddTaskModal = true;
    },
    closeAddTaskModal:(state) => {
      state.isAddTaskModal = false;
    },



  }
})
export const {
  openAddFolderModal,
  closeAddFolderModal,
  openEditFolderModal,
  closeEditFolderModal,
  openPopMenu,
  closePopMenu,
  togglePopMenu,
  openAddTaskModal,
  closeAddTaskModal
} = uiSlice.actions;
export default uiSlice.reducer;