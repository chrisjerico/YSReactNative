"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_native_webview_1 = require("react-native-webview");
var UGSkinManagers_1 = require("../../../public/theme/UGSkinManagers");
var OCHelper_1 = require("../../../public/define/OCHelper/OCHelper");
var AppDefine_1 = require("../../../public/define/AppDefine");
var OCCall_1 = require("../../../public/define/OCHelper/OCBridge/OCCall");
var ANHelper_1 = require("../../../public/define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../../public/define/ANHelper/hp/CmdDefine");
var JDPromotionListCP = /** @class */ (function (_super) {
    __extends(JDPromotionListCP, _super);
    function JDPromotionListCP(props) {
        var _this = _super.call(this, props) || this;
        _this.style1 = '不贴边'; // 行样式
        _this.style2 = 'page'; // 详情样式：slide折叠、popup弹窗、page内页
        _this.list = [];
        _this.lastSelectedIndex = -1;
        var _a = props.list, list = _a === void 0 ? [] : _a, style2 = props.style2;
        if ('c190'.indexOf(AppDefine_1.default.siteId) != -1) {
            _this.style1 = '贴边';
        }
        else if ('c199,c200,c213,c018,c206'.indexOf(AppDefine_1.default.siteId) != -1) {
            _this.style1 = '行边框';
        }
        else if ('c012'.indexOf(AppDefine_1.default.siteId) != -1) {
            _this.style1 = '外边框';
        }
        _this.style2 = style2;
        _this.list = list.map(function (item) {
            return Object.assign({}, item);
        });
        _this.state = {
            selectedIndex: -1,
        };
        return _this;
    }
    JDPromotionListCP.prototype.renderCell = function (pm, idx) {
        var _this = this;
        var _a, _b, _c;
        var cardMargin = this.style1 == '行边框' ? 11 : 0;
        var marginHorizontal = this.style1 === '贴边' ? 0 : 10;
        var marginVertical = this.style1 == '贴边' || this.style1 == '外边框' ? 0 : 5;
        var contentView = (<react_native_1.View style={{ marginHorizontal: marginHorizontal, marginVertical: AppDefine_1.default.siteId == 'c092' ? 10 : marginVertical, backgroundColor: AppDefine_1.default.siteId == 'c092' ? "#e0e0e0" : '#00000000', borderRadius: 8 }}>
        <react_native_gesture_handler_1.TouchableOpacity activeOpacity={1} onPress={function () {
            if (!pm.clsName) {
                pm.clsName = 'UGPromoteModel';
            }
            debugger;
            switch (react_native_1.Platform.OS) {
                case 'ios':
                    OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewControllerWithLinkCategory:linkPosition:', [pm.linkCategory, pm.linkPosition]).then(function (ret) {
                        if (ret)
                            return;
                        switch (_this.style2) {
                            // 内页
                            case 'page': {
                                OCHelper_1.OCHelper.call(function (_a) {
                                    var vc = _a.vc;
                                    return ({
                                        vc: {
                                            selectors: 'UGPromoteDetailController.new[setItem:]',
                                            args1: [pm],
                                        },
                                        ret: {
                                            selectors: 'UGNavigationController.current.pushViewController:animated:',
                                            args1: [vc, true],
                                        },
                                    });
                                });
                                break;
                            }
                            // 弹框
                            case 'popup': {
                                OCHelper_1.OCHelper.call('PromotePopView.alloc.initWithFrame:[setItem:].show', [OCCall_1.NSValue.CGRectMake(20, AppDefine_1.default.height * 0.1, AppDefine_1.default.width - 40, AppDefine_1.default.height * 0.8)], [pm]);
                                break;
                            }
                            // 折叠
                            case 'slide': {
                                _this.setState({
                                    selectedIndex: _this.state.selectedIndex === idx ? -1 : idx,
                                });
                                break;
                            }
                        }
                    });
                    break;
                case 'android':
                    ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_COUPON, __assign(__assign({}, pm), { style: _this.style2 }));
                    break;
            }
        }}>
          {((_a = pm.title) === null || _a === void 0 ? void 0 : _a.length) > 0 && <react_native_elements_1.Text style={{ marginTop: 10, marginBottom: 5, marginLeft: 5, color: UGSkinManagers_1.Skin1.textColor1, fontSize: 16, fontWeight: '500' }}>{pm.title}</react_native_elements_1.Text>}
          <react_native_fast_image_1.default style={{ height: (_b = pm.picHeight) !== null && _b !== void 0 ? _b : 100 }} source={{ uri: pm.pic }} onLoad={function (e) {
            var _a;
            if (!pm.picHeight) {
                pm.picHeight = (_a = ((AppDefine_1.default.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height) !== null && _a !== void 0 ? _a : 100;
                _this.setState({});
            }
        }}/>
        </react_native_gesture_handler_1.TouchableOpacity>
        {this.state.selectedIndex === idx && <react_native_1.View style={{ height: (_c = pm.webViewHeight) !== null && _c !== void 0 ? _c : 200 }}>
            <react_native_webview_1.default onNavigationStateChange={function (title) {
            if (!pm.webViewHeight && parseInt(title.title)) {
                pm.webViewHeight = parseInt(title.title);
                if (_this.lastSelectedIndex != _this.state.selectedIndex) {
                    _this.lastSelectedIndex = _this.state.selectedIndex;
                    _this.setState({});
                }
            }
        }} style={{ flex: 1 }} source={{
            html: "<head>\n                <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>\n                <style>img{width:auto !important;max-width:100%;height:auto !important}</style>\n                <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>\n              </head>" +
                "<script>\n                window.onload = function () {\n                  window.location.hash = 1;\n                  document.title = document.body.scrollHeight;\n                }\n              </script>" +
                pm.content,
        }}/>
          </react_native_1.View>}
      </react_native_1.View>);
        if (this.style1 === '行边框') {
            return <react_native_elements_1.Card containerStyle={{ margin: cardMargin, borderRadius: 8, paddingHorizontal: 0, paddingVertical: 3, backgroundColor: UGSkinManagers_1.Skin1.homeContentColor }}>{contentView}</react_native_elements_1.Card>;
        }
        return contentView;
    };
    JDPromotionListCP.prototype.render = function () {
        var _this = this;
        if (!this.list.length) {
            return (<react_native_elements_1.Text style={{ marginTop: 50, textAlign: 'center', color: 'white' }}>暂无</react_native_elements_1.Text>);
        }
        if (this.style1 == '外边框') {
            return (<react_native_1.View style={{ margin: 7, paddingTop: 11, borderColor: 'white', borderWidth: 1, borderRadius: 7, backgroundColor: UGSkinManagers_1.Skin1.homeContentColor }}>
          <react_native_gesture_handler_1.FlatList showsVerticalScrollIndicator={false} data={this.list} renderItem={function (data) { return _this.renderCell(data.item, data.index); }} keyExtractor={function (pm, idx) { return "key" + idx; }} ListFooterComponent={<react_native_1.View style={{ height: 100 }}/>}/>
        </react_native_1.View>);
        }
        return (<react_native_gesture_handler_1.FlatList showsVerticalScrollIndicator={false} data={this.list} renderItem={function (data) { return _this.renderCell(data.item, data.index); }} keyExtractor={function (pm, idx) { return "key" + idx; }} ListFooterComponent={<react_native_1.View style={{ height: 100 }}/>}/>);
    };
    return JDPromotionListCP;
}(react_1.Component));
exports.default = JDPromotionListCP;
