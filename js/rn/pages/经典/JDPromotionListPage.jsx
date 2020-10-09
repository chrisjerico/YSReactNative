"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JDPromotionListPage = void 0;
var react_1 = require("react");
var NetworkRequest1_1 = require("../../public/network/NetworkRequest1");
var JDPromotionListCP_1 = require("./cp/JDPromotionListCP");
var UGSkinManagers_1 = require("../../public/theme/UGSkinManagers");
var react_native_scrollable_tab_view_1 = require("react-native-scrollable-tab-view");
var react_native_elements_1 = require("react-native-elements");
var react_native_1 = require("react-native");
var AppDefine_1 = require("../../public/define/AppDefine");
var chroma_js_1 = require("chroma-js");
var UGThemeColor_1 = require("../../public/theme/UGThemeColor");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
// 优惠活动页
exports.JDPromotionListPage = function (props) {
    var setProps = props.setProps, _a = props.vars, v = _a === void 0 ? { style1: '背景透明' } : _a, containerStyle = props.containerStyle;
    react_1.useEffect(function () {
        setProps({
            navbarOpstions: { hidden: false, title: '优惠活动', back: true },
            backgroundColor: UGSkinManagers_1.Skin1.bgColor,
            dataArray: [],
            style: 'page',
            showTopBar: false,
        });
        OCHelper_1.OCHelper.call('UGNavigationController.current.viewControllers.count').then(function (cnt) {
            if (cnt == 1 && RootNavigation_1.getStackLength() == 1) {
                setProps({ navbarOpstions: { back: false } });
            }
        });
        NetworkRequest1_1.default.systeam_promotions().then(function (data) {
            if (data.showCategory) {
                var temp_1 = [];
                data.list.map(function (pm) {
                    var list = temp_1[pm.category];
                    if (!list) {
                        list = [];
                    }
                    temp_1[pm.category] = list;
                    list.push(pm);
                });
                var dataArray_1 = [];
                dataArray_1.push({ category: '0', title: '全部', list: data.list });
                var _loop_1 = function (k) {
                    var title = data.categories[k];
                    if (!title) {
                        return "continue";
                    }
                    var obj = dataArray_1.filter(function (v) {
                        return v.title == title;
                    })[0];
                    if (obj) {
                        obj.list = obj.list.concat(temp_1[k]);
                    }
                    else {
                        dataArray_1.push({ category: k, title: title, list: temp_1[k] });
                    }
                };
                for (var k in temp_1) {
                    _loop_1(k);
                }
                setProps({ style: data.style, dataArray: dataArray_1, showTopBar: dataArray_1.length > 1 });
            }
            else {
                setProps({ style: data.style, dataArray: [{ title: '热门', list: data.list }] });
            }
        });
    }, []);
    if ('c217'.indexOf(AppDefine_1.default.siteId) != -1) {
        v.style1 = '背景不透明';
    }
    if ('c012'.indexOf(AppDefine_1.default.siteId) != -1) {
        setProps({ backgroundColor: UGSkinManagers_1.Skin1.navBarBgColor });
    }
    var _b = props.dataArray, dataArray = _b === void 0 ? [] : _b, _c = props.showTopBar, showTopBar = _c === void 0 ? true : _c;
    if (dataArray.length == 0) {
        return null;
    }
    var contentViews = dataArray.map(function (plm, index) {
        return <JDPromotionListCP_1.default key={index} list={plm.list} style2={props.style}/>;
    });
    return (<react_native_scrollable_tab_view_1.default style={containerStyle} renderTabBar={function (props) {
        return (<TopBar {...props} titles={dataArray.map(function (plm) {
            return plm.title;
        })} hidden={!showTopBar} style={v === null || v === void 0 ? void 0 : v.style1}/>);
    }}>
      {contentViews}
    </react_native_scrollable_tab_view_1.default>);
};
// 顶部标题栏
function TopBar(props) {
    if (props.hidden) {
        return null;
    }
    var _a = props.titles, titles = _a === void 0 ? [] : _a;
    if (props.style === '背景不透明') {
        return (<react_native_1.View style={{ flexDirection: 'row', justifyContent: 'space-around', height: props.hidden ? 0 : 43, backgroundColor: chroma_js_1.default(UGSkinManagers_1.Skin1.themeColor).brighten(0.4).hex() }}>
        <react_native_1.View style={{ position: 'absolute', left: 0, top: 42, width: AppDefine_1.default.width, height: 1, backgroundColor: '#ccc' }}/>
        {titles.map(function (title, idx) {
            return (<react_native_1.View key={idx}>
              <react_native_elements_1.Text onPress={function () {
                props.goToPage(idx);
            }} style={{
                marginTop: 8,
                marginHorizontal: 8,
                height: 27,
                paddingTop: 6,
                textAlign: 'center',
                fontSize: 15,
                color: idx == props.activeTab ? '#DD0000' : UGThemeColor_1.UGColor.TextColor1,
                borderRadius: 3,
            }}>
                {title}
              </react_native_elements_1.Text>
              <react_native_1.View style={{ marginTop: 7, height: idx == props.activeTab ? 1.5 : 0, backgroundColor: '#DD0000' }}/>
            </react_native_1.View>);
        })}
      </react_native_1.View>);
    }
    return (<react_native_1.View style={{ marginLeft: 5, flexDirection: 'row', height: props.hidden ? 0 : 45 }}>
      {titles.map(function (title, idx) {
        return (<react_native_elements_1.Text key={idx} onPress={function () {
            props.goToPage(idx);
        }} 
        // @ts-ignore 忽略style没有overflow属性错误，实际上可以设置生效
        style={{
            marginTop: 11,
            marginHorizontal: 2,
            paddingHorizontal: 5,
            height: 27,
            paddingTop: 6,
            backgroundColor: idx == props.activeTab ? UGSkinManagers_1.Skin1.themeColor : 'transparent',
            textAlign: 'center',
            fontSize: 15,
            color: idx == props.activeTab ? 'white' : UGSkinManagers_1.Skin1.bgTextColor,
            borderRadius: 3,
            overflow: 'hidden',
        }}>
            {title}
          </react_native_elements_1.Text>);
    })}
    </react_native_1.View>);
}
