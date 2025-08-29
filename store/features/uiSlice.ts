import { createSlice } from '@reduxjs/toolkit';
interface UIState {
  menuOpen: boolean;
  searchOpen: boolean;
  currentRoute: string;
  showHiddenFiles: boolean;
  history: string[];
  sourcePath: string[];
  destinationPath: string;
}

const initialState: UIState = {
  menuOpen: false,
  searchOpen: false,
  currentRoute: 'Home',
  showHiddenFiles: false,
  history: [],
  sourcePath: [],
  destinationPath: '',
};

const uiSlice = createSlice({
  name: 'UI',
  initialState: initialState,
  reducers: {
    setSearchOpen: (state, action) => {
      state.searchOpen = action.payload;
    },
    setMenuOpen: (state, action) => {
      state.menuOpen = action.payload;
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    setCurrentRoute: (state, action) => {
      state.currentRoute = action.payload;
    },
    setShowHiddenFiles: (state, action) => {
      state.showHiddenFiles = action.payload;
    },
    addHistory: (state, action) => {
      state.history.push(action.payload);
    },
    removeLastHistory: (state) => {
      state.history.pop();
    },
    clearHistory: (state) => {
      state.history = [];
    },
    setSourcePath: (state, action) => {
      state.sourcePath.push(action.payload);
    },
    removeSourcePath: (state, action) => {
      state.sourcePath = state.sourcePath.filter((path) => path !== action.payload);
    },
  },
});

export const {
  setSearchOpen,
  toggleSearch,
  setMenuOpen,
  toggleMenu,
  setCurrentRoute,
  setShowHiddenFiles,
  addHistory,
  removeLastHistory,
  clearHistory,
} = uiSlice.actions;
export default uiSlice.reducer;
