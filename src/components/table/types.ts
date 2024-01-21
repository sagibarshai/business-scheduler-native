export interface StyledProps{
    isHeader?:boolean
    flex?:number
}
export interface Props{
    data:Record<string, React.ReactNode>[]
    customHeaders?:string[]
    columnSizes?:number[]
}