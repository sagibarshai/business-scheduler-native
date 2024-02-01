
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Props } from "./types";
import { RootStackParamList } from "../../../types";

export const useAppNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const navigateTo = (to: Props['to'], params?: RootStackParamList[typeof to]) => {
    navigation.navigate(to, params);
  };

  return {
    navigateTo,
  };
};

