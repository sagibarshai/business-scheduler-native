import styled from 'styled-components/native';
import {Provider} from 'react-redux';
import store from './redux/store';

import {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
import AddNewBusiness from './src/screens/add-business';
import {I18nManager, Text} from 'react-native';
import {useEffect} from 'react';

const StyledView = styled.View`
  display: flex;
  width: 90%;
  height: 80%;
  margin: auto;
  flex-direction: row;
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
