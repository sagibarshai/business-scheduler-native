import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import { type ReduxSelectedHoursAndDays } from "../../../src/screens/add-business/stage-1/select-days-and-hours/types";


interface BusinessPhotos {
  profile: any
  cover: any

}

interface BusinessMetaData {
  address:string;
  name:string;
  category:string
  workingDaysAndHours:ReduxSelectedHoursAndDays
}

type Business = {
    metaData:BusinessMetaData
    photos:BusinessPhotos
} | null;

const initialState: Business = {
  metaData:{
    address:"",
    category:"",
    name:"",
    workingDaysAndHours:[],
  },
  photos:{
    cover:"",
    profile:""
  },
};

const businessSlice = createSlice({
  initialState,
  name: "business",
  reducers: {
    setBusinessMetaData: (state: Business, action: PayloadAction<BusinessMetaData>) => {
      if (action.payload !== null && state !== null) {
        const business = action.payload;
        state.metaData.address = business.address;
        state.metaData.name = business.name;
        state.metaData.category = business.category;
        state.metaData.workingDaysAndHours = business.workingDaysAndHours
      }
    },
    setBusinessPhotos:(state:Business, action:PayloadAction<BusinessPhotos>) => {
      
    }
  },
});

export const setBusinessMetaData = businessSlice.actions.setBusinessMetaData;
export const setBusinessPhotos = businessSlice.actions.setBusinessPhotos;

export default businessSlice.reducer;
