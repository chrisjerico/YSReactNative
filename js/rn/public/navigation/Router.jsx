"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stack_1 = require("@react-navigation/stack");
var bottom_tabs_1 = require("@react-navigation/bottom-tabs");
var drawer_1 = require("@react-navigation/drawer");
var react_1 = require("react");
var react_2 = require("react");
var RootNavigation_1 = require("./RootNavigation");
var RouterType;
(function (RouterType) {
    RouterType[RouterType["None"] = 0] = "None";
    RouterType[RouterType["Stack"] = 1] = "Stack";
    RouterType[RouterType["Tab"] = 2] = "Tab";
    RouterType[RouterType["Drawer"] = 3] = "Drawer";
})(RouterType = exports.RouterType || (exports.RouterType = {}));
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.getPageRouterType = function (pageName, priorityType) {
        if (priorityType === void 0) { priorityType = RouterType.None; }
        var _a;
        var types = this.getPageRouterTypes(pageName);
        switch (types.length) {
            case 0:
                return RouterType.None;
            case 1:
                return types[0];
            default: {
                if (types.indexOf(priorityType) != -1) {
                    return priorityType;
                }
                var isStack = ((_a = RootNavigation_1.navigationRef === null || RootNavigation_1.navigationRef === void 0 ? void 0 : RootNavigation_1.navigationRef.current) === null || _a === void 0 ? void 0 : _a.getRootState().routes.length) > 1;
                return isStack ? RouterType.Stack : RouterType.Tab;
            }
        }
    };
    Router.getPageRouterTypes = function (pageName) {
        var isStack = this.PageNameLists.stackList.indexOf(pageName) != -1;
        var isTab = this.PageNameLists.tabList.indexOf(pageName) != -1;
        var isDrawer = this.PageNameLists.drawerList.indexOf(pageName) != -1;
        var types = [];
        isStack && types.push(RouterType.Stack);
        isTab && types.push(RouterType.Tab);
        isDrawer && types.push(RouterType.Drawer);
        return types;
    };
    // 顶部导航
    Router.StackNavigator = function (props) {
        // 保存页面名
        react_1.Children.forEach(props.children, function (child) {
            Router.PageNameLists.stackList.push(child.props.name);
        });
        return <Router._Stack.Navigator {...props}/>;
    };
    // 底部标签栏
    Router.TabNavigator = function (props) {
        // 保存页面名
        react_1.Children.forEach(props.children, function (child) {
            Router.PageNameLists.tabList.push(child.props.name);
        });
        return <Router._Tab.Navigator {...props}/>;
    };
    // 侧边栏
    Router.DrawerNavigator = function (props) {
        // 保存页面名
        react_1.Children.forEach(props.children, function (child) {
            Router.PageNameLists.drawerList.push(child.props.name);
        });
        return <Router._Drawer.Navigator {...props}/>;
    };
    //
    // —————— 此文件就是为了拿到以下字段，其他代码都是react-navigation抄过来的
    Router.PageNameLists = {
        stackList: [],
        tabList: [],
        drawerList: [],
    };
    // —————————————————————————————————————————————————————————————————————————————————
    Router._Stack = stack_1.createStackNavigator();
    Router._Tab = bottom_tabs_1.createBottomTabNavigator();
    Router._Drawer = drawer_1.createDrawerNavigator();
    Router.StackScreen = Router._Stack.Screen;
    Router.TabScreen = Router._Tab.Screen;
    Router.DrawerScreen = Router._Drawer.Screen;
    return Router;
}());
exports.Router = Router;
