import { SelectedHoursAndDays } from "../../../screens/add-business/stage-1/select-days-and-hours/types"

export interface Props {
    selectedDaysAndHours: SelectedHoursAndDays
    editIndex?:number
    onEditRow?:(index:number) => void
    canEdit?:boolean
}