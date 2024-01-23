import axios from "axios";
import styled, { css } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import AddNewBusiness from "./src/screens/add-business";
import { I18nManager } from "react-native";
import { useEffect } from "react";
import { Platform } from "react-native";

import { type StyledProps } from "./types";
// AIzaSyA0puLIR9nfTrgLHUuwmoewVYzDLB_kSFU

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Tel&key=AIzaSyA0puLIR9nfTrgLHUuwmoewVYzDLB_kSFU");
        // const parsedResponse = response.data;
        // console.log("parsedResponse ", parsedResponse);
      } catch (err) {
        console.log("err ", err);
      }
    };
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StyledAppWrapper platform={Platform}>
          <SackNavigation.Navigator initialRouteName="add-business" screenOptions={{ contentStyle: { backgroundColor: "transparent" }, headerShown: false }}>
            <SackNavigation.Screen options={{ title: "הוספת העסק" }} name="add-business" component={AddNewBusiness} />
          </SackNavigation.Navigator>
        </StyledAppWrapper>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
