import {UGBridge} from './UGBridge';
import AppDefine from '../AppDefine';
import {ANEvent} from './ANEvent';
import {httpClient} from "../../network/httpClient";

/**
 * @Description: 交互命令
 *
 * @author Arc
 * @date 2020/8/6
*/
export enum CMD {
  OPEN_PAGE = 'OPEN_PAGE', //打开界面
  OPEN_NAVI_PAGE = 'OPEN_NAVI_PAGE', //打开导航界面
  OPEN_RED_BAD = 'OPEN_RED_BAD', //打开红包
  OPEN_COUPON = 'OPEN_COUPON', //打开优惠券
  LOG_OUT = 'LOG_OUT', //退出登录
  UNIVERSAL = 'UNIVERSAL', //万能函数
  MOVE_TO_BACK = 'MOVE_TO_BACK', //移动当前 Activity 到后台
  FINISH_ACTIVITY = 'FINISH_ACTIVITY',        //关闭activity
  APP_THEME_COLOR = 'UGSkinManagers.currentSkin.navBarBgColor.hexString', //设置主题色
  RN_PAGES = 'AppDefine.shared.setRnPageInfos:', //rn的界面
  CURRENT_PAGE = 'CURRENT_PAGE', //当前的界面
  VISIBLE_MAIN_TAB = 'VISIBLE_MAIN_TAB', //显示隐藏主页tab
  APP_HOST = 'AppDefine.shared.Host', //交互，拿到 host
  APP_SITE = 'AppDefine.shared.SiteId', //交互，拿到 site
  ENCRYPTION = 'CMNetwork.encryptionCheckSign:', //加密参数
  ENCRYPTION_PARAMS = 'ENCRYPTION_PARAMS', //加密参数
  ASK_FOR_TOKEN = 'ASK_FOR_TOKEN', //得到 token
  ASK_FOR_TOKEN_AND_RSA = 'ASK_FOR_TOKEN_AND_RSA', //得到 token和rsa
  ACCESS_TOKEN = 'ACCESS_TOKEN', //得到 access token
  SAVE_DATA =                   'SAVE_DATA',      //存储数据
  LOAD_DATA =                   'LOAD_DATA'      //加载数据
}

/**
 * @Description: RN在 native 存储的数据
 *
 * @author Arc
 * @date 2020/8/6
*/
export enum NA_DATA {
  LOGIN_INFO = 'LOGIN_INFO', //登录信息
  USER_INFO = 'USER_INFO', //用户信息
  CONFIG = 'CONFIG', //系统配置
}

/**
 * @Description: 菜单类型
 *
 * @author Arc
 * @date 2020/8/6
*/
export enum MenuType {
  CQK = '1',//存取款
  APP = '2', //app下载
  LTS = '3', //聊天室
  KF = '4', //客服
  CLZS = '5', //长龙助手
  SYTJ = '6', //收益推荐
  KJW = '7', //开奖网
  LXB = '8', //利息宝
  YHDD = '9', //优惠活动
  YXJL = '10', //游戏记录
  QQ = '11', //qq客服
  WX = '12', //微信客服
  RWZX = '13', //任务中心
  ZLX = '14', //站内信
  QD = '15', //签到
  TSZX = '16', //投诉中心
  QMJC = '17', //全民竞彩
  SQCJ = '18', //申请彩金
  GCDT = '19', //购彩大厅
  HYZX = '20', //会员中心
  CZ = '21', //充值
  TX = '22', //提现
  EDZH = '23', //额度转换
  JSZD = '24', //即使注单
  JRSY = '25', //今日输赢
  KJJG = '26', //开奖结果
  DQBB = '27', //当前版本号
  ZHGL = '28', //资金明细
  HDNB = '29', //回电脑版
  FHSY = '30', //返回首页
  TCDL = '31', //退出登录
  TZJL = '32', //投注记录
  CZGZ = '33', //彩种规则
  HBJL = '36', //红包记录
  SLJL = '37', //扫雷记录
  AQZX = '100', //安全中心
  YHK = '101', //银行卡管理
}

export class ANHelper extends ANEvent {
  // 监听安卓事件
  static addEvent = ANEvent.addEvent;

  // 移除安卓事件
  static removeEvents = ANEvent.removeEvents;

  /**
   * CallBack调用安卓函数
   *
   * @param type 当前类型
   * @param back 返回值
   * @param data 参数
   */
  static callSync(type: CMD, data?: {[x: string]: any}): any|null {
    return this.core.executeSync(
      JSON.stringify({
        type: type,
        ...data,
      })
    );
  }

  /**
   * Promise 调用安卓函数
   *
   * @param type 当前类型
   * @param data 参数
   */
  static callAsync(type: CMD, data?: {[x: string]: any}): Promise<any|null> {
    return this.core.executeCmd(
      JSON.stringify({
        type: type,
        ...data,
      }),
    );
  }

  static setup() {
    super.setup();

    // 设置接口域名
    this.callAsync(CMD.APP_HOST).then((host?: string) => {
      AppDefine.host = host;
      httpClient.defaults.baseURL = host
    });

    // 设置站点编号
    this.callAsync(CMD.APP_SITE).then((siteId?: string) => {
      AppDefine.siteId = siteId;
    });
  }
}
