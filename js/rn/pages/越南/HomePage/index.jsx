"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var useGetHomeInfo_1 = require("../../../public/hooks/useGetHomeInfo");
var hooks_1 = require("@react-native-community/hooks");
var PushHelper_1 = require("../../../public/define/PushHelper");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_native_elements_1 = require("react-native-elements");
var react_native_marquee_ab_1 = require("react-native-marquee-ab");
var react_native_autoheight_webview_1 = require("react-native-autoheight-webview");
var Header_1 = require("./Header");
var HomeConfig_1 = require("./HomeConfig");
var react_native_scrollable_tab_view_1 = require("react-native-scrollable-tab-view");
var GameContainer_1 = require("./GameContainer");
var HomeBase_1 = require("../../../public/components/HomeBase");
var Navigation_1 = require("../../../public/navigation/Navigation");
var usePopUpView_1 = require("../../../public/hooks/usePopUpView");
var AppDefine_1 = require("../../../public/define/AppDefine");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var RankList_1 = require("../../../public/widget/RankList");
var useSpriteImage_1 = require("../../../public/hooks/useSpriteImage");
var httpClient_1 = require("../../../public/network/httpClient");
var UGStore_1 = require("../../../redux/store/UGStore");
var PromotionsBlock_1 = require("../../../public/components/PromotionsBlock");
var Banner_1 = require("../../\u5C0A\u9F99/CP/Banner");
var VietnamHomePage = function () {
    var _a, _b, _c, _d, _e;
    var _f = useGetHomeInfo_1.default(), banner = _f.banner, notice = _f.notice, homeGames = _f.homeGames, couponListData = _f.couponListData, rankList = _f.rankList, redBag = _f.redBag, onlineSwitch = _f.onlineSwitch, onlineNum = _f.onlineNum, loading = _f.loading, onRefresh = _f.onRefresh, noticeFormat = _f.noticeFormat, originalNoticeString = _f.originalNoticeString;
    var _g = react_1.useState(false), show = _g[0], setShow = _g[1];
    var _h = react_1.useState(""), content = _h[0], setContent = _h[1];
    var _j = react_1.useState([]), navBarData = _j[0], setNavBarData = _j[1];
    var _k = react_1.useState(0), scollViewWidth = _k[0], setScrollViewWidth = _k[1];
    var _l = react_1.useState(0), currentPosition = _l[0], setCurrentPosition = _l[1];
    var _m = hooks_1.useDimensions().screen, width = _m.width, height = _m.height;
    var _o = react_1.useState(-1), selectId = _o[0], setSelectedId = _o[1];
    var onPopViewPress = usePopUpView_1.default().onPopViewPress;
    var webName = UGStore_1.UGStore.globalProps.sysConf.webName;
    var imageArray = useSpriteImage_1.default({
        source: "http://test24.6yc.com/views/mobileTemplate/24/images/icon_game_type.png",
        size: {
            width: 100, height: 100
        },
        offset: {
            width: 100, height: 100
        },
        rowNum: 5,
        columnNum: 2
    }).imageArray;
    react_1.useEffect(function () {
        if (imageArray.length > 0) {
            var temp = [];
            for (var index = 0; index < HomeConfig_1.NavBtn.length; index++) {
                console.log(HomeConfig_1.NavBtn[index]);
                temp.push({
                    title: HomeConfig_1.NavBtn[index].title,
                    image: imageArray[HomeConfig_1.NavBtn[index].imageIndex]
                });
            }
            setNavBarData(temp);
        }
    }, [imageArray]);
    var handleScroll = function (event) {
        setCurrentPosition((event.nativeEvent.contentOffset.x / scollViewWidth) * 150);
    };
    var onContentSizeChange = function (w, h) {
        setScrollViewWidth(w);
    };
    var _p = react_1.useState(0), tbxIndex = _p[0], setTbxIndex = _p[1];
    var _q = react_1.useState(0), scrollableTabViewHeight = _q[0], setScrollableTabViewHeight = _q[1];
    react_1.useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        console.log(homeGames);
        if (Array.isArray((_a = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _a === void 0 ? void 0 : _a.icons) && ((_b = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _b === void 0 ? void 0 : _b.icons.length) > 0 && tbxIndex < HomeConfig_1.navBarConfig.length) {
            var index = homeGames.data.icons.map(function (res) { return res.id; }).indexOf(HomeConfig_1.navBarConfig[tbxIndex].id);
            if (index != -1) {
                var dataLength = homeGames.data.icons[index].list.length;
                setScrollableTabViewHeight(dataLength * 105 + 30);
            }
            else {
                setScrollableTabViewHeight(100);
            }
        }
        else {
            setScrollableTabViewHeight(100);
        }
        (_h = ((_g = (_f = (_e = (_d = (_c = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _c === void 0 ? void 0 : _c.icons) === null || _d === void 0 ? void 0 : _d.filter(function (res) { var _a; return (res === null || res === void 0 ? void 0 : res.id) == ((_a = HomeConfig_1.navBarConfig === null || HomeConfig_1.navBarConfig === void 0 ? void 0 : HomeConfig_1.navBarConfig[tbxIndex]) === null || _a === void 0 ? void 0 : _a.id); })) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.list) === null || _g === void 0 ? void 0 : _g.length) * 105 + 30) !== null && _h !== void 0 ? _h : 100;
    }, [tbxIndex, homeGames]);
    return (<HomeBase_1.default loginPage={Navigation_1.PageName.VietnamLogin} needPadding={false} backgroundColor={'white'} header={<Header_1.default />} marginTop={46}>
      <react_native_1.View style={{ alignItems: 'center', }}>
        <Banner_1.default style={{ marginBottom: 5 }} size={{ width: width - 24, height: 0 }} onlineSwitch={onlineSwitch} bannerData={banner} onlineNum={onlineNum}/>
        <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingLeft: -5 }}>
          <react_native_elements_1.Icon name="ios-volume-high" type="ionicon" color="#646f95" size={24}/>
          <react_native_marquee_ab_1.MarqueeHorizontal textStyle={{ color: "white", fontSize: 13.2 }} bgContainerStyle={{ backgroundColor: 'white' }} width={width - 60} height={34} speed={40} onTextClick={function () {
        setShow(true);
        setContent(originalNoticeString);
        PushHelper_1.default.pushNoticePopUp(originalNoticeString);
    }} textList={noticeFormat}/>
        </react_native_1.View>
        <react_native_1.View style={{
        width: width - 24, marginBottom: 10, backgroundColor: 'white',
        alignSelf: 'center', borderRadius: 8, shadowColor: "#444",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingVertical: 10,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    }}>
          <react_native_1.FlatList keyExtractor={function (item, index) { return item.title + index; }} onContentSizeChange={onContentSizeChange} onScroll={handleScroll} showsHorizontalScrollIndicator={false} horizontal={true} data={navBarData} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        return (<react_native_1.TouchableWithoutFeedback onPress={function () {
            switch (index) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    RootNavigation_1.push(Navigation_1.PageName.VietnamGameList, { homeGames: homeGames, index: index });
                    break;
                // push(PageName)
                case 5:
                    RootNavigation_1.push(Navigation_1.PageName.JDPromotionListPage);
                    break;
                // PushHelper.pushCategory("70")
                default:
                    break;
            }
        }}>
                  <react_native_1.View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
                    <react_native_fast_image_1.default source={{ uri: item.image }} style={{ width: 50, height: 50, marginBottom: 5 }}/>
                    <react_native_1.Text numberOfLines={2} style={{ color: "#8a8d96", fontSize: 12, width: 50, textAlign: 'center' }}>{item === null || item === void 0 ? void 0 : item.title}</react_native_1.Text>
                  </react_native_1.View>
                </react_native_1.TouchableWithoutFeedback>);
    }}/>
          <react_native_1.View style={{ width: 50, height: 2, backgroundColor: "#d8d8d8", alignSelf: 'center', marginVertical: 10, overflow: "hidden" }}>
            <react_native_1.View style={{ width: 25, height: 2, backgroundColor: "#71abff", position: "absolute", left: currentPosition }}></react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>
        {((_b = (_a = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _a === void 0 ? void 0 : _a.icons) === null || _b === void 0 ? void 0 : _b.length) > 0 ? <react_native_1.View style={{
        width: width - 24,
        minHeight: 100, marginBottom: 10, backgroundColor: 'white',
        alignSelf: 'center', borderRadius: 8, shadowColor: "#444",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        paddingHorizontal: 5
    }}>
          {((_d = (_c = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _c === void 0 ? void 0 : _c.icons) === null || _d === void 0 ? void 0 : _d.length) > 0 ? <react_native_scrollable_tab_view_1.default onChangeTab={function (_a) {
        var i = _a.i;
        setTbxIndex(i);
    }} style={{
        borderBottomWidth: 0,
        height: scrollableTabViewHeight
    }} initialPage={0} tabBarUnderlineStyle={{ backgroundColor: "#71abff", height: 2, borderBottomWidth: 0 }} tabBarTextStyle={{ fontSize: 16, fontWeight: "bold", }} renderTabBar={function () { return <react_native_scrollable_tab_view_1.ScrollableTabBar tabsContainerStyle={{ width: width - 34, }} inactiveTextColor={'#8a8d96'} style={{
        height: 40, borderBottomWidth: 0.5,
        borderBottomColor: "#f2f2f2",
        width: "100%",
    }} tabs={[<react_native_1.Text></react_native_1.Text>]} 
    // renderTab={(name) => {
    //   return <Text>{name}</Text>
    // }}
    activeTextColor={"#71abff"}/>; }}>
            {HomeConfig_1.navBarConfig === null || HomeConfig_1.navBarConfig === void 0 ? void 0 : HomeConfig_1.navBarConfig.map(function (res) {
        return <GameContainer_1.default filter={res.id} homeGames={homeGames ? homeGames : []} tabLabel={res.title}/>;
    })}
          </react_native_scrollable_tab_view_1.default> : null}
        </react_native_1.View> : null}

      </react_native_1.View>
      {((_e = couponListData === null || couponListData === void 0 ? void 0 : couponListData.data) === null || _e === void 0 ? void 0 : _e.list.length) > 0 ? <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 12 }}>
        <react_native_1.View style={{ flexDirection: 'row' }}>
          <react_native_1.Image style={{ width: 13, height: 13, tintColor: 'black', marginRight: 5 }} source={{ uri: "礼品-(1)" }}/>
          <react_native_1.Text style={{ color: 'black', fontWeight: "bold" }}>优惠活动</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.JDPromotionListPage);
    }}>
          <react_native_1.Text style={{ color: 'black', fontWeight: "bold", }}>{"查看详情"}<react_native_1.Text> >></react_native_1.Text></react_native_1.Text>
        </react_native_1.TouchableWithoutFeedback>
      </react_native_1.View> : null}

      <PromotionsBlock_1.default />
      <RankList_1.default width={width - 24} ranks={rankList}/>
      <react_native_1.View style={{ height: 100 }}></react_native_1.View>
      <MarqueePopupView onPress={function () {
        setShow(false);
    }} content={content} show={show} onDismiss={function () {
        setShow(false);
    }}/>
      <react_native_1.View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <react_native_1.Text onPress={function () {
        console.log(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
        PushHelper_1.default.openWebView(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
    }} style={{ color: 'black', textAlign: 'center', marginRight: 20, marginBottom: 5 }}>💻电脑版</react_native_1.Text>
        <react_native_1.Text style={{ color: 'black', textAlign: 'center' }} onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.JDPromotionListPage);
    }}>🎁<react_native_1.Text>优惠活动</react_native_1.Text></react_native_1.Text>
      </react_native_1.View>
      <react_native_1.Text style={{ color: 'black', textAlign: 'center' }}>COPYRIGHT © {webName} RESERVED</react_native_1.Text>
      <react_native_1.View style={{ height: 100 }}></react_native_1.View>
    </HomeBase_1.default>);
};
var MarqueePopupView = function (_a) {
    var content = _a.content, show = _a.show, onPress = _a.onPress, onDismiss = _a.onDismiss;
    var _b = hooks_1.useDimensions().screen, width = _b.width, height = _b.height;
    if (show) {
        return (<react_native_1.View style={{ width: width, height: height, position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 1000, marginBottom: 10 }}>
        <react_native_1.View style={{ width: '90%', height: '75%', backgroundColor: 'white', borderRadius: 15 }}>
          <react_native_1.View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: "gray", borderBottomWidth: 0.5 }}>
            <react_native_1.Text style={{ fontSize: 16, fontWeight: "bold" }}>{"公告详情"}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={{ flex: 1, paddingHorizontal: 10 }}>
            <react_native_autoheight_webview_1.default style={{ width: width * 0.9 - 20 }} source={{ html: content }}></react_native_autoheight_webview_1.default>
          </react_native_1.View>
          <react_native_1.View style={{ height: 70, paddingBottom: 10, paddingHorizontal: 5, justifyContent: 'space-between', width: "100%", flexDirection: 'row' }}>
            <react_native_1.TouchableOpacity onPress={onDismiss} style={{
            justifyContent: 'center', alignItems: 'center',
            width: "47%", height: 50, backgroundColor: 'white',
            borderRadius: 5, borderColor: "gray", borderWidth: 0.5
        }}>
              <react_native_1.Text>{"取消"}</react_native_1.Text>
            </react_native_1.TouchableOpacity>
            <react_native_1.TouchableOpacity onPress={onPress} style={{
            justifyContent: 'center',
            alignItems: 'center', width: "47%", height: 50,
            backgroundColor: '#46A3FF', borderRadius: 5,
            borderColor: "gray", borderWidth: 0.5
        }}>
              <react_native_1.Text style={{ color: 'white' }}>{"确认"}</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
        </react_native_1.View>

      </react_native_1.View>);
    }
    else {
        return null;
    }
};
var FastImageAutoHeight = function (props) {
    var _a = react_1.useState(100), picHeight = _a[0], setPicHeight = _a[1];
    var _b = usePopUpView_1.default(), cardMargin = _b.cardMargin, marginHorizontal = _b.marginHorizontal;
    return (<react_native_fast_image_1.default {...props} style={[props.style, { height: picHeight }]} onLoad={function (e) {
        setPicHeight(((AppDefine_1.default.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height);
    }}/>);
};
exports.default = VietnamHomePage;
