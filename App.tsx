import styled, { css } from "styled-components/native";
import { useAppDispatch, useAppSelector } from "./redux/store";
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
import { User, setUser } from "./redux/featuers/user/userSlice";
import { appAxios } from "./axios";

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
  padding: 20px;
`;

const App = () => {
  const dispatch = useAppDispatch();

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
    const excute = async () => {
      let token: string | null = null;

      if (!user.token) {
        token = await AsyncStorage.getItem("token");
        if (!token) navigation.navigate("auth");
        else {
          const res = await appAxios.get("/user", {
            headers: { authorization: `Bearer ${token}` },
          });
          const userData = res.data.user as User;
          const setUserPromise = new Promise<void>((resolve) => {
            dispatch(setUser({ ...userData, token: token! }));
            resolve();
          });
          await setUserPromise;
          if (userData.role === "N/A") navigation.navigate("config-role");
          else if (userData.role === "business") navigation.navigate("add-business");
        }
      } else {
        await AsyncStorage.setItem("token", user.token);

        if (user.role === "N/A") navigation.navigate("config-role");
        else if (user.role === "business") navigation.navigate("add-business");
      }
    };
    excute();
  }, [user]);

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
            initialRouteName="auth"
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
