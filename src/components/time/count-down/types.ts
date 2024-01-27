

export interface CountdownProps {hours: number, minutes: number, seconds: number}

export interface Props {
  defaultHours:number
  defaultMinutes:number
  onSubmit:(time:CountdownProps) => void
  labelText:string
  modalTitle:string
  icon?:JSX.Element
}