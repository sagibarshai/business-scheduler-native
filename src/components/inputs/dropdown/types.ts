export interface StyledProps {
    error:string

  }
  
  export interface Props extends StyledProps {
    options: string[];
    isOpen: boolean;
    onToggle: () => void;
    option:string;
    onSelect:(option:string) => void
    error:string 
    
  }
  