import { InputState } from "../../../../components/inputs/types";
import { SubCatogory } from "./sub-categories/types";

export interface SubCategoryState {
    time: InputState<SubCatogory["defaultTime"]>;
    price: InputState<SubCatogory["price"]>;
    name: InputState<SubCatogory["name"]>;
    isValid: boolean;
    isSelected: boolean;
}