import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  name: string;
  email: string;
  token: string;
} | null;

const initialState: User = {
  email: "",
  token: "",
  name: "",
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state: User, action: PayloadAction<User>) => {
      console.log("state , ", state);
      if (action.payload !== null && state !== null) {
        const user = action.payload;
        state.email = user.email;
        state.name = user.name;
        state.token = user.token;
      }
    },
  },
});

export const setUser = userSlice.actions.setUser;

export default userSlice.reducer;
