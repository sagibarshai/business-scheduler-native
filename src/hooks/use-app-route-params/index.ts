import { RouteProp, useRoute,ParamListBase } from "@react-navigation/native";
import { Props } from "./types";
import {RootStackParamList} from '../../../types'

export const useAppRouteParams = ({screen}:Props) => {
    const route: RouteProp<RootStackParamList, typeof screen> = useRoute();
    return route.params as RootStackParamList[typeof screen];
    

}
