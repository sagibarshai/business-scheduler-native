import { NativeSyntheticEvent, TextInput, TextInputChangeEventData } from "react-native";

export interface StyledProps {
    width?: string;
    height?: string;
    error?: string | null;
    ref?:React.RefObject<TextInput>
  }
  
  export interface Props extends StyledProps {
    label: string;
    onChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    error?: string | null;
    icon?: JSX.Element;
    onBlur?: () => void;
    onFocus?: () => void;
    placeholder?:string
    ref?:React.RefObject<TextInput>
    withCurrency?:boolean
    value?: string;
  }