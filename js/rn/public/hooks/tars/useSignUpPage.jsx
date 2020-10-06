"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Enum_1 = require("../../models/Enum");
var RootNavigation_1 = require("../../navigation/RootNavigation");
var tars_1 = require("../../tools/tars");
var UGLoadingCP_1 = require("../../widget/UGLoadingCP");
var useRegister_1 = require("./useRegister");
var useSys_1 = require("./useSys");
var useTryPlay_1 = require("./useTryPlay");
var useSignUpPage = function (_a) {
    var homePage = _a.homePage, signInPage = _a.signInPage;
    // states
    var _b = react_1.useState(null), recommendGuy = _b[0], setRecommendGuy = _b[1];
    var _c = react_1.useState(null), account = _c[0], setAccount = _c[1];
    var _d = react_1.useState(null), password = _d[0], setPassword = _d[1];
    var _e = react_1.useState(null), confirmPassword = _e[0], setConfirmPassword = _e[1];
    var _f = react_1.useState(null), name = _f[0], setName = _f[1];
    var _g = react_1.useState(null), fundPassword = _g[0], setFundPassword = _g[1];
    var _h = react_1.useState(null), qq = _h[0], setQQ = _h[1];
    var _j = react_1.useState(null), weChat = _j[0], setWeChat = _j[1];
    var _k = react_1.useState(null), phoneNumber = _k[0], setPhoneNumber = _k[1];
    var _l = react_1.useState({
        nc_csessionid: undefined,
        nc_token: undefined,
        nc_sig: undefined,
    }), slideCode = _l[0], setSlideCode = _l[1];
    var _m = react_1.useState(null), email = _m[0], setEmail = _m[1];
    var _o = react_1.useState(null), sms = _o[0], setSms = _o[1];
    // refs
    var slideCodeRef = react_1.useRef(null);
    var agentRef = react_1.useRef(null);
    var navigateToHomePage = function () {
        homePage && RootNavigation_1.navigate(homePage, {});
    };
    var navigateToSignInPage = function () {
        signInPage && RootNavigation_1.navigate(signInPage, {});
    };
    var tryPlay = useTryPlay_1.default({
        onStart: function () {
            UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading });
        },
        onSuccess: function () {
            UGLoadingCP_1.hideLoading();
            navigateToHomePage();
            tars_1.ToastSuccess('登录成功');
        },
        onError: function (error) {
            UGLoadingCP_1.hideLoading();
            tars_1.ToastError(error !== null && error !== void 0 ? error : '登录失败');
            console.log("--------試玩失败--------", error);
        },
    }).tryPlay;
    var register = useRegister_1.default({
        onStart: function () {
            UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading });
        },
        onSuccessWithAutoLogin: function () {
            UGLoadingCP_1.hideLoading();
            navigateToHomePage();
        },
        onSuccess: function () {
            UGLoadingCP_1.hideLoading();
            tars_1.ToastSuccess('注册成功');
            navigateToHomePage();
        },
        onError: function (error) {
            var _a;
            UGLoadingCP_1.hideLoading();
            setSlideCode({
                nc_csessionid: undefined,
                nc_token: undefined,
                nc_sig: undefined,
            });
            (_a = slideCodeRef === null || slideCodeRef === void 0 ? void 0 : slideCodeRef.current) === null || _a === void 0 ? void 0 : _a.reload();
            tars_1.ToastError(error !== null && error !== void 0 ? error : '注册失败');
            console.log('-------注册失败-------', error);
        },
    }).register;
    // stores
    var sys = useSys_1.default({}).sys;
    // data handle
    var necessity = sys.necessity, passwordLimit = sys.passwordLimit;
    var strength = passwordLimit.strength, maxLength = passwordLimit.maxLength, minLength = passwordLimit.minLength;
    var nc_csessionid = slideCode.nc_csessionid, nc_token = slideCode.nc_token, nc_sig = slideCode.nc_sig;
    // valid
    var recommendGuy_valid = /^\d+$/.test(recommendGuy) || (necessity === null || necessity === void 0 ? void 0 : necessity.recommendGuy) != Enum_1.Necessity.必填;
    var account_valid = (account === null || account === void 0 ? void 0 : account.length) >= 6;
    var password_valid = tars_1.validPassword(password, strength) &&
        (password === null || password === void 0 ? void 0 : password.length) >= minLength &&
        (password === null || password === void 0 ? void 0 : password.length) <= maxLength;
    var confirmPassword_valid = confirmPassword == password;
    var name_valid = (necessity === null || necessity === void 0 ? void 0 : necessity.name) != Enum_1.Necessity.必填; // /^[\u4E00-\u9FA5]+$/.test(name) || 
    var fundPassword_valid = ((fundPassword === null || fundPassword === void 0 ? void 0 : fundPassword.length) == 4 && /^\d+$/.test(fundPassword)) || (necessity === null || necessity === void 0 ? void 0 : necessity.fundPassword) != Enum_1.Necessity.必填;
    var qq_valid = (qq === null || qq === void 0 ? void 0 : qq.length) >= 5 || (necessity === null || necessity === void 0 ? void 0 : necessity.qq) != Enum_1.Necessity.必填;
    var wx_valid = weChat || (necessity === null || necessity === void 0 ? void 0 : necessity.wx) != Enum_1.Necessity.必填;
    var email_valid = email || (necessity === null || necessity === void 0 ? void 0 : necessity.email) != Enum_1.Necessity.必填;
    var phoneNumber_valid = phoneNumber || (necessity === null || necessity === void 0 ? void 0 : necessity.phoneNumber) != Enum_1.Necessity.必填;
    var slideCode_valid = (nc_csessionid && nc_token && nc_sig) || (necessity === null || necessity === void 0 ? void 0 : necessity.slideCode) != Enum_1.Necessity.必填;
    var sms_valid = (sms === null || sms === void 0 ? void 0 : sms.length) == 6 || (necessity === null || necessity === void 0 ? void 0 : necessity.sms) != Enum_1.Necessity.必填;
    var valid = account_valid &&
        password_valid &&
        confirmPassword_valid &&
        recommendGuy_valid &&
        name_valid &&
        fundPassword_valid &&
        qq_valid &&
        wx_valid &&
        email_valid &&
        phoneNumber_valid &&
        slideCode_valid &&
        sms_valid;
    // onChange
    var onChangeAgent = function (value) { return agentRef.current = value; };
    var onChangeRecommendGuy = function (value) { return setRecommendGuy(value); };
    var obChangeAccount = function (value) { return setAccount(value); };
    var obChangePassword = function (value) { return setPassword(value); };
    var onChangeConfirmPassword = function (value) { return setConfirmPassword(value); };
    var onChaneRealName = function (value) { return setName(value); };
    var onChaneFundPassword = function (value) { return setFundPassword(value); };
    var onChaneQQ = function (value) { return setQQ(value); };
    var onChaneWeChat = function (value) { return setWeChat(value); };
    var onChanePhone = function (value) { return setPhoneNumber(value); };
    var onChangeEmail = function (value) { return setEmail(value); };
    var onChaneSms = function (value) { return setSms(value); };
    var onChangeSlideCode = setSlideCode;
    var getPasswordLimitString = function () {
        if (strength == Enum_1.PasswordStrength.数字字母) {
            return '，密码须有数字及字母';
        }
        else if (strength == Enum_1.PasswordStrength.数字字母字符) {
            return '，密码须有数字及字母及字符';
        }
        else {
            return '';
        }
    };
    var getLabel = function (necessity, label) {
        if (necessity == Enum_1.Necessity.选填) {
            return label + '(选填)';
        }
        else if (necessity == Enum_1.Necessity.必填) {
            return '*' + label;
        }
        else {
            return label;
        }
    };
    var qqLabel = getLabel(necessity === null || necessity === void 0 ? void 0 : necessity.qq, '请输入合法的QQ号');
    var wxLabel = getLabel(necessity === null || necessity === void 0 ? void 0 : necessity.wx, '请输入合法的微信号');
    var phoneNumberLabel = getLabel(necessity === null || necessity === void 0 ? void 0 : necessity.phoneNumber, '请输入合法的手机号');
    var emailLabel = getLabel(necessity === null || necessity === void 0 ? void 0 : necessity.email, '请输入合法的电子邮箱');
    var recommendGuyLabel = getLabel(necessity === null || necessity === void 0 ? void 0 : necessity.recommendGuy, '请填写推荐人ID，只能包含数字');
    var fundPasswordLabel = getLabel(necessity === null || necessity === void 0 ? void 0 : necessity.fundPassword, '请输入4数字取款密码');
    var nameLabel = getLabel(necessity === null || necessity === void 0 ? void 0 : necessity.name, '必须与您的银行账户名称相同，以免未能到账');
    var passwordLebel = '*请使用至少' +
        minLength +
        '位至' +
        maxLength +
        '位英文或数字的组合' +
        getPasswordLimitString();
    var confirmPasswordLabel = (password == confirmPassword) && confirmPassword ? '' : '密码不一致';
    var imageCodeLabel = '*请输入验证码';
    var signUp = function () {
        if (valid) {
            var params = {
                inviter: recommendGuy,
                usr: account,
                pwd: password === null || password === void 0 ? void 0 : password.md5(),
                fundPwd: fundPassword === null || fundPassword === void 0 ? void 0 : fundPassword.md5(),
                fullName: name,
                qq: qq,
                wx: weChat,
                phone: phoneNumber,
                smsCode: sms !== null && sms !== void 0 ? sms : '',
                'slideCode[nc_sid]': slideCode === null || slideCode === void 0 ? void 0 : slideCode.nc_csessionid,
                'slideCode[nc_token]': slideCode === null || slideCode === void 0 ? void 0 : slideCode.nc_token,
                'slideCode[nc_sig]': slideCode === null || slideCode === void 0 ? void 0 : slideCode.nc_sig,
                email: email,
                regType: agentRef.current,
            };
            // @ts-ignore
            register(params);
        }
    };
    var onChange = {
        onChangeRecommendGuy: onChangeRecommendGuy,
        obChangeAccount: obChangeAccount,
        obChangePassword: obChangePassword,
        onChangeConfirmPassword: onChangeConfirmPassword,
        onChaneRealName: onChaneRealName,
        onChaneFundPassword: onChaneFundPassword,
        onChaneQQ: onChaneQQ,
        onChaneWeChat: onChaneWeChat,
        onChanePhone: onChanePhone,
        onChangeEmail: onChangeEmail,
        onChaneSms: onChaneSms,
        onChangeSlideCode: onChangeSlideCode,
        onChangeAgent: onChangeAgent,
    };
    var show = {
        showRecommendGuy: (necessity === null || necessity === void 0 ? void 0 : necessity.recommendGuy) != Enum_1.Necessity.隱藏,
        showName: (necessity === null || necessity === void 0 ? void 0 : necessity.name) != Enum_1.Necessity.隱藏,
        showFundPassword: (necessity === null || necessity === void 0 ? void 0 : necessity.fundPassword) != Enum_1.Necessity.隱藏,
        showQQ: (necessity === null || necessity === void 0 ? void 0 : necessity.qq) != Enum_1.Necessity.隱藏,
        showWx: (necessity === null || necessity === void 0 ? void 0 : necessity.wx) != Enum_1.Necessity.隱藏,
        showPhoneNumber: (necessity === null || necessity === void 0 ? void 0 : necessity.phoneNumber) != Enum_1.Necessity.隱藏,
        showEmail: (necessity === null || necessity === void 0 ? void 0 : necessity.email) != Enum_1.Necessity.隱藏,
        showSlideCode: (necessity === null || necessity === void 0 ? void 0 : necessity.slideCode) != Enum_1.Necessity.隱藏,
        showAgentButton: (necessity === null || necessity === void 0 ? void 0 : necessity.agentButton) != Enum_1.Necessity.隱藏,
        showSms: (necessity === null || necessity === void 0 ? void 0 : necessity.sms) != Enum_1.Necessity.隱藏,
    };
    var label = {
        passwordLebel: passwordLebel,
        recommendGuyLabel: recommendGuyLabel,
        confirmPasswordLabel: confirmPasswordLabel,
        fundPasswordLabel: fundPasswordLabel,
        nameLabel: nameLabel,
        imageCodeLabel: imageCodeLabel,
        emailLabel: emailLabel,
        phoneNumberLabel: phoneNumberLabel,
        qqLabel: qqLabel,
        wxLabel: wxLabel,
    };
    var navigateTo = {
        navigateToHomePage: navigateToHomePage,
        navigateToSignInPage: navigateToSignInPage
    };
    var sign = {
        signUp: signUp,
        tryPlay: tryPlay
    };
    return {
        slideCodeRef: slideCodeRef,
        show: show,
        valid: valid,
        label: label,
        onChange: onChange,
        navigateTo: navigateTo,
        sign: sign,
        passwordLimit: passwordLimit
    };
};
exports.default = useSignUpPage;
