import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userName: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userName: "Admin",
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: { name: string; email: string }, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return userData.name;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка при авторизации");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userName = "Admin";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.userName = action.payload; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;