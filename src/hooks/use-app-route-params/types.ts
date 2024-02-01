import { NestedScreens, Screens } from "../../../types";

export interface Props {
    screen:keyof NestedScreens | keyof Screens 
}