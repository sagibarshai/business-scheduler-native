export type Days = {
    name: string;
    selected: boolean;
    disabled: boolean;
    longName: string;
  }[];
  export interface Props {
    selectedDays: Days;
    setSelectedDays: React.Dispatch<React.SetStateAction<Days>>;
    days: Days;
  }