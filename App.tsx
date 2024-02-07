import styled, { css } from "styled-components/native";
import { useAppSelector } from "./redux/store";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { LogBox } from "react-native";

import AddNewBusiness from "./src/screens/business/add-business";
import { I18nManager } from "react-native";
import { useEffect } from "react";
import { Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";

import { type StyledProps } from "./types";
import BusinessProfileScreen from "./src/screens/business/business-profile";
import AuthScreens from "./src/screens/auth";
import ConfigRole from "./src/screens/config-role/component";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    // navigation
    let token = undefined;

    const getToken = async () => {
      try {
        token = await AsyncStorage.getItem("token");
      } catch (err) {
        console.log("err ", err);
      }
    };
    getToken();

    if (user.token || token) {
      const navigationAndStore = async () => {
        try {
          await AsyncStorage.setItem("token", user.token);
        } catch (err) {
          console.log("err ", err);
        }

        if (user.role === "N/A") navigation.navigate("config-role");
        else if (user.role === "business") navigation.navigate("add-business");
      };
      navigationAndStore();
    }
  }, [user.token, user.role]);

  LogBox.ignoreAllLogs();

  LogBox.ignoreLogs([
    "ERROR  A non-serializable value was detected in the state, in the path: `business.metaData.workingDaysAndHours.0.startHour`. Value: 2024-02-06T07:00:00.761Z",
  ]);

  return (
    <StyledAppWrapper platform={Platform}>
      <KeyboardAvoidingView
        enabled={true}
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <SackNavigation.Navigator
            initialRouteName="add-business"
            screenOptions={{ contentStyle: { backgroundColor: "transparent" }, headerShown: false }}
          >
            <SackNavigation.Screen name="auth" component={AuthScreens} />
            <SackNavigation.Screen
              options={{ title: "הוספת העסק" }}
              name="add-business"
              component={AddNewBusiness}
            />
            <SackNavigation.Screen
              options={{ title: "פרופיל העסק" }}
              name="business-profile"
              component={BusinessProfileScreen}
            />
            <SackNavigation.Screen
              options={{ title: "פרופיל העסק" }}
              name="config-role"
              component={ConfigRole}
            />
          </SackNavigation.Navigator>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </StyledAppWrapper>
  );
};

export default App;
