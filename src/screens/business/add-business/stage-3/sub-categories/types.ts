import { InputState } from "../../../../../components/inputs/types";
import { CountdownProps } from "../../../../../components/time/count-down/types";
import { SubCategoryState } from "../types";

export interface SubCatogory {
    defaultTime: { hours: number; minutes: number };
    price:number | null;
    name:string;
}
export interface Props {
    subCategories:SubCategoryState[]
    error?:string
    setSubCategories:React.Dispatch<React.SetStateAction<SubCategoryState[]>>
    
}
