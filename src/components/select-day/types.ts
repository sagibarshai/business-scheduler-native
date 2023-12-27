export interface StyledProps {
    selected: boolean;
    disabled: boolean;
  }
  export interface Props extends StyledProps {
    dayText: string;
    onTouch: React.Dispatch<React.SetStateAction<any>>;
  }