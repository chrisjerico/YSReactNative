
export enum PageName {
  TransitionPage = 'TransitionPage',
  XBJLoginPage = 'XBJLoginPage',
  XBJRegisterPage = 'XBJRegisterPage',
  XBJMinePage = 'XBJMinePage',
  JDPromotionListPage = 'JDPromotionListPage', //优惠券列表
  XBJHomePage = 'XBJHomePage',
  LCHomePage = 'LCHomePage',
  LCMinePage = 'LCMinePage',
  LCTransferPage = 'LCTransferPage',
  LCPromotionsPage = 'LCPromotionsPage',
  LXBView = 'LXBView',
  UpdateVersionPage = 'UpdateVersionPage',
  ZHTYHomePage = 'ZHTYHomePage',
  ZHTYLoginPage = 'ZHTYLoginPage',
  ZHTYRegisterPage = 'ZHTYRegisterPage',
  ZHTYMinePage = 'ZHTYMinePage',
  LHTHomePage = 'LHTHomePage',
  LHTMinePage = 'LHTMinePage',
  LHTSignInPage = "LHTSignInPage",
  LHTSignUpPage = "LHTSignUpPage",
  ZLHomePage = 'ZLHomePage', //尊龙主页
  ZLLoginPage = 'ZLLoginPage',//尊龙登录
  ZLMinePage = 'ZLMinePage',//尊龙我的
  ZLRegisterPage = 'ZLRegisterPage',//尊龙注册
  HJHomePage = 'HJHomePage', //黑金主页
  HJLoginPage = 'HJLoginPage',//黑金登录
  HJMinePage = 'HJMinePage',//黑金我的
  HJAllCategoryPage = 'HJAllCategoryPage',//黑金分类条目
  HJRegisterPage = 'HJRegisterPage',//黑金注册
  BZHHomePage = 'BZHHomePage',
  BZHMinePage = 'BZHMinePage',
  BZHSignInPage = 'BZHSignInPage',
  BZHSignUpPage = 'BZHSignUpPage',
  BZHGameLobbyPage = 'BZHGameLobbyPage',
  GDBHomePage = 'GDBHomePage',
  GDBMinePage = "GDBMinePage",
  GDRegisterPage = "GDRegisterPage",
  GDLoginPage = "GDLoginPage",
  WNZHomePage = 'WNZHomePage',
  WNZMinePage = 'WNZMinePage',
  WNZSignUpPage = 'WNZSignUpPage',
  WNZSignInPage = 'WNZSignInPage',
  WNZGameLobbyPage = 'WNZGameLobbyPage',
  PromotionListPage = "PromotionListPage",
  LLHomePage = "LLHomePage",
  LLMinePage = "LLMinePage",
  LLLoginPage = "LLLoginPage",
  LLRegisterPage = "LLRegisterPage",
  KSHomePage = "KSHomePage",
  KSLogin = "KSLogin",
  KSRegister = "KSRegister",
  KSMine = "KSMine",
  LottoSelector = "LottoSelector",
  LottoBetting = "LottoBetting",
  VietnamHome = "VietnamHome",
  VietnamLogin = "VietnamLogin",
  VietnamRegister = "VietnamRegister",
  VietnamMine = "VietnamMine",
  VietnamGameList = "VietnamGameList",
  LHTPreferencePage = "LHTPreferencePage",
}

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
