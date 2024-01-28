export interface CustomHeader {
value:string;
icon:JSX.Element
};
export interface StyledProps{
    isHeader?:boolean
    flex?:number
}
export interface Props{
    data:Record<string, React.ReactNode>[]
    customHeaders?:CustomHeader[]
    columnSizes?:number[]
    onClickRow?:(index:number) => void
}