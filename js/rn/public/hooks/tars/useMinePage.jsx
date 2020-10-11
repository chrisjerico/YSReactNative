"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var UGStore_1 = require("../../../redux/store/UGStore");
var RootNavigation_1 = require("../../navigation/RootNavigation");
var tars_1 = require("../../tools/tars");
var UGLoadingCP_1 = require("../../widget/UGLoadingCP");
var useLogOut_1 = require("./useLogOut");
var useRerender_1 = require("./useRerender");
var useSys_1 = require("./useSys");
var useMinePage = function (_a) {
    var homePage = _a.homePage, defaultUserCenterLogos = _a.defaultUserCenterLogos;
    // states
    var pickAvatarComponentRef = react_1.useRef(null);
    var rerender = useRerender_1.default().rerender;
    // stores
    var sys = useSys_1.default({
        defaultUserCenterLogos: defaultUserCenterLogos,
    }).sys;
    var _b = UGStore_1.UGStore.globalProps.userInfo, avatar = _b.avatar, usr = _b.usr, balance = _b.balance, unreadMsg = _b.unreadMsg, isTest = _b.isTest, curLevelGrade = _b.curLevelGrade, uid = _b.uid, nextLevelInt = _b.nextLevelInt, curLevelInt = _b.curLevelInt, taskRewardTotal = _b.taskRewardTotal, curLevelTitle = _b.curLevelTitle, nextLevelTitle = _b.nextLevelTitle;
    var mobile_logo = sys.mobile_logo, userCenterItems = sys.userCenterItems, showSign = sys.showSign, mobileMenu = sys.mobileMenu;
    var logOut = useLogOut_1.default({
        onStart: function () {
            UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading });
        },
        onSuccess: function () {
            UGLoadingCP_1.hideLoading();
            RootNavigation_1.navigate(homePage, {});
        },
        onError: function (error) {
            UGLoadingCP_1.hideLoading();
            tars_1.ToastError(error !== null && error !== void 0 ? error : '登出失败');
            console.log('--------登出失败--------', error);
        },
    }).logOut;
    var signOut = logOut;
    var onPressAvatar = function () { var _a; return (_a = pickAvatarComponentRef === null || pickAvatarComponentRef === void 0 ? void 0 : pickAvatarComponentRef.current) === null || _a === void 0 ? void 0 : _a.open(); };
    var onSaveAvatarSuccess = rerender;
    var sysInfo = {
        balance: balance,
        uid: uid,
        mobile_logo: mobile_logo,
        userCenterItems: userCenterItems,
        curLevelGrade: curLevelGrade,
        usr: usr,
        isTest: isTest,
        avatar: avatar,
        unreadMsg: unreadMsg,
        curLevelInt: curLevelInt,
        nextLevelInt: nextLevelInt,
        taskRewardTotal: taskRewardTotal,
        curLevelTitle: curLevelTitle,
        nextLevelTitle: nextLevelTitle,
        showSign: showSign,
        mobileMenu: mobileMenu,
    };
    var sign = {
        signOut: signOut,
    };
    var value = {
        sysInfo: sysInfo,
    };
    return {
        pickAvatarComponentRef: pickAvatarComponentRef,
        onPressAvatar: onPressAvatar,
        onSaveAvatarSuccess: onSaveAvatarSuccess,
        value: value,
        sign: sign,
    };
};
exports.default = useMinePage;
