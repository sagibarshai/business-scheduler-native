import { Provider } from "react-redux";
import styled, { css } from "styled-components/native";
import store, { useAppSelector } from "./redux/store";
import { NavigationContainer, ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import AddNewBusiness from "./src/screens/business/add-business";
import { I18nManager } from "react-native";
import { useEffect } from "react";
import { Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";

import { type StyledProps } from "./types";
import BusinessProfileScreen from "./src/screens/business/business-profile";
import AuthScreens from "./src/screens/auth";
import ConfigRole from "./src/screens/config-role/component";

const StyledAppWrapper = styled.View<StyledProps>`
  ${(props) =>
    props.platform.OS === "ios"
      ? css`
          width: 100%;
          height: 100%;
        `
      : css`
          width: 100%;
          height: 100%;
        `}
  display: flex;
  margin: auto;
`;

const App = () => {
  const SackNavigation = createNativeStackNavigator();

  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    }
  }, []);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    if (user.token) {
      if (user.role === "N/A") navigation.navigate("config-role");
      else if (user.role === "business") navigation.navigate("add-business");
    }
  }, [user.token, user.role]);

  return (
    <StyledAppWrapper platform={Platform}>
      <KeyboardAvoidingView enabled={true} style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <SackNavigation.Navigator initialRouteName="auth" screenOptions={{ contentStyle: { backgroundColor: "transparent" }, headerShown: false }}>
            <SackNavigation.Screen name="auth" component={AuthScreens} />
            <SackNavigation.Screen options={{ title: "הוספת העסק" }} name="add-business" component={AddNewBusiness} />
            <SackNavigation.Screen options={{ title: "פרופיל העסק" }} name="business-profile" component={BusinessProfileScreen} />
            <SackNavigation.Screen options={{ title: "פרופיל העסק" }} name="config-role" component={ConfigRole} />
          </SackNavigation.Navigator>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </StyledAppWrapper>
  );
};

export default App;
