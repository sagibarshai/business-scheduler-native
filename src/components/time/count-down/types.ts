

export interface CountdownProps {hours: number, minutes: number, seconds: number}

export interface Props  extends StyledProps{
  defaultHours:number
  defaultMinutes:number
  onSubmit:(time:CountdownProps) => void
  labelText:string
  modalTitle:string
  icon?:JSX.Element
}

export interface StyledProps {
  width?:string
}