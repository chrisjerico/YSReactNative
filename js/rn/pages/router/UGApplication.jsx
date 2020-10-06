"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var TrendView_1 = require("../../public/components/TrendView");
var LanguageContextProvider_1 = require("../../public/context/LanguageContextProvider");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var Router_1 = require("../../public/navigation/Router");
var UgLog_1 = require("../../public/tools/UgLog");
var ExtUGApplication_1 = require("../../public/tools/ui/ExtUGApplication");
var UGLoadingCP_1 = require("../../public/widget/UGLoadingCP");
var TransitionPage_1 = require("../base/TransitionPage");
var UGPage_1 = require("../base/UGPage");
var BZHGameLobbyPage_1 = require("../BZH/BZHGameLobbyPage");
var BZHHomePage_1 = require("../BZH/BZHHomePage");
var BZHMinePage_1 = require("../BZH/BZHMinePage");
var BZHSignInPage_1 = require("../BZH/BZHSignInPage");
var BZHSignUpPage_1 = require("../BZH/BZHSignUpPage");
var LottoBetting_1 = require("../common/LottoBetting");
var PromotionListPage_1 = require("../common/PromotionListPage");
var KSHomePage_1 = require("../KS/KSHomePage");
var KSMinePage_1 = require("../KS/KSMinePage");
var KSSignInPage_1 = require("../KS/KSSignInPage");
var KSSignUpPage_1 = require("../KS/KSSignUpPage");
var LHTHomePage_1 = require("../LHT/LHTHomePage");
var LHTMinePage_1 = require("../LHT/LHTMinePage");
var LHTPreferencePage_1 = require("../LHT/LHTPreferencePage");
var LHTSignInPage_1 = require("../LHT/LHTSignInPage");
var LHTSignUpPage_1 = require("../LHT/LHTSignUpPage");
var WNZGameLobbyPage_1 = require("../WNZ/WNZGameLobbyPage");
var WNZHomePage_1 = require("../WNZ/WNZHomePage");
var WNZMinePage_1 = require("../WNZ/WNZMinePage");
var WNZSignInPage_1 = require("../WNZ/WNZSignInPage");
var WNZSignUpPage_1 = require("../WNZ/WNZSignUpPage");
var LXBView_1 = require("../\u4E50\u6A59/component/minePage/LXBView");
var LCHomePage_1 = require("../\u4E50\u6A59/LCHomePage");
var LCMinePage_1 = require("../\u4E50\u6A59/LCMinePage");
var LLHomePage_1 = require("../\u5229\u6765/LLHomePage");
var LLLoginPage_1 = require("../\u5229\u6765/LLLoginPage");
var LLMinePage_1 = require("../\u5229\u6765/LLMinePage");
var LLRegisterPage_1 = require("../\u5229\u6765/LLRegisterPage");
var ZLHomePage_1 = require("../\u5C0A\u9F99/ZLHomePage");
var ZLLoginPage_1 = require("../\u5C0A\u9F99/ZLLoginPage");
var ZLMinePage_1 = require("../\u5C0A\u9F99/ZLMinePage");
var ZLRegisterPage_1 = require("../\u5C0A\u9F99/ZLRegisterPage");
var JDPromotionListPage_1 = require("../\u7ECF\u5178/JDPromotionListPage");
var GameList_1 = require("../\u8D8A\u5357/GameList");
var HomePage_1 = require("../\u8D8A\u5357/HomePage");
var LoginPage_1 = require("../\u8D8A\u5357/LoginPage");
var MinePage_1 = require("../\u8D8A\u5357/MinePage");
var RegisterPage_1 = require("../\u8D8A\u5357/RegisterPage");
var GDBHomePage_1 = require("../\u91D1\u661F\u9ED1/GDBHomePage");
var GDBMinePage_1 = require("../\u91D1\u661F\u9ED1/GDBMinePage");
var GDLoginPage_1 = require("../\u91D1\u661F\u9ED1/GDLoginPage");
var GDRegisterPage_1 = require("../\u91D1\u661F\u9ED1/GDRegisterPage");
var XBJHomePage_1 = require("../\u9999\u69DF\u91D1/XBJHomePage");
var XBJLoginPage_1 = require("../\u9999\u69DF\u91D1/XBJLoginPage");
var XBJMinePage_1 = require("../\u9999\u69DF\u91D1/XBJMinePage");
var XBJRegisterPage_1 = require("../\u9999\u69DF\u91D1/XBJRegisterPage");
var UpdateVersionPage_1 = require("./UpdateVersionPage");
// TabbarController
var TabBarController = /** @class */ (function (_super) {
    __extends(TabBarController, _super);
    function TabBarController(props) {
        var _this = _super.call(this, props) || this;
        _this.newProps = {
            hideNavBar: true,
            hideTabBar: true,
        };
        _this.tabBarOptions = {};
        return _this;
        // const { navigation } = this.props
        // navigation.setOptions({ headerStyle: { height: 0 } })
    }
    TabBarController.prototype.componentDidMount = function () {
        this.props.navigation.setOptions({ headerStyle: { height: 0 } });
    };
    TabBarController.prototype.render = function () {
        var initialName = ExtUGApplication_1.default.tabUI();
        UgLog_1.ugLog('tab initialName=', initialName);
        return (<Router_1.Router.TabNavigator initialRouteName={initialName} screenOptions={{ tabBarVisible: false }} tabBarOptions={this.tabBarOptions}>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.LXBView} component={UGPage_1.default(LXBView_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.VietnamHome} component={UGPage_1.default(HomePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.LCMinePage} component={UGPage_1.default(LCMinePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.LCHomePage} component={UGPage_1.default(LCHomePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.TransitionPage} component={UGPage_1.default(TransitionPage_1.TransitionPage)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.XBJLoginPage} component={UGPage_1.default(XBJLoginPage_1.XBJLoginPage)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.XBJRegisterPage} component={UGPage_1.default(XBJRegisterPage_1.XBJRegisterPage)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.XBJMinePage} component={UGPage_1.default(XBJMinePage_1.XBJMinePage)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.XBJHomePage} component={UGPage_1.default(XBJHomePage_1.XBJHomePage)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.ZLHomePage} component={UGPage_1.default(ZLHomePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.ZLMinePage} component={UGPage_1.default(ZLMinePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.PromotionListPage} component={UGPage_1.default(PromotionListPage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.LHTHomePage} component={UGPage_1.default(LHTHomePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.LHTMinePage} component={UGPage_1.default(LHTMinePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.BZHHomePage} component={UGPage_1.default(BZHHomePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.BZHMinePage} component={UGPage_1.default(BZHMinePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.GDBHomePage} component={GDBHomePage_1.default}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.GDBMinePage} component={UGPage_1.default(GDBMinePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.WNZHomePage} component={UGPage_1.default(WNZHomePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.WNZMinePage} component={UGPage_1.default(WNZMinePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.KSHomePage} component={UGPage_1.default(KSHomePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.UpdateVersionPage} component={UGPage_1.default(UpdateVersionPage_1.UpdateVersionPage)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.JDPromotionListPage} component={UGPage_1.default(JDPromotionListPage_1.JDPromotionListPage)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.VietnamMine} component={UGPage_1.default(MinePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.KSMine} component={UGPage_1.default(KSMinePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.LLHomePage} component={UGPage_1.default(LLHomePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.LLMinePage} component={UGPage_1.default(LLMinePage_1.default)}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.BZHGameLobbyPage} component={BZHGameLobbyPage_1.default}/>
        <Router_1.Router.TabScreen name={Navigation_1.PageName.WNZGameLobbyPage} component={UGPage_1.default(WNZGameLobbyPage_1.default)}/>
      </Router_1.Router.TabNavigator>);
    };
    return TabBarController;
}(react_1.Component));
var StackScreens = function () {
    var initialName = ExtUGApplication_1.default.stackUI();
    UgLog_1.ugLog('stack initialName=', initialName);
    return (<Router_1.Router.StackNavigator initialRouteName={initialName} headerMode={'screen'}>
      <Router_1.Router.StackScreen name={' '} component={TabBarController}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.TrendView} component={UGPage_1.default(TrendView_1.default)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.LLLoginPage} component={UGPage_1.default(LLLoginPage_1.LLLoginPage)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.LLRegisterPage} component={UGPage_1.default(LLRegisterPage_1.LLRegisterPage)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.ZLLoginPage} component={UGPage_1.default(ZLLoginPage_1.default)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.ZLRegisterPage} component={UGPage_1.default(ZLRegisterPage_1.default)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.JDPromotionListPage} component={UGPage_1.default(JDPromotionListPage_1.JDPromotionListPage)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.PromotionListPage} component={UGPage_1.default(PromotionListPage_1.default)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.GDLoginPage} component={UGPage_1.default(GDLoginPage_1.default)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.GDRegisterPage} component={UGPage_1.default(GDRegisterPage_1.default)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.BZHSignUpPage} component={BZHSignUpPage_1.default}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.BZHSignInPage} component={BZHSignInPage_1.default}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.LHTSignInPage} component={LHTSignInPage_1.default}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.LHTSignUpPage} component={LHTSignUpPage_1.default}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.WNZSignInPage} component={WNZSignInPage_1.default}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.WNZSignUpPage} component={WNZSignUpPage_1.default}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.LottoBetting} component={UGPage_1.default(LottoBetting_1.default)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.ZLMinePage} component={UGPage_1.default(ZLMinePage_1.default)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.VietnamLogin} component={UGPage_1.default(LoginPage_1.default)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.VietnamRegister} component={UGPage_1.default(RegisterPage_1.default)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.VietnamGameList} component={UGPage_1.default(GameList_1.default)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.KSSignInPage} component={KSSignInPage_1.default}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.KSSignUpPage} component={KSSignUpPage_1.default}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.KSMine} component={UGPage_1.default(KSMinePage_1.default)}/>
      <Router_1.Router.StackScreen options={{ headerShown: false }} name={Navigation_1.PageName.LHTPreferencePage} component={LHTPreferencePage_1.default}/>
    </Router_1.Router.StackNavigator>);
};
var UGApplication = function () {
    return (<LanguageContextProvider_1.LanguageContextProvider>
      <native_1.NavigationContainer ref={RootNavigation_1.navigationRef}>
        {StackScreens()}
        <UGLoadingCP_1.UGLoadingCP />
      </native_1.NavigationContainer>
    </LanguageContextProvider_1.LanguageContextProvider>);
};
exports.default = UGApplication;
// NavController
