import { SubCatogory } from "../types";

export interface Props {
    subCategoryData:SubCatogory
    onSave:(selectedSubCategoryData:SubCatogory) => void
    onCancel:(selectedSubCategoryData:SubCatogory) => void
    openTimeOnMount?:boolean
    
}