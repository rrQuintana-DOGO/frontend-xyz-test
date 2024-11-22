import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RouteState {
  name: string;
}

const initialRouteState: RouteState = {
  name: '',
}

const routeSlice = createSlice({
  name: 'route',
  initialState: initialRouteState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = routeSlice.actions;
export default routeSlice.reducer;