import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Stage1 from "./stage-1";
import Stage2 from "./stage-2";
import Stage3 from "./stage-3";
import { useEffect } from "react";
import { appAxios } from "../../../../axios";
import { useAppSelector } from "../../../../redux/store";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";

const AddNewBusiness = () => {
  const Stack = createNativeStackNavigator();
  const user = useAppSelector((state) => state.user);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await appAxios.get("/business", {
          headers: { authorization: `Bearer ${user.token}` },
        });
        if (res) {
          navigation.navigate("business-profile");
        }
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 401) navigation.navigate("auth");
      }
    };
    if (user.token) fetchData();
  }, [user]);

  return (
    <Stack.Navigator
      initialRouteName="stage-1"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        title: "הוספת עסק",
        headerBackTitleVisible: false,
        headerBackButtonMenuEnabled: true,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="stage-1" component={Stage1} />
      <Stack.Screen name="stage-2" component={Stage2} />
      <Stack.Screen name="stage-3" component={Stage3} />
    </Stack.Navigator>
  );
};
export default AddNewBusiness;
