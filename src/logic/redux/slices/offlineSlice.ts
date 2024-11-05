import { createSlice } from "@reduxjs/toolkit"

const localStorageOffline = localStorage.getItem('offline') ? JSON.parse(localStorage.getItem('offline') as string) : false;

const initialState = {
  offline: localStorageOffline
};

const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    setOffline: (state, action) => {
      state.offline = action.payload;
      localStorage.setItem('offline', JSON.stringify(action.payload));
    }
  }
});

export const { setOffline } = offlineSlice.actions
export default offlineSlice.reducer