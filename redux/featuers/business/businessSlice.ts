import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import { SelectedHoursAndDays, type ReduxSelectedHoursAndDays } from "../../../src/screens/business/add-business/stage-1/select-days-and-hours/types";
import { SubCatogory } from "../../../src/screens/business/add-business/stage-3/sub-categories/types";
import { Asset } from "react-native-image-picker";




export interface BusinessPhotos {
  profile: Asset
  cover: Asset
  regular:Asset[]
}


export interface BusinessMetaData {
  address:string;
  name:string;
  category:string
  workingDaysAndHours:SelectedHoursAndDays
  phone:string
}

export interface BusinessData {
  subCategories:SubCatogory[]
  description:string
}

type Business = {
    metaData:BusinessMetaData
    photos:BusinessPhotos
    data:BusinessData
    
    
} | null;

const initialState: Business = {
  metaData:{
    address:"",
    category:"",
    name:"",
    workingDaysAndHours:[],
    phone:"",
  },
  photos:{
    cover:{},
    profile:{},
    regular:[]
  },
  data:{
    description:"",
    subCategories:[]
  }
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
        state.metaData.phone = businessMetaData.phone
      }
    },
    setBusinessPhotos:(state:Business, action:PayloadAction<BusinessPhotos>) => {
      if (action.payload !== null && state !== null) {
        const businessPhotos = action.payload;
        state.photos.profile = businessPhotos.profile
        state.photos.cover = businessPhotos.cover
        state.photos.regular = businessPhotos.regular
      }
    },
    setBusinessData:(state:Business, action:PayloadAction<BusinessData>) => {
      if (action.payload !== null && state !== null) {
        const businessData = action.payload;
        state.data.description = businessData.description
        state.data.subCategories = businessData.subCategories
      }
    },
  },
});

export const setBusinessMetaData = businessSlice.actions.setBusinessMetaData;
export const setBusinessPhotos = businessSlice.actions.setBusinessPhotos;
export const setBusinessData = businessSlice.actions.setBusinessData;

export default businessSlice.reducer;
