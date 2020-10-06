"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var UGSysConfModel_1 = require("../../../redux/model/\u5168\u5C40/UGSysConfModel");
var UGStore_1 = require("../../../redux/store/UGStore");
var PushHelper_1 = require("../../define/PushHelper");
var Enum_1 = require("../../models/Enum");
var RootNavigation_1 = require("../../navigation/RootNavigation");
var tars_1 = require("../../tools/tars");
var UGLoadingCP_1 = require("../../widget/UGLoadingCP");
var useLogIn_1 = require("./useLogIn");
var useSys_1 = require("./useSys");
var useTryPlay_1 = require("./useTryPlay");
var useSignInPage = function (_a) {
    var homePage = _a.homePage, signUpPage = _a.signUpPage;
    // stores
    var sys = useSys_1.default({}).sys;
    var sign = UGStore_1.UGStore === null || UGStore_1.UGStore === void 0 ? void 0 : UGStore_1.UGStore.globalProps.sign;
    var loginVCode = sys.loginVCode, loginTo = sys.loginTo;
    // states
    var _b = react_1.useState(sign === null || sign === void 0 ? void 0 : sign.account), account = _b[0], setAccount = _b[1];
    var _c = react_1.useState(sign === null || sign === void 0 ? void 0 : sign.password), password = _c[0], setPassword = _c[1];
    var _d = react_1.useState({
        nc_csessionid: undefined,
        nc_token: undefined,
        nc_sig: undefined,
    }), slideCode = _d[0], setSlideCode = _d[1];
    // refs
    var slideCodeRef = react_1.useRef(null);
    var rememberRef = react_1.useRef(sign === null || sign === void 0 ? void 0 : sign.remember);
    var navigateToSignUpPage = function () {
        homePage && RootNavigation_1.navigate(signUpPage, {});
    };
    var navigateToHomePage = function () {
        homePage && RootNavigation_1.navigate(homePage, {});
    };
    var logIn = useLogIn_1.default({
        onStart: function () {
            UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading });
            tars_1.ToastStatus('正在登录...');
        },
        onSuccess: function () {
            if (loginTo == Enum_1.LoginTo.首页) {
                navigateToHomePage();
            }
            else {
                navigateToHomePage();
                PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.我的页);
            }
            UGLoadingCP_1.hideLoading();
            tars_1.ToastSuccess('登录成功');
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
            tars_1.ToastError(error !== null && error !== void 0 ? error : '登录失败');
            console.log("--------登录失败--------", error);
        },
    }).logIn;
    var tryPlay = useTryPlay_1.default({
        onSuccess: function () {
            navigateToHomePage();
            tars_1.ToastSuccess('登录成功');
        },
        onError: function (error) {
            tars_1.ToastError(error !== null && error !== void 0 ? error : '登录失败');
            console.log("--------試玩失败--------", error);
        },
    }).tryPlay;
    var signIn = function () {
        logIn({
            account: account,
            //@ts-ignore
            password: password === null || password === void 0 ? void 0 : password.md5(),
            slideCode: slideCode
        });
    };
    var onChangeAccount = function (value) {
        UGStore_1.UGStore.dispatch({
            type: 'merge', sign: {
                account: rememberRef.current ? value : null,
                password: rememberRef.current ? password : null
            }
        });
        setAccount(value);
    };
    var onChangePassword = function (value) {
        UGStore_1.UGStore.dispatch({
            type: 'merge', sign: {
                account: rememberRef.current ? account : null,
                password: rememberRef.current ? value : null
            }
        });
        setPassword(value);
    };
    var onChangeRemember = function (value) {
        rememberRef.current = value;
        UGStore_1.UGStore.dispatch({
            type: 'merge', sign: {
                remember: value,
                account: value ? account : null,
                password: value ? password : null
            }
        });
    };
    var onChangeSlideCode = setSlideCode;
    // data handle
    var nc_csessionid = slideCode.nc_csessionid, nc_token = slideCode.nc_token, nc_sig = slideCode.nc_sig;
    var loginVCode_valid = (nc_csessionid && nc_token && nc_sig) || !loginVCode;
    var valid = (account && password && loginVCode_valid) ? true : false;
    var value = {
        account: account,
        password: password,
        remember: rememberRef.current,
    };
    var onChange = {
        onChangeAccount: onChangeAccount,
        onChangePassword: onChangePassword,
        onChangeRemember: onChangeRemember,
        onChangeSlideCode: onChangeSlideCode,
    };
    var navigateTo = {
        navigateToHomePage: navigateToHomePage,
        navigateToSignUpPage: navigateToSignUpPage,
    };
    var show = {
        loginVCode: loginVCode
    };
    return {
        slideCodeRef: slideCodeRef,
        navigateTo: navigateTo,
        onChange: onChange,
        value: value,
        valid: valid,
        show: show,
        sign: {
            signIn: signIn,
            tryPlay: tryPlay,
        }
    };
};
exports.default = useSignInPage;
