"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var UGSkinManagers_1 = require("../../public/theme/UGSkinManagers");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var hooks_1 = require("@react-native-community/hooks");
var react_1 = require("react");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var native_1 = require("@react-navigation/native");
var react_native_scrollable_tab_view_1 = require("react-native-scrollable-tab-view");
var APIRouter_1 = require("../../public/network/APIRouter");
var react_native_fast_image_1 = require("react-native-fast-image");
var usePopUpView_1 = require("../../public/hooks/usePopUpView");
var AppDefine_1 = require("../../public/define/AppDefine");
var react_native_autoheight_webview_1 = require("react-native-autoheight-webview");
var PushHelper_1 = require("../../public/define/PushHelper");
var PromotionListPage = function (_a) {
    var navigation = _a.navigation;
    var _b = hooks_1.useDimensions().window, width = _b.width, height = _b.height;
    var top = react_native_safe_area_context_1.useSafeArea().top;
    var state = native_1.useNavigationState(function (state) { return state; });
    var _c = react_1.useState(), categories = _c[0], setCategories = _c[1];
    react_1.useEffect(function () {
        init();
        var unsubscribe;
        switch (react_native_1.Platform.OS) {
            case "ios":
                unsubscribe = navigation.addListener('focus', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var index;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, OCHelper_1.OCHelper.call("UGTabbarController.shared.selectedIndex")];
                            case 1:
                                index = _a.sent();
                                setCurrentNativeSelectedTab(index);
                                return [2 /*return*/];
                        }
                    });
                }); });
                break;
            case "android":
                //TODO
                setCurrentNativeSelectedTab(0);
                break;
        }
        return unsubscribe;
    }, []);
    var _d = react_1.useState(), promotionData = _d[0], setPromotionData = _d[1];
    var _e = react_1.useState(-1), currentNativeSelectedTab = _e[0], setCurrentNativeSelectedTab = _e[1];
    var init = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_1, categoriesArray_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.system_promotions()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_1 = _a.status;
                    setPromotionData(data);
                    categoriesArray_1 = [];
                    data.data.list.map(function (res) {
                        categoriesArray_1.push(res.category);
                    });
                    categoriesArray_1 = __spreadArrays(new Set(categoriesArray_1));
                    categoriesArray_1.sort();
                    setCategories(categoriesArray_1);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.View style={{ flex: 1, backgroundColor: 'balck' }}>
            <react_native_linear_gradient_1.default style={{ height: top, width: width }} colors={UGSkinManagers_1.Skin1.navBarBgColor}></react_native_linear_gradient_1.default>
            <react_native_linear_gradient_1.default style={{ height: 44, width: width, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} colors={UGSkinManagers_1.Skin1.navBarBgColor}>
                {state.index != 15 || currentNativeSelectedTab == 0 ?
        <react_native_1.View style={{ position: 'absolute', left: 8 }}>
                        <react_native_elements_1.Button icon={{ name: 'ios-arrow-back', type: 'ionicon', color: 'white' }} buttonStyle={[{ backgroundColor: 'transparent', left: 0, top: 0, alignSelf: 'flex-start' },]} onPress={function () {
            RootNavigation_1.popToRoot();
            switch (react_native_1.Platform.OS) {
                case 'ios':
                    break;
                case 'android':
                    OCHelper_1.OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
                    break;
            }
        }}/>
                    </react_native_1.View> : null}
                <react_native_1.Text style={{
        textAlign: 'center',
        color: UGSkinManagers_1.Skin1.isBlack ? 'white' : UGSkinManagers_1.Skin1.textColor3,
        fontSize: 18,
        fontWeight: "bold"
    }}>优惠活动</react_native_1.Text>
            </react_native_linear_gradient_1.default>
            <react_native_linear_gradient_1.default style={{ flex: 1, paddingBottom: 50 }} colors={UGSkinManagers_1.Skin1.bgColor}>
                {(categories === null || categories === void 0 ? void 0 : categories.length) > 0 ? <react_native_scrollable_tab_view_1.default renderTabBar={function (props) {
        return (<RenderTabBar props={props}/>);
    }}>
                    {categories === null || categories === void 0 ? void 0 : categories.map(function (res) {
        var _a, _b, _c;
        return <exports.PromotionLists promotionData={promotionData} tabLabel={(_c = (_b = (_a = promotionData === null || promotionData === void 0 ? void 0 : promotionData.data) === null || _a === void 0 ? void 0 : _a.categories) === null || _b === void 0 ? void 0 : _b[res]) !== null && _c !== void 0 ? _c : "全部"} dataSource={promotionData} filter={res}/>;
    })}
                </react_native_scrollable_tab_view_1.default> : null}
            </react_native_linear_gradient_1.default>
        </react_native_1.View>);
};
exports.PromotionLists = function (_a) {
    var dataSource = _a.dataSource, filter = _a.filter, promotionData = _a.promotionData;
    var _b;
    var _c = react_1.useState(-1), selectId = _c[0], setSelectedId = _c[1];
    var width = hooks_1.useDimensions().window.width;
    var onPopViewPress = usePopUpView_1.default().onPopViewPress;
    var onPromotionItemPress = function (data, type, onPress) {
        if ((data === null || data === void 0 ? void 0 : data.linkUrl) != "") {
            react_native_1.Linking.openURL(data === null || data === void 0 ? void 0 : data.linkUrl);
        }
        else if (data.linkCategory == 0 && data.linkPosition == 0) {
            onPopViewPress(data, type, onPress ? onPress : function () {
            });
        }
        else {
            PushHelper_1.default.pushCategory(data.linkCategory, data.linkPosition);
        }
    };
    return (<react_native_1.FlatList keyExtractor={function (item, index) { return item.id + index; }} data={filter != "0" ? dataSource.data.list.filter(function (res) { return res.category == filter; }) : (_b = dataSource === null || dataSource === void 0 ? void 0 : dataSource.data) === null || _b === void 0 ? void 0 : _b.list} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        var _b, _c;
        return <react_native_1.View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
                          <react_native_1.TouchableWithoutFeedback onPress={onPromotionItemPress.bind(null, item, (_c = (_b = promotionData === null || promotionData === void 0 ? void 0 : promotionData.data) === null || _b === void 0 ? void 0 : _b.style) !== null && _c !== void 0 ? _c : 'popup', function () {
            if (selectId == index) {
                setSelectedId(-1);
            }
            else {
                setSelectedId(index);
            }
        })}>
                              <react_native_1.View style={{}}>
                                  <react_native_1.Text style={{
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 5,
            color: UGSkinManagers_1.Skin1.textColor1
        }}>{item.title}</react_native_1.Text>
                                  <FastImageAutoHeight source={{ uri: item.pic }}/>
                              </react_native_1.View>

                          </react_native_1.TouchableWithoutFeedback>
                          {selectId == index ? <react_native_autoheight_webview_1.default style={{ width: width - 20, backgroundColor: 'white' }} 
        // scalesPageToFit={true}
        viewportContent={'width=device-width, user-scalable=no'} source={{
            html: "<head>\n            <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>\n            <style>img{width:auto !important;max-width:100%;height:auto !important}</style>\n            <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>\n          </head>" +
                "<script>\n            window.onload = function () {\n              window.location.hash = 1;\n              document.title = document.body.scrollHeight;\n            }\n          </script>" + item.content
        }}></react_native_autoheight_webview_1.default> : null}

                      </react_native_1.View>;
    }}/>);
};
var FastImageAutoHeight = function (props) {
    var _a = react_1.useState(100), picHeight = _a[0], setPicHeight = _a[1];
    var _b = usePopUpView_1.default(), cardMargin = _b.cardMargin, marginHorizontal = _b.marginHorizontal;
    return (<react_native_fast_image_1.default {...props} style={[props.style, { height: picHeight }]} onLoad={function (e) {
        setPicHeight((((AppDefine_1.default.width - 20) - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height);
    }}/>);
};
var RenderTabBar = function (props) {
    if (props.hidden) {
        return null;
    }
    console.log(props);
    var tabs = props.tabs;
    return (<react_native_1.View style={{ marginLeft: 5, flexDirection: 'row', height: 45 }}>
            {tabs === null || tabs === void 0 ? void 0 : tabs.map(function (title, idx) {
        return (<react_native_1.Text onPress={function () {
            props.goToPage(idx);
        }} style={{
            marginTop: 11,
            marginHorizontal: 5,
            width: 42,
            height: 27,
            paddingTop: 6,
            backgroundColor: idx == props.activeTab ? UGSkinManagers_1.Skin1.themeColor : 'transparent',
            textAlign: 'center',
            fontSize: 15,
            color: idx == props.activeTab ? UGSkinManagers_1.Skin1.textColor1 : UGSkinManagers_1.Skin1.textColor2,
            borderRadius: 3,
        }}>
                        {title}
                    </react_native_1.Text>);
    })}
        </react_native_1.View>);
};
exports.default = PromotionListPage;
