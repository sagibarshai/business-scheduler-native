export interface Props {
    isOpen:boolean
    onToggle:() => void;
    icon:JSX.Element;
    label:string
    placeholder:string
    error:string 
    onSelect:(location:string) => void
    value:string | null

}
export interface StyledProps {
    error:string
  }
  