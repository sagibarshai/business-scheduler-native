import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export interface StyledProps {
    width?: string;
    height?: string;
    error?: string | null;
  }
  
  export interface Props extends StyledProps {
    onChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    error?: string | null;
    placeholder?:string
  }