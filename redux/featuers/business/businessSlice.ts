import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import { type ReduxSelectedHoursAndDays } from "../../../src/screens/add-business/stage-1/select-days-and-hours/types";



type Business = {
    address:string;
    name:string;
    category:string
    workingDaysAndHours:ReduxSelectedHoursAndDays[]
} | null;

const initialState: Business = {
  address:"",
  category:"",
  name:"",
  workingDaysAndHours:[]
};

const businessSlice = createSlice({
  initialState,
  name: "business",
  reducers: {
    setBusinessMetaData: (state: Business, action: PayloadAction<Business>) => {
      if (action.payload !== null && state !== null) {
        const business = action.payload;
        state.address = business.address;
        state.name = business.name;
        state.category = business.category;
        state.workingDaysAndHours = business.workingDaysAndHours
      }
    },
  },
});

export const setBusinessMetaData = businessSlice.actions.setBusinessMetaData;

export default businessSlice.reducer;