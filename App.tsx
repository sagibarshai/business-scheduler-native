import styled from "styled-components/native";
import { Provider } from "react-redux";
import store from "./redux/store";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import AddNewBusiness from "./src/screens/add-business";
import { I18nManager } from "react-native";
import { useEffect } from "react";
import { Platform } from "react-native";
import { css } from "styled-components";

const StyledView = styled.View`
  ${() =>
    Platform.OS === "ios"
      ? css`
          width: 90%;
          height: 85%;
        `
      : css`
          width: 90%;
          height: 90%;
        `}
  display: flex;
  margin: auto;
`;

const App = () => {
  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <StyledView>
          <AddNewBusiness />
        </StyledView>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
