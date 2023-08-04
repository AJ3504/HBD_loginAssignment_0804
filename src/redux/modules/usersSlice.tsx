import { createSlice } from "@reduxjs/toolkit";

// [isLogin, setIsLogin] = useState(false) 전역상태 관리 위해 RTK로 바꿈

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLogin: false,
    isSignup: false,
  },
  reducers: {
    signup: (state) => {
      state.isSignup = true;
    },
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { signup, login, logout } = usersSlice.actions;
export default usersSlice.reducer;
