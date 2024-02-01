import { ParamListBase } from "@react-navigation/native"
import { Platform } from "react-native"
import { SubCatogory } from "./src/screens/business/add-business/stage-3/sub-categories/types"



export interface StyledProps {
    platform: typeof Platform
}

export interface Screens {
    "add-business":undefined
    "business-profile":undefined
    "config-role":"config-role"
    "auth":"auth"
}
export interface NestedScreens {
    "stage-1":"stage-1",
    "stage-2":"stage-2",
    "stage-3":"stage-3",
    "login":"login",
    "signUp":"signUp",
}

export type RootStackParamList  = {
    "add-business":  {
        isEditMode?:boolean 
    },
    "business-profile":{},
    "config-role":{},
    "auth":{},
    "stage-1":{
        isEditMode?:boolean 
    },
    "stage-2":{
        isEditMode?:boolean 
    },
    "stage-3":{
        isEditMode?:boolean
    },
    "login":{},
    "signUp":{},
}
  