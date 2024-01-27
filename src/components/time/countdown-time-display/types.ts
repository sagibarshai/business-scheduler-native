export interface Props extends StyledProps {
    hours:string | number;
    minutes:string | number
    onPress:() => void
}
export interface StyledProps {
    width?:string
}