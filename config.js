"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.releaseConfig = exports.devConfig = void 0;
var react_native_1 = require("react-native");
var OCHelper_1 = require("./js/rn/public/define/OCHelper/OCHelper");
// 调试环境配置
exports.devConfig = {
    isDebug: __DEV__,
    isTest: function () {
        // 是否测试环境
        if (react_native_1.Platform.OS == 'ios') {
            return (OCHelper_1.OCHelper.CodePushKey != '67f7hDao71zMjLy5xjilGx0THS4o4ksvOXqog' &&
                OCHelper_1.OCHelper.CodePushKey != 'by5lebbE5vmYSJAdd5y0HRIFRcVJ4ksvOXqog');
        }
        return false;
    },
    skinKey: '威尼斯',
};
// 线上环境配置（这几个站点写死经典模板）
exports.releaseConfig = {
    skinKeys: {
        c242: '经典1',
        c235: '经典1',
        h003: '经典1',
    },
};
