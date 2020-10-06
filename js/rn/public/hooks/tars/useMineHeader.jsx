"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var OCEvent_1 = require("../../define/OCHelper/OCBridge/OCEvent");
var OCHelper_1 = require("../../define/OCHelper/OCHelper");
var RootNavigation_1 = require("../../navigation/RootNavigation");
var useMindeHeader = function () {
    var _a = react_1.useState(false), showBackBtn = _a[0], setShowBackBtn = _a[1];
    react_1.useEffect(function () {
        OCEvent_1.OCEvent.addEvent(OCEvent_1.OCEventType.viewWillAppear, function (event) {
            if (event == 'ReactNativeVC') {
                OCHelper_1.OCHelper.call('UGNavigationController.current.viewControllers.count').then(function (ocCount) {
                    var _a;
                    var show = ocCount > 1 ||
                        ((_a = RootNavigation_1.navigationRef === null || RootNavigation_1.navigationRef === void 0 ? void 0 : RootNavigation_1.navigationRef.current) === null || _a === void 0 ? void 0 : _a.getRootState().routes.length) > 1;
                    setShowBackBtn(show);
                });
            }
        });
    }, []);
    var goBack = function () {
        !RootNavigation_1.pop() &&
            OCHelper_1.OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
    };
    return {
        showBackBtn: showBackBtn,
        goBack: goBack,
    };
};
exports.default = useMindeHeader;
