import { createSlice } from '@reduxjs/toolkit';

interface DataState {
  search: string;
}

const initialState: DataState = {
  search: '',
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = dataSlice.actions;
export default dataSlice.reducer;
