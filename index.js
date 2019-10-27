/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {OpenCV} from './src/NativeModules/OpenCV';

AppRegistry.registerComponent(appName, () => App);
