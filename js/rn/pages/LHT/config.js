"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tars_1 = require("../../public/tools/tars");
var UGLotteryModel_1 = require("../../redux/model/\u5168\u5C40/UGLotteryModel");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var getHtml5Image = tars_1.useHtml5Image('http://test05.6yc.com/').getHtml5Image;
var config = {
    defaultUserCenterLogos: {
        1: tars_1.getIbbImage('jDD8DNd/sm-3x'),
        2: tars_1.getIbbImage('m41tMyT/tm-3x'),
        3: getHtml5Image(3, 'center/bank'),
        4: getHtml5Image(3, 'syb3'),
        5: getHtml5Image(null, 'lhc/menu-myreco'),
        6: getHtml5Image(3, 'center/menu-rule-1'),
        7: getHtml5Image(3, 'center/menu-rule'),
        8: getHtml5Image(3, 'center/menu-transfer'),
        9: getHtml5Image(3, 'center/menu-notice'),
        10: getHtml5Image(3, 'center/menu-password'),
        11: getHtml5Image(3, 'center/task'),
        12: getHtml5Image(3, 'center/userInf'),
        13: getHtml5Image(3, 'center/menu-feedback'),
        14: tars_1.getIbbImage('HFwjMyQ/cs-3x'),
        15: tars_1.getIbbImage('8Pt1HqR/am-3x'),
        16: tars_1.getIbbImage('2MnqFQg/zl-3x'),
        17: getHtml5Image(3, 'center/menu-activity'),
        18: getHtml5Image(null, 'kj_trend'),
        19: tars_1.getIbbImage('YLt56JH/qq-3x'),
        20: tars_1.getIbbImage('Gv1DfJ4/aw-3x'),
    },
    preferences: [
        {
            gameId: UGLotteryModel_1.LotteryType.重庆时时彩,
            title: '重庆时时彩',
            selected: false,
            logo: 'cqssc',
            gameType: 'cqssc',
            des: '全天59期',
        },
        {
            gameId: UGLotteryModel_1.LotteryType.七星彩,
            title: '七星彩',
            selected: false,
            logo: 'qxc',
            gameType: 'qxc',
            des: '全天59期',
        },
        {
            gameId: UGLotteryModel_1.LotteryType.PK10牛牛,
            title: 'PK10牛牛',
            selected: false,
            logo: 'pk10nn',
            gameType: 'pk10nn',
            des: '全天59期',
        },
        {
            gameId: UGLotteryModel_1.LotteryType.福彩3D,
            title: '福彩3D',
            selected: true,
            logo: 'fc3d',
            gameType: 'fc3d',
            des: '全天59期',
        },
        {
            gameId: UGLotteryModel_1.LotteryType.大乐透,
            title: '大乐透',
            selected: true,
            logo: 'dlt',
            gameType: 'dlt',
            des: '全天59期',
        },
        {
            gameId: UGLotteryModel_1.LotteryType.幸运飞艇,
            title: '幸运飞艇',
            selected: false,
            logo: 'xyft',
            gameType: 'xyft',
            des: '全天180期',
        },
        {
            gameId: UGLotteryModel_1.LotteryType['北京赛车(PK10)'],
            title: '北京赛车(PK10)',
            selected: true,
            logo: 'bjpk10',
            gameType: 'pk10',
            des: '全天44期',
        },
        {
            gameId: UGLotteryModel_1.LotteryType.pc蛋蛋,
            title: 'pc蛋蛋',
            selected: true,
            logo: 'pcdd',
            gameType: 'pcdd',
            des: '全天179期',
        },
        {
            gameId: UGLotteryModel_1.LotteryType.香港六合彩,
            title: '香港六合彩',
            selected: true,
            logo: 'lhc',
            gameType: 'lhc',
            des: '一周开三期',
        },
        {
            gameId: null,
            title: '长龙资讯',
            selected: true,
            logo: 'clzx',
            gameType: 'clzx',
            des: '长龙助手',
        },
        {
            gameId: null,
            title: '开奖网',
            selected: true,
            logo: 'lmzs',
            gameType: 'lmzs',
            des: '开奖网',
        },
        {
            gameId: null,
            title: '红包',
            selected: true,
            logo: 'hongbao',
            gameType: 'hongbao',
            des: '抢红包',
        },
    ],
    bottomTools: [
        {
            logo: getHtml5Image(14, 'lxkf'),
            userCenterType: UGSysConfModel_1.UGUserCenterType.在线客服,
        },
        {
            logo: getHtml5Image(14, 'lts'),
            userCenterType: UGSysConfModel_1.UGUserCenterType.聊天室,
        },
        {
            logo: getHtml5Image(14, 'appDownload'),
        },
    ],
    moreLottery: [
        {
            gameId: null,
            gameType: 'more',
            title: '更多彩种',
            des: '好挣好玩',
            logo: 'gdcz',
            selected: true,
        },
    ],
    profileButtons: [
        {
            title: '我要充值',
            logo: getHtml5Image(14, 'cz'),
            userCenterType: UGSysConfModel_1.UGUserCenterType.存款,
        },
        {
            title: '马上提现',
            logo: getHtml5Image(14, 'tx'),
            userCenterType: UGSysConfModel_1.UGUserCenterType.取款,
        },
        {
            title: '资金明细',
            logo: getHtml5Image(14, 'zjmx'),
            userCenterType: UGSysConfModel_1.UGUserCenterType.资金明细,
        },
    ],
};
exports.default = config;
