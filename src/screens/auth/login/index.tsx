import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../../../components/auth/login";

const BusinessProfileScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen options={{ title: "התחברות" }} name="login" component={Login} />
    </Stack.Navigator>
  );
};
export default BusinessProfileScreen;
