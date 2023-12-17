import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import userSlice from "./featuers/user/userSlice";

const store = configureStore({
  reducer: {
    userSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch; // useAppDispatch is a function that return useDispatch as type of store.dispatch

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
// useAppSelector is useSelector with type of store.getState

export default store;
