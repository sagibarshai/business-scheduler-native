import { CountdownProps } from "../../../../../components/time/count-down/types";

export interface SubCatogory {
    time:CountdownProps | null;
    price:number | null;
    name:string;
}
export interface Props {
    subCategories:SubCatogory[]
    selectedSubCategories:SubCatogory[]
    setSelectedSubCategories: React.Dispatch<React.SetStateAction<SubCatogory[]>>
    error?:string
}