"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var BackBtnComponent_1 = require("../../public/components/tars/BackBtnComponent");
var PickAvatarComponent_1 = require("../../public/components/tars/PickAvatarComponent");
var RefreshControlComponent_1 = require("../../public/components/tars/RefreshControlComponent");
var PushHelper_1 = require("../../public/define/PushHelper");
var useMinePage_1 = require("../../public/hooks/tars/useMinePage");
var Navigation_1 = require("../../public/navigation/Navigation");
var LHThemeColor_1 = require("../../public/theme/colors/LHThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var tars_1 = require("../../public/tools/tars");
var BottomGap_1 = require("../../public/views/tars/BottomGap");
var Button_1 = require("../../public/views/tars/Button");
var MineHeader_1 = require("../../public/views/tars/MineHeader");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var UserCenterItem_1 = require("../../public/views/tars/UserCenterItem");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var config_1 = require("./config");
var ProfileBlock_1 = require("./views/ProfileBlock");
var ProfileButton_1 = require("./views/ProfileButton");
var LHTMinePage = function () {
    var getHtml5Image = tars_1.useHtml5Image().getHtml5Image;
    var _a = useMinePage_1.default({
        homePage: Navigation_1.PageName.LHTHomePage,
        defaultUserCenterLogos: config_1.default.defaultUserCenterLogos,
    }), pickAvatarComponentRef = _a.pickAvatarComponentRef, onPressAvatar = _a.onPressAvatar, onSaveAvatarSuccess = _a.onSaveAvatarSuccess, value = _a.value, sign = _a.sign;
    var sysInfo = value.sysInfo;
    var balance = sysInfo.balance, userCenterItems = sysInfo.userCenterItems, curLevelGrade = sysInfo.curLevelGrade, usr = sysInfo.usr, isTest = sysInfo.isTest, avatar = sysInfo.avatar, unreadMsg = sysInfo.unreadMsg, showSign = sysInfo.showSign;
    var signOut = sign.signOut;
    return (<>
      <SafeAreaHeader_1.default headerColor={LHThemeColor_1.LHThemeColor.六合厅.themeColor}>
        <BackBtnComponent_1.default homePage={Navigation_1.PageName.LHTMinePage} renderHeader={function (props) { return (<MineHeader_1.default {...props} title={'会员中心'} onPressRightTitle={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服);
    }}/>); }}/>
      </SafeAreaHeader_1.default>
      <react_native_1.ScrollView style={styles.container} refreshControl={<RefreshControlComponent_1.default onRefresh={function () { }}/>} showsVerticalScrollIndicator={false}>
        <ProfileBlock_1.default showSignBadge={showSign} onPressAvatar={onPressAvatar} profileButtons={config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.profileButtons} name={usr} avatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar} level={curLevelGrade} balance={balance} onPressDaySign={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.每日签到);
    }} onPressTaskCenter={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.任务中心);
    }} renderProfileButton={function (item, index) {
        var title = item.title, logo = item.logo, userCenterType = item.userCenterType;
        return (<ProfileButton_1.default key={index} title={title} logo={logo} onPress={function () {
            PushHelper_1.default.pushUserCenterType(userCenterType);
        }}/>);
    }}/>
        {userCenterItems === null || userCenterItems === void 0 ? void 0 : userCenterItems.map(function (item, index) {
        var code = item.code, name = item.name, logo = item.logo;
        return (<UserCenterItem_1.default key={index} containerStyle={{
            aspectRatio: 490 / 56,
            width: '95%',
        }} titleStyle={{ fontSize: Scale_1.scale(20) }} title={name} logo={logo} unreadMsg={unreadMsg} showUnreadMsg={code == 9} onPress={function () { return PushHelper_1.default.pushUserCenterType(code); }}/>);
    })}
        <Button_1.default title={'退出登录'} containerStyle={styles.logOutButton} titleStyle={{ color: '#ffffff' }} onPress={signOut}/>
        <BottomGap_1.default />
      </react_native_1.ScrollView>
      <PickAvatarComponent_1.default ref={pickAvatarComponentRef} color={LHThemeColor_1.LHThemeColor.六合厅.themeColor} initAvatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar} onSaveAvatarSuccess={onSaveAvatarSuccess}/>
    </>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    logOutButton: {
        backgroundColor: '#ff6b1b',
        marginHorizontal: Scale_1.scale(25),
        marginVertical: Scale_1.scale(25),
        height: Scale_1.scale(70),
        borderRadius: Scale_1.scale(5),
    },
});
exports.default = LHTMinePage;
