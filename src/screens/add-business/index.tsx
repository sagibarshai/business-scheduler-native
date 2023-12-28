import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Stage1 from "./stage-1";
import Stage2 from "./stage-2";
import { ParamListBase } from "@react-navigation/native";

const AddNewBusiness = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="stage-2" screenOptions={{ headerShown: true, headerTitleAlign: "center", title: "הוספת עסק", headerBackTitleVisible: false, headerBackButtonMenuEnabled: true, contentStyle: { backgroundColor: "transparent", padding: 20 } }}>
      <Stack.Screen name="stage-1" component={Stage1} />
      <Stack.Screen name="stage-2" component={Stage2} />
    </Stack.Navigator>
  );
};
export default AddNewBusiness;
