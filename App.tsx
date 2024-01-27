import { Provider } from "react-redux";
import styled, { css } from "styled-components/native";
import store from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import AddNewBusiness from "./src/screens/add-business";
import { I18nManager } from "react-native";
import { useEffect } from "react";
import { Platform, Keyboard, TouchableWithoutFeedback } from "react-native";

import { type StyledProps } from "./types";

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

  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    }
  }, []);

  return (
    <ThemeProvider theme={{ ...theme }}>
      <Provider store={store}>
        <NavigationContainer>
          <StyledAppWrapper platform={Platform}>
            <TouchableWithoutFeedback
              style={{ backgroundColor: "black", height: "100%", width: "100%" }}
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <SackNavigation.Navigator initialRouteName="add-business" screenOptions={{ contentStyle: { backgroundColor: "transparent" }, headerShown: false }}>
                <SackNavigation.Screen options={{ title: "הוספת העסק" }} name="add-business" component={AddNewBusiness} />
              </SackNavigation.Navigator>
            </TouchableWithoutFeedback>
          </StyledAppWrapper>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
