import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TripState {
  loading: boolean;
  error: string;
  page: number;
  limit: number;
  total: number;
  query: string;
}

const initialState: TripState = {
  loading: false,
  error: '',
  page: 1,
  limit: 10,
  total: 0,
  query: '',
}

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setPage: (state: { page: number; }, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state: { limit: number; }, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setTotal: (state: { total: number; }, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setQuery: (state: { query: string; }, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setPage, setLimit, setTotal, setQuery } = tripsSlice.actions;
export default tripsSlice.reducer;