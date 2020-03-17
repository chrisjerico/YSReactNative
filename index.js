/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AppRouter} from './src/js/app/router/AppRouter';
import UGApplication from './src/js/app/UGApplication';

AppRegistry.registerComponent(appName, () => UGApplication);
