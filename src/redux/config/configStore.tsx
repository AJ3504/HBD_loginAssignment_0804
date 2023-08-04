import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersSlice from "../modules/usersSlice";

// configStore export
export const configStore = configureStore({
  reducer: {
    users: usersSlice,
  },
});

// RootState export
export type RootState = ReturnType<typeof configStore.getState>;
