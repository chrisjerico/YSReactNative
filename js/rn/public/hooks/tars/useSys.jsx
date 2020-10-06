"use strict";
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
var UGStore_1 = require("../../../redux/store/UGStore");
var Enum_1 = require("../../models/Enum");
var tars_1 = require("../../tools/tars");
var getOption = function (reg) {
    switch (reg) {
        case '0':
            return Enum_1.Necessity.隱藏;
        case '1':
            return Enum_1.Necessity.选填;
        case '2':
            return Enum_1.Necessity.必填;
        default:
            return Enum_1.Necessity.隱藏;
    }
};
var getPasswordStrength = function (pass_limit) {
    switch (pass_limit) {
        case '0':
            return Enum_1.PasswordStrength.不限制;
        case '1':
            return Enum_1.PasswordStrength.数字字母;
        case '2':
            return Enum_1.PasswordStrength.数字字母字符;
        default:
            return Enum_1.PasswordStrength.不限制;
    }
};
var useSys = function (_a) {
    var defaultUserCenterLogos = _a.defaultUserCenterLogos;
    var _b;
    var sysStore = UGStore_1.UGStore.globalProps.sys;
    var sys = __assign(__assign({}, sysStore), { showCoupon: (sysStore === null || sysStore === void 0 ? void 0 : sysStore.m_promote_pos) == '1' ? true : false, rankingListType: (sysStore === null || sysStore === void 0 ? void 0 : sysStore.rankingListSwitch) ?
            (sysStore === null || sysStore === void 0 ? void 0 : sysStore.rankingListSwitch) == 1
                ? Enum_1.RankingListType.中奖排行榜
                : Enum_1.RankingListType.投注排行榜 : Enum_1.RankingListType.不顯示, midBannerTimer: tars_1.stringToNumber(sysStore === null || sysStore === void 0 ? void 0 : sysStore.adSliderTimer), loginTo: tars_1.stringToNumber(sysStore === null || sysStore === void 0 ? void 0 : sysStore.login_to) ? Enum_1.LoginTo.首页 : Enum_1.LoginTo.我的页, showSign: sysStore.checkinSwitch == '1' ? true : false, necessity: {
            recommendGuy: getOption(sysStore === null || sysStore === void 0 ? void 0 : sysStore.hide_reco),
            name: getOption(sysStore === null || sysStore === void 0 ? void 0 : sysStore.reg_name),
            fundPassword: getOption(sysStore === null || sysStore === void 0 ? void 0 : sysStore.reg_fundpwd),
            qq: getOption(sysStore === null || sysStore === void 0 ? void 0 : sysStore.reg_qq),
            wx: getOption(sysStore === null || sysStore === void 0 ? void 0 : sysStore.reg_wx),
            phoneNumber: getOption(sysStore === null || sysStore === void 0 ? void 0 : sysStore.reg_phone),
            email: getOption(sysStore === null || sysStore === void 0 ? void 0 : sysStore.reg_email),
            agentButton: (sysStore === null || sysStore === void 0 ? void 0 : sysStore.agentRegbutton) == '1' ? Enum_1.Necessity.必填 : Enum_1.Necessity.隱藏,
            slideCode: (sysStore === null || sysStore === void 0 ? void 0 : sysStore.reg_vcode) == 2 ? Enum_1.Necessity.必填 : Enum_1.Necessity.隱藏,
            sms: (sysStore === null || sysStore === void 0 ? void 0 : sysStore.smsVerify) == '1' ? Enum_1.Necessity.必填 : Enum_1.Necessity.隱藏,
        }, userCenterItems: (_b = sysStore === null || sysStore === void 0 ? void 0 : sysStore.userCenter) === null || _b === void 0 ? void 0 : _b.map(function (item) {
            var _a;
            var _b = item !== null && item !== void 0 ? item : {}, code = _b.code, sorts = _b.sorts, logo = _b.logo;
            return Object.assign({}, item, {
                code: tars_1.stringToNumber(code),
                sorts: tars_1.stringToNumber(sorts),
                logo: (_a = ((logo === null || logo === void 0 ? void 0 : logo.length) == 0 || !logo
                    ? defaultUserCenterLogos === null || defaultUserCenterLogos === void 0 ? void 0 : defaultUserCenterLogos[tars_1.stringToNumber(code)] : logo)) !== null && _a !== void 0 ? _a : '',
            });
        }), passwordLimit: {
            strength: getPasswordStrength(sysStore === null || sysStore === void 0 ? void 0 : sysStore.pass_limit),
            maxLength: tars_1.stringToNumber(sysStore === null || sysStore === void 0 ? void 0 : sysStore.pass_length_max),
            minLength: tars_1.stringToNumber(sysStore === null || sysStore === void 0 ? void 0 : sysStore.pass_length_min),
        } });
    return {
        sys: sys,
    };
};
exports.default = useSys;
