/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { theme } from "./theme";
import store from './redux/store';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';


const AppWrapper = () => <ThemeProvider theme={{ ...theme }}>
    <Provider store={store}>
    <NavigationContainer>

        <App />
    </NavigationContainer>

    </Provider>
</ThemeProvider>

AppRegistry.registerComponent(appName, () => AppWrapper);
