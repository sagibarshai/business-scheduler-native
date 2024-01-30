import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../../../components/auth/signup";

const BusinessProfileScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="signUp">
      <Stack.Screen options={{ title: "הרשמה" }} name="signUp" component={SignUp} />
    </Stack.Navigator>
  );
};
export default BusinessProfileScreen;
