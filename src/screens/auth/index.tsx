import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import SignUp from "./signup";
import Login from "./login";
import { ParamListBase, useNavigation } from "@react-navigation/native";

const AuthScreens = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const Stack = createNativeStackNavigator();

  const onNavigateToSignUpPage = () => navigation.navigate("signup");

  const onNavigateToLoginPage = () => navigation.navigate("login");

  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        title: "הוספת עסק",
        headerBackTitleVisible: false,
        headerBackButtonMenuEnabled: true,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        name="signup"
        options={{ title: "הרשמה" }}
        children={() => <SignUp onNavigateToLoginPage={onNavigateToLoginPage} />}
      />
      <Stack.Screen
        name="login"
        options={{ title: "התחברות" }}
        children={() => <Login onNavigateToSignUpPage={onNavigateToSignUpPage} />}
      />
    </Stack.Navigator>
  );
};
export default AuthScreens;
