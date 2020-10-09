"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ANHelper_1 = require("./ANHelper/ANHelper");
var react_native_1 = require("react-native");
var OCHelper_1 = require("./OCHelper/OCHelper");
var FPrototypes_1 = require("../tools/prototype/FPrototypes");
var UGStore_1 = require("../../redux/store/UGStore");
var RootNavigation_1 = require("../navigation/RootNavigation");
var AppDefine = /** @class */ (function () {
    function AppDefine() {
    }
    AppDefine.isTest = function () {
        if (react_native_1.Platform.OS == 'ios') {
            return OCHelper_1.OCHelper.CodePushKey != '67f7hDao71zMjLy5xjilGx0THS4o4ksvOXqog' && OCHelper_1.OCHelper.CodePushKey != 'by5lebbE5vmYSJAdd5y0HRIFRcVJ4ksvOXqog';
        }
        return false;
    };
    AppDefine.checkHeaderShowBackButton = function (callback) {
        if (react_native_1.Platform.OS != 'ios')
            return;
        OCHelper_1.OCHelper.call('UGNavigationController.current.viewControllers.count').then(function (ocCount) {
            var _a;
            var show = ocCount > 1 || ((_a = RootNavigation_1.navigationRef === null || RootNavigation_1.navigationRef === void 0 ? void 0 : RootNavigation_1.navigationRef.current) === null || _a === void 0 ? void 0 : _a.getRootState().routes.length) > 1;
            callback(show);
        });
    };
    AppDefine.setup = function () {
        // 配置fish拓展方法
        FPrototypes_1.default.setupAll();
        // 读取本地缓存到Store
        UGStore_1.UGStore.refreshFromLocalData();
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.setup();
                break;
            case 'android':
                ANHelper_1.ANHelper.setup();
                break;
        }
    };
    AppDefine.host = 'http://450app.cc'; // 接口域名
    AppDefine.siteId = '未知站点';
    AppDefine.width = react_native_1.Dimensions.get('window').width;
    AppDefine.height = react_native_1.Dimensions.get('window').height;
    AppDefine.iOS = react_native_1.Platform.OS == 'ios';
    return AppDefine;
}());
exports.default = AppDefine;
