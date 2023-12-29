import { type Days } from "../../../../components/select-days/types";

export type Errors = {
    message: string;
    filed: string;
  }[];
  
export type DaysAndHours = { days: Days;
  from: string;
  to: string;
  editMode: boolean;
  startHour:Date
  endHour:Date}

  export type SelectedHoursAndDays = DaysAndHours[];
  
  export interface ReduxSelectedHoursAndDays extends Omit<DaysAndHours,'startHour' | 'endHour'> {
    startHour: string;
    endHour: string;
  }
  


  export interface Props {
    selectedDays: Days;
    setSelectedDays: React.Dispatch<React.SetStateAction<Days>>;
    days: Days;
    selectedDaysAndHours: SelectedHoursAndDays
    onSubmitDaysAndHours: (data: SelectedHoursAndDays) => void
    error:string | null
    onEditMode:() => void
  }