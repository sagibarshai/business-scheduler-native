import { InputState } from "../../../../../../components/inputs/types";
import { SubCategoryState } from "../../types";
import { SubCatogory } from "../types";

export interface Props {
    subCategoryData:SubCategoryState
    onSave:(selectedSubCategoryData:SubCategoryState) => void
    onCancel:(selectedSubCategoryData:SubCategoryState) => void
    openTimeOnMount?:boolean    
    isNameEditable?:boolean
}