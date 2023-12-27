import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export interface StyledProps {
    width?: string;
    height?: string;
    error: string | null;
  }
  
  export interface Props extends StyledProps {
    icon: JSX.Element;
    label: string;
    onChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    error: string | null;
    onBlur: () => void;
    onFocus: () => void;
  }