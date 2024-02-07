
export type Props  =  {
    disabledClose?:boolean
    onClose:() => void
} & React.PropsWithChildren & StyledProps


export interface StyledProps {
    height:string
}