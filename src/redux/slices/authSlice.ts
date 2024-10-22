import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
}

const storedAuth = localStorage.getItem('auth');

const initialState: AuthState = {
  isAuthenticated: !!storedAuth,
  user: storedAuth ? JSON.parse(storedAuth) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('auth');
    },
    setUser: (state, action: PayloadAction<{ username: string } | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
