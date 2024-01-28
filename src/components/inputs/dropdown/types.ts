export interface StyledProps {
    error:string
  }
  
  export interface Props extends StyledProps {
    options: string[];
    isOpen: boolean;
    onToggle: () => void;
    onSelect:(option:string) => void
    error:string 
    selectedCategories:string[]
    label:string
    icon:JSX.Element
    placeholder?:string
    showTags?:boolean
    overrideContent?:React.ReactNode
    height?:string
  }
  