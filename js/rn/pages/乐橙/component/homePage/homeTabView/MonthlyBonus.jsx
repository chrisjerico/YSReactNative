"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthlyBonus = void 0;
var react_native_1 = require("react-native");
// import AsyncStorage from '@react-native-community/async-storage';
var React = require("react");
var react_number_format_1 = require("react-number-format");
var react_1 = require("react");
exports.MonthlyBonus = function () {
    var _a = react_1.useState(), bonus = _a[0], setBonus = _a[1];
    react_1.useEffect(function () {
        react_native_1.AsyncStorage.getItem('LCMonthlyBonus').then(function (value) {
            var currentDate = new Date();
            if (currentDate.getDate() != 1 && !isNaN(parseInt(value))) {
                var randomNumber = Math.floor(Math.random() * 10000) + Math.random() * 10000 + 2;
                var newValue = (parseInt(value) + randomNumber).toFixed(0).toString();
                react_native_1.AsyncStorage.setItem('LCMonthlyBonus', newValue);
                setBonus(newValue);
            }
            else {
                var newValue = (Math.floor(Math.random() * 10000) + Math.random() * 10 + 2).toFixed(0);
                react_native_1.AsyncStorage.setItem('LCMonthlyBonus', newValue.toString());
                setBonus(newValue.toString());
            }
        });
    }, []);
    return (<react_native_1.View style={{ height: 54, marginTop: 10, alignItems: 'center' }}>
      <react_native_1.Image style={{ height: 44, width: '100%', resizeMode: 'stretch', position: 'absolute', top: 6 }} source={{ uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/bonus.png' }}/>
      <react_native_1.Text style={{ color: '#6666FF', fontSize: 12, fontWeight: 'bold' }}>本月已发放红利</react_native_1.Text>
      <react_native_1.View style={{ flex: 1, justifyContent: 'center' }}>
        <react_number_format_1.default thousandSeparator={','} value={bonus} displayType={'text'} prefix={'￥ '} renderText={function (value) {
        return <react_native_1.Text style={{ color: '#6666FF', fontSize: 20 }}>{value}</react_native_1.Text>;
    }}/>
      </react_native_1.View>
    </react_native_1.View>);
};
