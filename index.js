/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import UGApplication from './src/js/app/UGApplication';
import './js/rn/pages/router/ios/LaunchVC';

AppRegistry.registerComponent(appName, () => UGApplication);
