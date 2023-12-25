import { Days } from "../../../../components/select-days";

export type Errors = {
    message: string;
    filed: string;
  }[];
  
  export type SelectedHoursAndDays = {
    days: Days;
    from: string;
    to: string;
    editMode: boolean;
  }[];
  
  export interface Props {
    selectedDays: Days;
    setSelectedDays: React.Dispatch<React.SetStateAction<Days>>;
    days: Days;
    selectedDaysAndHours:SelectedHoursAndDays
    setSelectedDaysAndHours:React.Dispatch<React.SetStateAction<SelectedHoursAndDays>>
  }