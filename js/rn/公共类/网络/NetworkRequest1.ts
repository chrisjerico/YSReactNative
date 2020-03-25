import CCSessionModel from './CCSessionModel';
import AppDefine from '../AppDefine';
import {UGPromoteListModel} from '../../Model/常规/UGPromoteModel';
import {ParserOptions} from '@babel/core';
import {UGAgentApplyInfo} from '../../Model/全局/UGSysConfModel';
import UGUserModel, {UGLoginModel} from '../../Model/全局/UGUserModel';
import {SlideCodeModel} from '../../Model/常规/SlideCodeModel';
import ServerHttp from "../../../../src/js/net/ServerHttp";
import {ServerApi} from "../../../../src/js/net/ServerApi";
import IHomeBean from "../../../../src/js/redux/inter/bean/home/IHomeBean";

export default class NetworkRequest1 {
  // 获取下一期开奖数据
  static game_nextIssue(params: {abc?: 'a123' | 'abc'}) {
    // this.game_homeGames({ abc: "abc" });
  }

  // 获取首页游戏列表
  static game_homeGames(): Promise<void> {
    return CCSessionModel.req('c=game&a=homeGames');
  }

  // 获取帖子详情
  static lhdoc_contentDetail(id: string) {
    return CCSessionModel.req('c=lhcdoc&a=contentDetail', {id: id}, false);
  }

  // 获取优惠券
  static async couponList() {
    return await CCSessionModel.req('c=system&a=promotions');
  }

  // 获取主页数据
  static async homeInfo() {
    let response1 = await fetch(
      'https://facebook.github.io/react-native/movies.json',
    );

    //广告
    let banner = await CCSessionModel.req('c=system&a=banners');
    //通知
    let notice = await CCSessionModel.req('c=notice&a=latest');
    //游戏
    let game = await CCSessionModel.req('c=game&a=homeGames');
    //优惠
    let coupon = await NetworkRequest1.couponList();
    //用户
    let userInfo = await CCSessionModel.req('c=user&a=info');
    //红包
    let redBag = await CCSessionModel.req('c=activity&a=redBagDetail');
    //悬浮广告
    let floatAd = await CCSessionModel.req('c=system&a=floatAds');
    //测试
    let responseJson1 = await response1.json();

    let bean: IHomeBean = {
      banner: banner,
      notice: notice,
      game: game,
      coupon: coupon,
      userInfo: userInfo,
      redBag: redBag,
      floatAd: floatAd,
      movie: responseJson1,
    };
    return bean;
  }

  // 获取评论列表
  static lhcdoc_contentReplyList(
    contentId: string, // 帖子ID
    replyPId: string = '', // 回复ID
    page: number = 1, // 页码
    rows: number = AppDefine.pageCount, // 每页条数
  ): Promise<void> {
    return CCSessionModel.req('c=lhcdoc&a=contentReplyList', {contentId: contentId, replyPId: replyPId, page: page, rows: rows}, false);
  }

  // 获取分类的优惠活动
  static system_getPromotionsType() {
    return CCSessionModel.req('c=system&a=getPromotionsType');
  }

  // 获取首页优惠活动
  static systeam_promotions(): Promise<UGPromoteListModel> {
    return CCSessionModel.req('c=system&a=promotions');
  }

  // 获取代理申请信息（推荐收益）
  static team_agentApplyInfo(): Promise<UGAgentApplyInfo> {
    return CCSessionModel.req('c=team&a=agentApplyInfo');
  }

  // 获取用户信息（我的页）
  static user_info(): Promise<UGUserModel> {
    return CCSessionModel.req('c=user&a=info');
  }

  // 登录
  static user_login(uname: string, pwd: string, googleCode?: string, slideCode?: SlideCodeModel): Promise<UGLoginModel> {
    slideCode = SlideCodeModel.get(slideCode);
    return CCSessionModel.req('c=user&a=login', {usr: uname, pwd: pwd, ggCode: googleCode, ...slideCode}, true);
  }

  // 注册
  static async user_reg(params: {
    inviter: string; // 推荐人ID
    usr: string; // 账号
    pwd: string; // 密码
    fundPwd: string; // 取款密码
    fullName: string; // 真实姓名
    qq: string; // QQ号
    wx: string; // 微信号
    phone: string; // 手机号
    smsCode: string; // 短信验证码
    imgCode: string; // 字母验证码
    slideCode: SlideCodeModel; // 滑动验证码
    email: string; // 邮箱
    regType: 'user' | 'agent'; // 用户注册 或 代理注册
  }): Promise<void> {
    var accessToken = await AppDefine.ocCall('OpenUDID.value');
    params = Object.assign({device: '3', accessToken: accessToken}, params);
    return await CCSessionModel.req('c=user&a=reg', params, true);
  }

  // 检查用户是否已存在
  static user_exists(usr: string): Promise<void> {
    return CCSessionModel.req('c=user&a=exists', {usr: usr}, true);
  }

  // 退出登录
  static user_logout(): Promise<void> {
    return CCSessionModel.req('c=user&a=logout');
  }

  // 登录试玩账号
  static user_guestLogin(): Promise<void> {
    return CCSessionModel.req(
      'c=user&a=guestLogin',
      {
        usr: '46da83e1773338540e1e1c973f6c8a68',
        pwd: '46da83e1773338540e1e1c973f6c8a68',
      },
      true,
    );
  }

  // 上传错误日志
  static uploadErrorLog(log: string, title: string, tag: string): Promise<void> {
    return CCSessionModel.request(
      'https://www.showdoc.cc/server/api/item/updateByApi',
      {
        api_key: '8d36c0232492493fe13fad667eeb221f2104779671',
        api_token: '0a98a37b01f88f2afe9b9f5c052db169143601101',
        page_content: log, // 内容
        page_title: new Date().format('MM月dd日 hh:mm') + `（${title}）`, // 标题
        cat_name: tag, // 目录名
        s_number: new Date().format('yyyyMMddHHmm'), // 序号，数字越小越靠前
      },
      true,
    );
  }
}

Date.prototype.format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
};
