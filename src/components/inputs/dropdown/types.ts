type Flavor = "bottom" | "regular"
export interface StyledProps {
    width?: string;
    height?: string;
    error:string
    flavor?: Flavor

  }
  
  export interface Props extends StyledProps {
    options: string[];
    isOpen: boolean;
    onToggle: () => void;
    option:string;
    onSelect:(option:string) => void
    error:string 
    flavor?: Flavor
    
  }
  