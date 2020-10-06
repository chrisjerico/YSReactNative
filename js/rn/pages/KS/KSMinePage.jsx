"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var BackBtnComponent_1 = require("../../public/components/tars/BackBtnComponent");
var ReLoadBalanceComponent_1 = require("../../public/components/tars/ReLoadBalanceComponent");
var PushHelper_1 = require("../../public/define/PushHelper");
var useMinePage_1 = require("../../public/hooks/tars/useMinePage");
var Navigation_1 = require("../../public/navigation/Navigation");
var Scale_1 = require("../../public/tools/Scale");
var tars_1 = require("../../public/tools/tars");
var BottomGap_1 = require("../../public/views/tars/BottomGap");
var Button_1 = require("../../public/views/tars/Button");
var GameButton_1 = require("../../public/views/tars/GameButton");
var LinearBadge_1 = require("../../public/views/tars/LinearBadge");
var List_1 = require("../../public/views/tars/List");
var MineHeader_1 = require("../../public/views/tars/MineHeader");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var config_1 = require("./config");
var KSMinePage = function () {
    var _a, _b;
    var getHtml5Image = tars_1.useHtml5Image().getHtml5Image;
    var _c = useMinePage_1.default({
        homePage: Navigation_1.PageName.KSHomePage,
        defaultUserCenterLogos: config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.defaultUserCenterLogos,
    }), value = _c.value, sign = _c.sign;
    var sysInfo = value.sysInfo;
    var balance = sysInfo.balance, userCenterItems = sysInfo.userCenterItems, curLevelGrade = sysInfo.curLevelGrade, usr = sysInfo.usr, unreadMsg = sysInfo.unreadMsg;
    var signOut = sign.signOut;
    // data handle
    var topUserCenterItems = (_a = userCenterItems === null || userCenterItems === void 0 ? void 0 : userCenterItems.slice(0, 3)) !== null && _a !== void 0 ? _a : [];
    var listUserCenterItems = (_b = userCenterItems === null || userCenterItems === void 0 ? void 0 : userCenterItems.slice(3, userCenterItems === null || userCenterItems === void 0 ? void 0 : userCenterItems.length)) !== null && _b !== void 0 ? _b : [];
    var badges = [
        {
            title: '实名认证',
            logo: getHtml5Image(22, 'smrz'),
            code: UGSysConfModel_1.UGUserCenterType.个人信息,
        },
        {
            title: '帐户安全',
            logo: getHtml5Image(22, 'qkzh'),
            code: UGSysConfModel_1.UGUserCenterType.安全中心,
        },
        {
            title: '取款帐户',
            logo: getHtml5Image(22, 'qkzh'),
            code: UGSysConfModel_1.UGUserCenterType.存款纪录,
        },
    ];
    return (<>
      <SafeAreaHeader_1.default headerColor={'#000000'}>
        <BackBtnComponent_1.default homePage={Navigation_1.PageName.KSHomePage} renderHeader={function (props) { return <MineHeader_1.default {...props} title={'会员中心'} showRightTitle={false}/>; }}/>
      </SafeAreaHeader_1.default>
      <react_native_1.ScrollView showsVerticalScrollIndicator={false} style={{
        backgroundColor: '#000000',
        paddingHorizontal: Scale_1.scale(20),
    }}>
        <react_native_linear_gradient_1.default colors={['#eb5d4d', '#fb2464']} style={{ borderRadius: Scale_1.scale(10), width: '100%', aspectRatio: 2, paddingHorizontal: Scale_1.scale(20) }}>
          <react_native_1.View style={{ flex: 1, justifyContent: 'center' }}>
            <react_native_1.Text style={{ color: '#ffffff', fontSize: Scale_1.scale(30) }}>{usr}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={{ flex: 1, flexDirection: 'row' }}>
            <react_native_1.View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <react_native_fast_image_1.default source={{ uri: getHtml5Image(22, 'touxiang') }} style={{ height: '50%', aspectRatio: 1 }}/>
              <react_native_1.Text style={{ color: '#ffffff', marginLeft: Scale_1.scale(20), fontSize: Scale_1.scale(25) }}>{curLevelGrade}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={{ flex: 1, alignItems: 'flex-end' }}>
              <react_native_1.TouchableWithoutFeedback onPress={function () { return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.任务中心); }}>
                <react_native_fast_image_1.default source={{ uri: tars_1.getIbbImage('dkQCr80/task') }} style={{ height: '50%', aspectRatio: 3 }} resizeMode={'contain'}/>
              </react_native_1.TouchableWithoutFeedback>
              <react_native_1.TouchableWithoutFeedback onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.每日签到);
    }}>
                <react_native_fast_image_1.default source={{ uri: tars_1.getIbbImage('R4c4wv6/signup') }} style={{ height: '50%', aspectRatio: 3 }} resizeMode={'contain'}/>
              </react_native_1.TouchableWithoutFeedback>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {badges === null || badges === void 0 ? void 0 : badges.map(function (item, index) {
        var title = item.title, logo = item.logo, code = item.code;
        return (<LinearBadge_1.default key={index} colors={['transparent', 'transparent']} title={title} containerStyle={{ borderRadius: 0 }} showIcon={false} logo={logo} showLogo={true} onPress={function () {
            PushHelper_1.default.pushUserCenterType(code);
        }}/>);
    })}
          </react_native_1.View>
        </react_native_linear_gradient_1.default>
        <react_native_1.View style={{ width: '100%', aspectRatio: 6, justifyContent: 'center', paddingLeft: Scale_1.scale(20) }}>
          <react_native_1.Text style={{ color: '#ffffff', fontSize: Scale_1.scale(22), fontWeight: '500' }}>{'总资产'}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={{ width: '100%', aspectRatio: 6, paddingLeft: Scale_1.scale(20) }}>
          <ReLoadBalanceComponent_1.default title={'¥ '} titleStyle={{ color: '#ffffff', fontSize: Scale_1.scale(30), fontWeight: '500' }} balance={balance} balanceStyle={{ color: '#ffffff', fontSize: Scale_1.scale(30), fontWeight: '500' }} color={'#ffffff'} size={30}/>
        </react_native_1.View>
        <react_native_1.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {topUserCenterItems.map(function (item, index) {
        var logo = item.logo, name = item.name, code = item.code;
        return (<LinearBadge_1.default key={index} colors={index ? ['#3a3a41', '#3a3a41'] : ['#eb5d4d', '#fb7a24']} containerStyle={{ width: '31%', aspectRatio: 2, borderRadius: Scale_1.scale(10), alignItems: 'center', height: null }} title={name} textStyle={{ color: '#ffffff', fontSize: Scale_1.scale(20), maxWidth: '60%' }} showIcon={false} showLogo={true} logo={logo} onPress={function () {
            PushHelper_1.default.pushUserCenterType(code);
        }}/>);
    })}
        </react_native_1.View>
        <List_1.default uniqueKey={'KSMinePage'} numColumns={3} style={{ backgroundColor: '#3a3a41', marginTop: Scale_1.scale(10), borderRadius: Scale_1.scale(10), paddingTop: Scale_1.scale(5) }} data={listUserCenterItems} renderItem={function (_a) {
        var item = _a.item;
        var name = item.name, logo = item.logo, code = item.code;
        return (<GameButton_1.default title={name} logo={logo} enableCircle={false} titleStyle={{ color: '#ffffff' }} containerStyle={{ width: '33%', marginBottom: Scale_1.scale(40), marginTop: Scale_1.scale(30) }} imageContainerStyle={{ width: '50%' }} titleContainerStyle={{ aspectRatio: 5 }} unreadMsg={unreadMsg || 0} showUnReadMsg={code == 9} showSubTitle={false} onPress={function () {
            PushHelper_1.default.pushUserCenterType(code);
        }}/>);
    }}/>
        <Button_1.default title={'退出登录'} titleStyle={{ color: '#ffffff', fontSize: Scale_1.scale(23) }} containerStyle={{ width: '100%', aspectRatio: 7, backgroundColor: '#3a3a41', marginTop: Scale_1.scale(10), borderRadius: Scale_1.scale(5), marginBottom: Scale_1.scale(20) }} onPress={signOut}/>
        <BottomGap_1.default />
      </react_native_1.ScrollView>
    </>);
};
exports.default = KSMinePage;
