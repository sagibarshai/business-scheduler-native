import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type User = {
  email: string;
  token: string;
  id: string
  firstName: string
  lastName: string
  account_verified: boolean
  last_login: Date | null
  role: "business" | "user" |"guest" | "employee" | "N/A"
  phone: string

} 



const initialState: User = {
  email: "",
  token: "",
  account_verified:false,
  firstName:"",
  id:"",
  last_login:null,
  lastName:"",
  phone:"",
  role:"N/A"
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state: User, action: PayloadAction<User>) => {
      if (action.payload !== null && state !== null) {
        const user = action.payload;
        state.email = user.email;
        state.firstName = user.firstName;
        state.token = user.token;
        state.account_verified = user.account_verified
        state.role = user.role
        state.id = user.id
        state.lastName = user.lastName
        state.phone = user.phone
        state.last_login = user.last_login
      }
    },
  },
});

export const setUser = userSlice.actions.setUser;

export default userSlice.reducer;
