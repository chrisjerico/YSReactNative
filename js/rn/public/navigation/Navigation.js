"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageName = void 0;
var PageName;
(function (PageName) {
    PageName["TransitionPage"] = "TransitionPage";
    PageName["XBJLoginPage"] = "XBJLoginPage";
    PageName["XBJRegisterPage"] = "XBJRegisterPage";
    PageName["XBJMinePage"] = "XBJMinePage";
    PageName["JDPromotionListPage"] = "JDPromotionListPage";
    PageName["XBJHomePage"] = "XBJHomePage";
    PageName["LCHomePage"] = "LCHomePage";
    PageName["LCMinePage"] = "LCMinePage";
    PageName["LCTransferPage"] = "LCTransferPage";
    PageName["LCPromotionsPage"] = "LCPromotionsPage";
    PageName["LXBView"] = "LXBView";
    PageName["UpdateVersionPage"] = "UpdateVersionPage";
    PageName["ZHTYHomePage"] = "ZHTYHomePage";
    PageName["ZHTYLoginPage"] = "ZHTYLoginPage";
    PageName["ZHTYRegisterPage"] = "ZHTYRegisterPage";
    PageName["ZHTYMinePage"] = "ZHTYMinePage";
    PageName["LHTHomePage"] = "LHTHomePage";
    PageName["LHTMinePage"] = "LHTMinePage";
    PageName["LHTSignInPage"] = "LHTSignInPage";
    PageName["LHTSignUpPage"] = "LHTSignUpPage";
    PageName["ZLHomePage"] = "ZLHomePage";
    PageName["ZLLoginPage"] = "ZLLoginPage";
    PageName["ZLMinePage"] = "ZLMinePage";
    PageName["ZLRegisterPage"] = "ZLRegisterPage";
    PageName["BZHHomePage"] = "BZHHomePage";
    PageName["BZHMinePage"] = "BZHMinePage";
    PageName["BZHSignInPage"] = "BZHSignInPage";
    PageName["BZHSignUpPage"] = "BZHSignUpPage";
    PageName["BZHGameLobbyPage"] = "BZHGameLobbyPage";
    PageName["GDBHomePage"] = "GDBHomePage";
    PageName["GDBMinePage"] = "GDBMinePage";
    PageName["GDRegisterPage"] = "GDRegisterPage";
    PageName["GDLoginPage"] = "GDLoginPage";
    PageName["WNZHomePage"] = "WNZHomePage";
    PageName["WNZMinePage"] = "WNZMinePage";
    PageName["WNZSignUpPage"] = "WNZSignUpPage";
    PageName["WNZSignInPage"] = "WNZSignInPage";
    PageName["WNZGameLobbyPage"] = "WNZGameLobbyPage";
    PageName["PromotionListPage"] = "PromotionListPage";
    PageName["LLHomePage"] = "LLHomePage";
    PageName["LLMinePage"] = "LLMinePage";
    PageName["LLLoginPage"] = "LLLoginPage";
    PageName["LLRegisterPage"] = "LLRegisterPage";
    PageName["KSHomePage"] = "KSHomePage";
    PageName["KSSignInPage"] = "KSSignInPage";
    PageName["KSSignUpPage"] = "KSSignUpPage";
    PageName["KSMine"] = "KSMine";
    PageName["LottoSelector"] = "LottoSelector";
    PageName["LottoBetting"] = "LottoBetting";
    PageName["VietnamHome"] = "VietnamHome";
    PageName["VietnamLogin"] = "VietnamLogin";
    PageName["VietnamRegister"] = "VietnamRegister";
    PageName["VietnamMine"] = "VietnamMine";
    PageName["VietnamGameList"] = "VietnamGameList";
    PageName["LHTPreferencePage"] = "LHTPreferencePage";
    PageName["TrendView"] = "TrendView";
    PageName["LCLoginPage"] = "LCLoginPage";
    PageName["LCRegisterPage"] = "LCRegisterPage";
})(PageName = exports.PageName || (exports.PageName = {}));
// export class  {
//   // 当前Stack上的页面（第一个页面是Tabbar的当前页面）
//   static pages: PageName[] = [PageName.UpdateVersionPage];
//   private static navigation: StackNavigationProp<{ [x: string]: any }> & BottomTabNavigationProp<{ [x: string]: any }>;
//   static setNavigation(navigation) {
//     if (!this.navigation) {
//       this.navigation = navigation;
//     }
//   }
//   // 去新的导航页
//   static push<P extends UGBasePageProps<P>>(page: PageName, props?: P, transition: boolean = true): boolean {
//     return this.smartNavigate(RouterType.Stack, page, undefined, transition);
//   }
//   // 回到上一页
//   static pop() {
//     if (this.navigation && this.pages.length > 1) {
//       this.navigation.pop();
//       // this.pages.pop();// 这里记录不精确，侧滑返回时无法识别，已在UGPage记录pages
//     } else {
//       console.log('已经是第一页了，无需pop', this.pages);
//     }
//   }
//   // 回到第一页
//   static popToRoot() {
//     if (this.navigation && this.pages.length > 1) {
//       this.navigation.popToTop();
//       this.pages = [this.pages[0]];
//     } else {
//       console.log('已经是第一页了，无需popToRoot', this.pages);
//     }
//   }
//   // 切换标签页
//   static jump<P>(page: PageName, props?: P): boolean {
//     return this.smartNavigate(RouterType.Tab, page, props, false);
//   }
//   // 智能跳转
//   private static loadedTabPages: PageName[] = [];
//   static smartNavigate<P>(priorityType: RouterType, page: PageName, props?: P, transition: boolean = true): boolean {
//     if (!this.navigation) return false;
//     if (this.pages[this.pages.length - 1] == page) {
//       console.log(page, '页面已存在，pages =', this.pages);
//       return
//     };
//     const routerType = Router.getPageRouterType(page, priorityType);
//     switch (routerType) {
//       case RouterType.Stack: {
//         this.navigation.push(page, props);
//         return true;
//       }
//       case RouterType.Tab: {
//         popToRoot();
//         if (!transition || page == PageName.TransitionPage || this.pages[0] == PageName.TransitionPage) {
//           console.log('跳转到', page);
//           this.pages[0] = page;
//           this.navigation.jumpTo(page, props);
//         } else {
//           console.log('跳转到过渡页');
//           this.loadedTabPages.push(page);
//           this.pages[0] = PageName.TransitionPage;
//           this.navigation.jumpTo(PageName.TransitionPage, { jumpTo: page, props: props });
//         }
//         return true;
//       }
//       case RouterType.Drawer: {
//         return true;
//       }
//     }
//     return false;
//   }
// }
