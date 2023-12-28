import { Provider } from "react-redux";
import store from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import AddNewBusiness from "./src/screens/add-business";
import { I18nManager } from "react-native";
import { useEffect } from "react";
import { Platform } from "react-native";
import { StyledAppWrapper } from "./styled";

const App = () => {
  const SackNavigation = createNativeStackNavigator();

  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <StyledAppWrapper platform={Platform}>
            <SackNavigation.Navigator initialRouteName="add-business" screenOptions={{ contentStyle: { backgroundColor: "transparent" }, headerShown: false }}>
              <SackNavigation.Screen options={{ title: "הוספת העסק" }} name="add-business" component={AddNewBusiness} />
            </SackNavigation.Navigator>
          </StyledAppWrapper>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
