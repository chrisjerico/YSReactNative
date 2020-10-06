"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var AppDefine_1 = require("../define/AppDefine");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var OCCall_1 = require("../define/OCHelper/OCBridge/OCCall");
var react_native_1 = require("react-native");
var ANHelper_1 = require("../define/ANHelper/ANHelper");
var CmdDefine_1 = require("../define/ANHelper/hp/CmdDefine");
var usePopUpView = function () {
    var _a = react_1.useState(""), style1 = _a[0], setStyle1 = _a[1];
    var _b = react_1.useState(0), cardMargin = _b[0], setCardMargin = _b[1];
    var _c = react_1.useState(0), marginHorizontal = _c[0], setMarginHorizontal = _c[1];
    var _d = react_1.useState(0), marginVertical = _d[0], setMarginVertical = _d[1];
    react_1.useEffect(function () {
        setCardMargin(style1 == '行边框' ? 11 : 0);
        setMarginHorizontal(style1 === '贴边' ? 0 : 10);
        setMarginVertical(style1 === '贴边' ? 0 : 5);
    }, [style1]);
    react_1.useEffect(function () {
        if ('c190'.indexOf(AppDefine_1.default.siteId) != -1) {
            setStyle1('贴边');
        }
        else if ('c199,c200,c213,c018'.indexOf(AppDefine_1.default.siteId) != -1) {
            setStyle1('行边框');
        }
        else if ('c012'.indexOf(AppDefine_1.default.siteId) != -1) {
            setStyle1('外边框');
        }
    }, [AppDefine_1.default.siteId]);
    var onPopViewPress = function (data, type, onPress) {
        if (!(data === null || data === void 0 ? void 0 : data.clsName)) {
            data.clsName = 'UGPromoteModel';
        }
        switch (react_native_1.Platform.OS) {
            case 'ios':
                switch (type) {
                    case 'page':
                        OCHelper_1.OCHelper.call(function (_a) {
                            var vc = _a.vc;
                            return ({
                                vc: {
                                    selectors: 'UGPromoteDetailController.new[setItem:]',
                                    args1: [data],
                                },
                                ret: {
                                    selectors: 'UGNavigationController.current.pushViewController:animated:',
                                    args1: [vc, true],
                                },
                            });
                        });
                        break;
                    case 'popup':
                        OCHelper_1.OCHelper.call('PromotePopView.alloc.initWithFrame:[setItem:].show', [OCCall_1.NSValue.CGRectMake(20, AppDefine_1.default.height * 0.1, AppDefine_1.default.width - 40, AppDefine_1.default.height * 0.8)], [data]);
                        break;
                    case 'slide':
                        if (onPress) {
                            onPress();
                        }
                        break;
                    default:
                        break;
                }
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_COUPON, __assign(__assign({}, data), { style: type }));
                break;
        }
    };
    return { onPopViewPress: onPopViewPress, cardMargin: cardMargin, marginHorizontal: marginHorizontal, marginVertical: marginVertical };
};
exports.default = usePopUpView;
//# sourceMappingURL=usePopUpView.js.map