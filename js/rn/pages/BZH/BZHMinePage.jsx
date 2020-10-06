"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var MineHeaderComponent_1 = require("../../public/components/tars/MineHeaderComponent");
var PickAvatarComponent_1 = require("../../public/components/tars/PickAvatarComponent");
var PushHelper_1 = require("../../public/define/PushHelper");
var useMinePage_1 = require("../../public/hooks/tars/useMinePage");
var Navigation_1 = require("../../public/navigation/Navigation");
var BZHThemeColor_1 = require("../../public/theme/colors/BZHThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var tars_1 = require("../../public/tools/tars");
var UgLog_1 = require("../../public/tools/UgLog");
var BottomGap_1 = require("../../public/views/tars/BottomGap");
var Button_1 = require("../../public/views/tars/Button");
var GameButton_1 = require("../../public/views/tars/GameButton");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var UserCenterItem_1 = require("../../public/views/tars/UserCenterItem");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var config_1 = require("./config");
var ProfileBlock_1 = require("./views/ProfileBlock");
var BZHMinePage = function () {
    var _a, _b;
    var getHtml5Image = tars_1.useHtml5Image().getHtml5Image;
    var _c = useMinePage_1.default({
        homePage: Navigation_1.PageName.BZHHomePage,
        defaultUserCenterLogos: config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.defaultUserCenterLogos,
    }), pickAvatarComponentRef = _c.pickAvatarComponentRef, onPressAvatar = _c.onPressAvatar, onSaveAvatarSuccess = _c.onSaveAvatarSuccess, value = _c.value, sign = _c.sign;
    var balance = value.balance, userCenterItems = value.userCenterItems, curLevelGrade = value.curLevelGrade, usr = value.usr, isTest = value.isTest, avatar = value.avatar, unreadMsg = value.unreadMsg;
    var signOut = sign.signOut;
    // data handle
    var profileUserCenterItems = (_a = userCenterItems === null || userCenterItems === void 0 ? void 0 : userCenterItems.slice(0, 4)) !== null && _a !== void 0 ? _a : [];
    var listUserCenterItems = (_b = userCenterItems === null || userCenterItems === void 0 ? void 0 : userCenterItems.slice(4, userCenterItems === null || userCenterItems === void 0 ? void 0 : userCenterItems.length)) !== null && _b !== void 0 ? _b : [];
    return (<>
      <SafeAreaHeader_1.default headerColor={BZHThemeColor_1.BZHThemeColor.宝石红.themeColor}>
        <MineHeaderComponent_1.default title={'会员中心'} showRightTitle={false} onPressRightTitle={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服);
    }}/>
      </SafeAreaHeader_1.default>
      <react_native_1.ScrollView showsVerticalScrollIndicator={false} style={{
        backgroundColor: BZHThemeColor_1.BZHThemeColor.宝石红.homeContentSubColor,
    }}>
        <ProfileBlock_1.default balance={balance} onPressAvatar={onPressAvatar} level={curLevelGrade} avatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar} name={usr} features={profileUserCenterItems} renderFeature={function (item, index) {
        var logo = item.logo, name = item.name, code = item.code;
        UgLog_1.ugLog('features item=', item);
        return (<GameButton_1.default key={index} showSecondLevelIcon={false} containerStyle={{ width: '25%' }} imageContainerStyle={{ width: '50%' }} titleContainerStyle={{ aspectRatio: 3.5 }} titleStyle={{ fontSize: Scale_1.scale(22), fontWeight: '300' }} enableCircle={false} logo={logo} title={name} onPress={function () { return PushHelper_1.default.pushUserCenterType(code); }}/>);
    }}/>
        {listUserCenterItems === null || listUserCenterItems === void 0 ? void 0 : listUserCenterItems.map(function (item, index) {
        var code = item.code, name = item.name, logo = item.logo;
        return (<UserCenterItem_1.default key={index} containerStyle={{
            backgroundColor: '#ffffff',
            aspectRatio: 490 / 68,
        }} arrowColor={'#d82e2f'} titleStyle={{ fontSize: Scale_1.scale(22) }} title={name} logo={logo} unreadMsg={unreadMsg || 0} showUnreadMsg={code == 9} onPress={function () {
            PushHelper_1.default.pushUserCenterType(code);
        }}/>);
    })}
        <Button_1.default title={'退出登录'} containerStyle={{
        backgroundColor: '#ffffff',
        marginHorizontal: Scale_1.scale(25),
        marginVertical: Scale_1.scale(15),
        borderRadius: Scale_1.scale(7),
        height: Scale_1.scale(70),
    }} titleStyle={{ color: '#db6372', fontSize: Scale_1.scale(21) }} onPress={signOut}/>
        <BottomGap_1.default />
      </react_native_1.ScrollView>
      <PickAvatarComponent_1.default ref={pickAvatarComponentRef} color={BZHThemeColor_1.BZHThemeColor.宝石红.themeColor} initAvatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar} onSaveAvatarSuccess={onSaveAvatarSuccess}/>
    </>);
};
exports.default = BZHMinePage;
