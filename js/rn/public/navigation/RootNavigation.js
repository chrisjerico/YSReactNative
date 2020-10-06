"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var native_1 = require("@react-navigation/native");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var Navigation_1 = require("./Navigation");
var Router_1 = require("./Router");
var react_native_1 = require("react-native");
var ANHelper_1 = require("../define/ANHelper/ANHelper");
var UgLog_1 = require("../tools/UgLog");
var CmdDefine_1 = require("../define/ANHelper/hp/CmdDefine");
exports.navigationRef = React.createRef();
function navigate(page, props) {
    return goFirstTransitionPage(page, props);
}
exports.navigate = navigate;
function push(page, props) {
    return goFirstTransitionPage(page, props, Router_1.RouterType.Stack);
}
exports.push = push;
function jumpTo(page, props) {
    return goFirstTransitionPage(page, props, Router_1.RouterType.Tab);
}
exports.jumpTo = jumpTo;
function pop() {
    var _a, _b;
    var count = (_a = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _a === void 0 ? void 0 : _a.getRootState().routes.length;
    if (count < 3) {
        //检查一下Native主页下面的tab是显示还是隐藏
        switch (react_native_1.Platform.OS) {
            case "ios":
                OCHelper_1.OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [false, true]);
                break;
            case "android":
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.VISIBLE_MAIN_TAB, { visibility: 0 });
                break;
        }
    }
    count > 1 && ((_b = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _b === void 0 ? void 0 : _b.dispatch(native_1.StackActions.pop()));
    if (count > 1) {
        return true;
    }
    else {
        OCHelper_1.OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
        return false;
    }
}
exports.pop = pop;
function popToRoot() {
    var _a, _b;
    var canPop = ((_a = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _a === void 0 ? void 0 : _a.getRootState().routes.length) > 1;
    canPop && ((_b = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _b === void 0 ? void 0 : _b.dispatch(native_1.StackActions.popToTop()));
    //检查一下Native主页下面的tab是显示还是隐藏
    switch (react_native_1.Platform.OS) {
        case "ios":
            OCHelper_1.OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [false, true]);
            break;
        case "android":
            ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.VISIBLE_MAIN_TAB, { visibility: 0 });
            break;
    }
}
exports.popToRoot = popToRoot;
function getStackLength() {
    var _a;
    return (_a = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _a === void 0 ? void 0 : _a.getRootState().routes.length;
}
exports.getStackLength = getStackLength;
// 获取当前页面
function getCurrentPage() {
    var _a, _b;
    if ((_a = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _a === void 0 ? void 0 : _a.getCurrentRoute) {
        var name = ((_b = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _b === void 0 ? void 0 : _b.getCurrentRoute()).name;
        // @ts-ignore
        return name;
    }
    return undefined;
}
exports.getCurrentPage = getCurrentPage;
function replace(name, params) {
    var _a;
    try {
        (_a = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _a === void 0 ? void 0 : _a.dispatch(native_1.StackActions.replace(name, params));
    }
    catch (error) {
    }
}
exports.replace = replace;
// 复杂页面第一次初始化会卡顿，先去过渡页再切换（优化用户体验）
function goFirstTransitionPage(page, props, action) {
    var _a, _b, _c, _d, _e, _f;
    action = Router_1.Router.getPageRouterType(page, action);
    if (action === Router_1.RouterType.None) {
        console.log('查无此页面', page);
        return false;
    }
    if (getCurrentPage() === page) {
        console.log('页面已存在', page);
        return false;
    }
    try {
        if (getCurrentPage() == Navigation_1.PageName.TransitionPage) {
            console.log('跳转到', page);
            if (action == Router_1.RouterType.Stack) {
                var canPop = ((_a = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _a === void 0 ? void 0 : _a.getRootState().routes.length) > 1;
                if (canPop) {
                    (_b = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _b === void 0 ? void 0 : _b.dispatch(native_1.StackActions.replace(page, props));
                }
                else {
                    (_c = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _c === void 0 ? void 0 : _c.dispatch(native_1.StackActions.push(page, props));
                }
            }
            else {
                popToRoot();
                (_d = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _d === void 0 ? void 0 : _d.dispatch(native_1.TabActions.jumpTo(page, props));
            }
        }
        else {
            console.log('跳转到过渡页');
            //检查一下Native主页下面的tab是显示还是隐藏
            if (action == Router_1.RouterType.Stack) {
                switch (react_native_1.Platform.OS) {
                    case "ios":
                        OCHelper_1.OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
                        break;
                    case "android":
                        ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.VISIBLE_MAIN_TAB, { visibility: 8 });
                        break;
                }
                (_e = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _e === void 0 ? void 0 : _e.dispatch(native_1.StackActions.push(page, props));
            }
            else {
                popToRoot();
                (_f = exports.navigationRef === null || exports.navigationRef === void 0 ? void 0 : exports.navigationRef.current) === null || _f === void 0 ? void 0 : _f.dispatch(native_1.TabActions.jumpTo(Navigation_1.PageName.TransitionPage, { jumpTo: page, props: props }));
            }
        }
    }
    catch (e) {
        UgLog_1.ugLog("error=", e);
    }
    return true;
}
//# sourceMappingURL=RootNavigation.js.map