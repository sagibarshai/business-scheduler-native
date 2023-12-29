import { ReduxSelectedHoursAndDays, SelectedHoursAndDays } from "../../../screens/add-business/stage-1/select-days-and-hours/types"

export interface Props {
    selectedDaysAndHours: SelectedHoursAndDays | ReduxSelectedHoursAndDays
    editIndex?:number
    onEditRow?:(index:number) => void
    canEdit?:boolean
}

export interface StyledProps {
    canEdit?:boolean
}