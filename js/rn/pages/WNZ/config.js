"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PushHelper_1 = require("../../public/define/PushHelper");
var Enum_1 = require("../../public/models/Enum");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var tars_1 = require("../../public/tools/tars");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var getHtml5Image = tars_1.useHtml5Image('http://test20.6yc.com').getHtml5Image;
var config = {
    defaultUserCenterLogos: {
        1: getHtml5Image(23, 'chongzhi'),
        2: getHtml5Image(23, 'tixian'),
        3: getHtml5Image(23, 'center/bank'),
        4: getHtml5Image(23, 'center/yeb'),
        5: getHtml5Image(23, 'center/my_lottery'),
        6: getHtml5Image(23, 'center/cp'),
        7: getHtml5Image(23, 'center/chase'),
        8: getHtml5Image(23, 'center/transfer'),
        9: getHtml5Image(23, 'center/message'),
        10: getHtml5Image(23, 'center/person_summary'),
        11: getHtml5Image(23, 'center/my_redenvelope'),
        12: getHtml5Image(23, 'center/user_info'),
        13: getHtml5Image(7, 'zhmx'),
        14: tars_1.getIbbImage('DtPJymN/online-Service'),
        15: getHtml5Image(23, 'center/my_activity'),
        16: tars_1.getIbbImage('TkNkFK8/changlong'),
        17: getHtml5Image(23, 'center/rule'),
        18: getHtml5Image(null, 'kj_trend'),
        19: tars_1.getIbbImage('FBLBM0C/qq-Service'),
        20: tars_1.getIbbImage('4gLtWb1/kjw'),
    },
    navColors: ['#edb93f', '#77674d', '#e62e25', '#52b653', '#007aff'],
    menus: [
        {
            title: '会员中心',
            onPress: function () { PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.我的页); },
        },
        {
            title: '额度转换',
            onPress: function () { PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.额度转换); },
        },
        {
            title: '幸运棋牌',
            onPress: function () { PushHelper_1.default.pushHomeGame({ seriesId: Enum_1.SeriesId.棋牌, gameId: 51, subId: 51 }); },
        },
        {
            title: '彩票游戏',
            onPress: function () { PushHelper_1.default.pushLotteryLobby(); },
        },
        {
            title: 'AG视讯',
            onPress: function () { PushHelper_1.default.pushHomeGame({ "gameId": 59, "seriesId": Enum_1.SeriesId.真人, "subId": 59, }); },
        },
        {
            title: '真人视讯',
            onPress: function () {
                RootNavigation_1.navigate(Navigation_1.PageName.WNZGameLobbyPage, { title: '真人视讯' });
            },
        },
        {
            title: '电子游艺',
            onPress: function () {
                RootNavigation_1.navigate(Navigation_1.PageName.WNZGameLobbyPage, { title: '电子游艺' });
            },
        },
        {
            title: '捕鱼达人',
            onPress: function () {
                RootNavigation_1.navigate(Navigation_1.PageName.WNZGameLobbyPage, { title: '捕鱼达人' });
            },
        },
        {
            title: '体育游戏',
            onPress: function () {
                RootNavigation_1.navigate(Navigation_1.PageName.WNZGameLobbyPage, { title: '体育游戏' });
            },
        },
        {
            title: '棋牌游戏',
            onPress: function () {
                RootNavigation_1.navigate(Navigation_1.PageName.WNZGameLobbyPage, { title: '棋牌游戏' });
            },
        },
        {
            title: '更多彩种',
            onPress: function () { PushHelper_1.default.pushLotteryLobby(); },
        },
        {
            title: '投注记录',
            onPress: function () { PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.彩票注单记录); },
        },
        {
            title: '开奖结果',
            onPress: function () { PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.开奖网); },
        },
        {
            title: '长龙排行',
            onPress: function () { PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.长龙助手); },
        },
    ],
    menuSignIn: [
        {
            title: '登录/注册',
            onPress: function () { return RootNavigation_1.push(Navigation_1.PageName.WNZSignInPage); },
        },
    ],
    menuSignOut: [
        {
            title: '安全退出',
            onPress: function () { },
        },
    ],
};
exports.default = config;
