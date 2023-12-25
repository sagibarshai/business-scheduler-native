export interface StyledProps {
    width?: string;
    height?: string;
  }
  
  export interface Props extends StyledProps {
    options: string[];
    isOpen: boolean;
    onToggle: () => void;
    option:string;
    onSelect:(option:string) => void
  }
  