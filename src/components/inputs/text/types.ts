import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export interface StyledProps {
    width?: string;
    height?: string;
    error?: string | null;
    isTextArea?:boolean
    
  }
  
  export interface Props extends StyledProps {
    label: string;
    onChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    error?: string | null;
    icon?: JSX.Element;
    onBlur?: () => void;
    onFocus?: () => void;
    isTextArea?:boolean
    placeholder?:string
  }