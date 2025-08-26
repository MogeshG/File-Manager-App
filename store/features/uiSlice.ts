import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  menuOpen: boolean;
  searchOpen: boolean;
  currentRoute: string;
}

const initialState: UIState = {
  menuOpen: false,
  searchOpen: false,
  currentRoute: 'Home',
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
  },
});

export const { setSearchOpen, toggleSearch, setMenuOpen, toggleMenu, setCurrentRoute } =
  uiSlice.actions;
export default uiSlice.reducer;
