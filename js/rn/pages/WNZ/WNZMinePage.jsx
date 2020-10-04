"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var PushHelper_1 = require("../../public/define/PushHelper");
var useMinePage_1 = require("../../public/hooks/tars/useMinePage");
var WNZThemeColor_1 = require("../../public/theme/colors/WNZThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var tars_1 = require("../../public/tools/tars");
var GameButton_1 = require("../../public/views/tars/GameButton");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var UGLotteryModel_1 = require("../../redux/model/\u5168\u5C40/UGLotteryModel");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var MenuModalComponent_1 = require("./components/MenuModalComponent");
var MineHeaderComponent_1 = require("./components/MineHeaderComponent");
var config_1 = require("./config");
var ButtonGroup_1 = require("./views/ButtonGroup");
var Menu_1 = require("./views/Menu");
var ProfileBlock_1 = require("./views/ProfileBlock");
var ToolBlock_1 = require("./views/ToolBlock");
var getHtml5Image = tars_1.useHtml5Image('http://test05.6yc.com/').getHtml5Image;
var WNZMinePage = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var menu = react_1.useRef(null);
    var _l = useMinePage_1.default({
        defaultUserCenterLogos: config_1.default.defaultUserCenterLogos,
    }), value = _l.value, sign = _l.sign;
    var uid = value.uid, usr = value.usr, mobile_logo = value.mobile_logo, curLevelInt = value.curLevelInt, nextLevelInt = value.nextLevelInt, taskRewardTotal = value.taskRewardTotal, curLevelTitle = value.curLevelTitle, nextLevelTitle = value.nextLevelTitle, userCenterItems = value.userCenterItems, unreadMsg = value.unreadMsg, balance = value.balance;
    var signOut = sign.signOut;
    // data handle
    var tools = (_a = userCenterItems === null || userCenterItems === void 0 ? void 0 : userCenterItems.sort(function (a, b) { return (a === null || a === void 0 ? void 0 : a.sorts) - (b === null || b === void 0 ? void 0 : b.sorts); })) !== null && _a !== void 0 ? _a : [];
    var headrTools = (_b = tools === null || tools === void 0 ? void 0 : tools.slice(0, 2)) !== null && _b !== void 0 ? _b : [];
    var otherTools = (_d = tools === null || tools === void 0 ? void 0 : tools.slice(2, (_c = tools === null || tools === void 0 ? void 0 : tools.length) !== null && _c !== void 0 ? _c : 2)) !== null && _d !== void 0 ? _d : [];
    var usuallyTools = otherTools === null || otherTools === void 0 ? void 0 : otherTools.filter(function (ele) {
        return [UGSysConfModel_1.UGUserCenterType.额度转换, UGSysConfModel_1.UGUserCenterType.全民竞猜, UGSysConfModel_1.UGUserCenterType.利息宝, UGSysConfModel_1.UGUserCenterType.开奖走势, UGSysConfModel_1.UGUserCenterType.建议反馈, UGSysConfModel_1.UGUserCenterType.存款, UGSysConfModel_1.UGUserCenterType.取款].includes(ele === null || ele === void 0 ? void 0 : ele.code);
    });
    var userTools = otherTools === null || otherTools === void 0 ? void 0 : otherTools.filter(function (ele) {
        return [
            UGSysConfModel_1.UGUserCenterType.个人信息,
            UGSysConfModel_1.UGUserCenterType.安全中心,
            UGSysConfModel_1.UGUserCenterType.银行卡管理,
            UGSysConfModel_1.UGUserCenterType.资金明细,
            UGSysConfModel_1.UGUserCenterType.站内信,
            UGSysConfModel_1.UGUserCenterType.聊天室,
            UGSysConfModel_1.UGUserCenterType.在线客服,
            UGSysConfModel_1.UGUserCenterType.QQ客服,
        ].includes(ele === null || ele === void 0 ? void 0 : ele.code);
    });
    var recordTools = otherTools === null || otherTools === void 0 ? void 0 : otherTools.filter(function (ele) {
        return [UGSysConfModel_1.UGUserCenterType.开奖网, UGSysConfModel_1.UGUserCenterType.其他注单记录, UGSysConfModel_1.UGUserCenterType.活动彩金, UGSysConfModel_1.UGUserCenterType.彩票注单记录, UGSysConfModel_1.UGUserCenterType.长龙助手].includes(ele === null || ele === void 0 ? void 0 : ele.code);
    });
    var activityTools = otherTools === null || otherTools === void 0 ? void 0 : otherTools.filter(function (ele) { return [UGSysConfModel_1.UGUserCenterType.任务中心, UGSysConfModel_1.UGUserCenterType.游戏大厅, UGSysConfModel_1.UGUserCenterType.推荐收益].includes(ele === null || ele === void 0 ? void 0 : ele.code); });
    return (<>
      <SafeAreaHeader_1.default headerColor={WNZThemeColor_1.WNZThemeColor.威尼斯.themeColor}>
        <MineHeaderComponent_1.default uid={uid} name={usr} logo={mobile_logo} balance={balance} onPressMenu={function () {
        var _a;
        (_a = menu === null || menu === void 0 ? void 0 : menu.current) === null || _a === void 0 ? void 0 : _a.open();
    }} onPressComment={function () {
        PushHelper_1.default.pushLottery(UGLotteryModel_1.LotteryType.香港六合彩);
    }} onPressUser={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.我的页);
    }}/>
      </SafeAreaHeader_1.default>
      <react_native_1.ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ProfileBlock_1.default curLevelInt={curLevelInt} nextLevelInt={nextLevelInt} taskRewardTotal={taskRewardTotal} curLevelTitle={curLevelTitle} nextLevelTitle={nextLevelTitle} backgroundImage={getHtml5Image(23, 'userBg')} signImage={getHtml5Image(23, 'qiaodao')} onPressSign={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.每日签到);
    }}/>
        <ButtonGroup_1.default leftLogo={(_e = headrTools[0]) === null || _e === void 0 ? void 0 : _e.logo} rightLogo={(_f = headrTools[1]) === null || _f === void 0 ? void 0 : _f.logo} leftTitle={(_g = headrTools[0]) === null || _g === void 0 ? void 0 : _g.name} rightTitle={(_h = headrTools[1]) === null || _h === void 0 ? void 0 : _h.name} onPressLeftButton={function () { var _a; return PushHelper_1.default.pushUserCenterType((_a = headrTools[0]) === null || _a === void 0 ? void 0 : _a.code); }} onPressRightButton={function () { var _a; return PushHelper_1.default.pushUserCenterType((_a = headrTools[1]) === null || _a === void 0 ? void 0 : _a.code); }}/>
        {[
        {
            title: '常用工具',
            tools: usuallyTools,
        },
        {
            title: '个人信息',
            tools: userTools,
        },
        {
            title: '投注记录',
            tools: recordTools,
        },
        {
            title: '优惠活动',
            tools: activityTools,
        },
    ].map(function (item, index) {
        var title = item.title, tools = item.tools;
        return (<ToolBlock_1.default key={index} title={title} tools={tools} contentContainer={{
            marginBottom: index == 3 ? Scale_1.scaleHeight(70) : 0,
        }} renderTool={function (item, index) {
            var code = item.code, name = item.name, logo = item.logo;
            return (<GameButton_1.default key={index} logo={logo} title={name} showUnReadMsg={code == 9 && unreadMsg != 0} unreadMsg={unreadMsg} containerStyle={{ width: '25%', marginTop: Scale_1.scale(20) }} imageContainerStyle={{ width: '30%' }} titleContainerStyle={{ aspectRatio: 3 }} enableCircle={false} onPress={function () { return PushHelper_1.default.pushUserCenterType(code); }}/>);
        }}/>);
    })}
      </react_native_1.ScrollView>
      <MenuModalComponent_1.default ref={menu} menus={uid
        ? (_j = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.menus) === null || _j === void 0 ? void 0 : _j.concat(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.menuSignOut) : // @ts-ignore
     (_k = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.menuSignIn) === null || _k === void 0 ? void 0 : _k.concat(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.menus)} renderMenu={function (_a) {
        var item = _a.item;
        var title = item.title, onPress = item.onPress;
        return (<Menu_1.default color={WNZThemeColor_1.WNZThemeColor.威尼斯.themeColor} title={title} onPress={function () {
            var _a;
            if (title == '安全退出') {
                signOut();
            }
            else {
                (_a = menu === null || menu === void 0 ? void 0 : menu.current) === null || _a === void 0 ? void 0 : _a.close();
                onPress && onPress();
            }
        }}/>);
    }}/>
    </>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
    },
});
exports.default = WNZMinePage;
