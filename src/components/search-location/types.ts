export interface Props {
    input:string;
    isOpen:boolean
    onToggle:() => void;
    icon:JSX.Element;
    label:string
    placeholder:string
    error:string 
    onInputChange:() => void

}
export interface StyledProps {
    error:string
  }
  