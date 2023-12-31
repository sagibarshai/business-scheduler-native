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
  description:string
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
    description:""
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
        const businessMetaData = action.payload;
        state.metaData.address = businessMetaData.address;
        state.metaData.name = businessMetaData.name;
        state.metaData.category = businessMetaData.category;
        state.metaData.workingDaysAndHours = businessMetaData.workingDaysAndHours
        state.metaData.description = businessMetaData.description
      }
    },
    setBusinessPhotos:(state:Business, action:PayloadAction<BusinessPhotos>) => {
      if (action.payload !== null && state !== null) {
        const businessPhotos = action.payload;
        state.photos.profile = businessPhotos.profile
        state.photos.cover = businessPhotos.cover

      }
    }
  },
});

export const setBusinessMetaData = businessSlice.actions.setBusinessMetaData;
export const setBusinessPhotos = businessSlice.actions.setBusinessPhotos;

export default businessSlice.reducer;
