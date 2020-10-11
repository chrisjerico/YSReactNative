"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var UGStore_1 = require("../../../redux/store/UGStore");
var OCEvent_1 = require("../../define/OCHelper/OCBridge/OCEvent");
var OCHelper_1 = require("../../define/OCHelper/OCHelper");
var RootNavigation_1 = require("../../navigation/RootNavigation");
var useShowBackBtn = function () {
    var _a = react_1.useState(false), showBackBtn = _a[0], setShowBackBtn = _a[1];
    var mobileMenu = UGStore_1.UGStore.globalProps.sysConf.mobileMenu;
    var userTab = mobileMenu === null || mobileMenu === void 0 ? void 0 : mobileMenu.find(function (item) { return (item === null || item === void 0 ? void 0 : item.path) == '/user'; });
    react_1.useEffect(function () {
        if (userTab) {
            OCEvent_1.OCEvent.addEvent(OCEvent_1.OCEventType.viewWillAppear, function (event) {
                if (event == 'ReactNativeVC') {
                    OCHelper_1.OCHelper.call('UGNavigationController.current.viewControllers.count').then(function (ocCount) {
                        var _a;
                        var show = ocCount > 1 || ((_a = RootNavigation_1.navigationRef === null || RootNavigation_1.navigationRef === void 0 ? void 0 : RootNavigation_1.navigationRef.current) === null || _a === void 0 ? void 0 : _a.getRootState().routes.length) > 1;
                        setShowBackBtn(show);
                    });
                }
            });
        }
        else {
            setShowBackBtn(true);
        }
        return function () {
            OCEvent_1.OCEvent.removeEvents(OCEvent_1.OCEventType.viewWillAppear);
        };
    }, []);
    return {
        showBackBtn: showBackBtn,
        userTab: userTab,
    };
};
exports.default = useShowBackBtn;
