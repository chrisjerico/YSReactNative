"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reactotron_react_native_1 = require("reactotron-react-native");
var react_native_1 = require("react-native");
// import AsyncStorage from '@react-native-community/async-storage';
var reactotron_redux_1 = require("reactotron-redux");
var middleware = function (tron) { };
var reactotron = reactotron_react_native_1.default
    .setAsyncStorageHandler(react_native_1.AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure({
    name: "React Native Demo"
}).use(reactotron_redux_1.reactotronRedux())
    .useReactNative() // add all built-in react native plugins
    // .use(middleware) // plus some custom made plugin.
    .connect();
exports.default = reactotron;
