import { SubCatogory } from "../types";

export interface Props {
    onSave:(selectedSubCategoryData:SubCatogory) => void
    onCancel:(selectedSubCategoryData:SubCatogory) => void
}