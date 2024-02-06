export interface Props extends StyledProps {
    hours:string | number;
    minutes:string | number
    onPress:() => void
    error?:string
}
export interface StyledProps {
    width?:string
    error?:string
}