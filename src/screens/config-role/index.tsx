import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";

import { ParamListBase, useNavigation } from "@react-navigation/native";
import ConfigRole from "./component";

const AuthScreens = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="signUp">
      <Stack.Screen name="config-role" options={{ title: "התחברות" }} component={ConfigRole} />
    </Stack.Navigator>
  );
};
export default AuthScreens;
