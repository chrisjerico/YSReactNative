import { Alert, Platform } from "react-native";
import { ANHelper } from "../../../public/define/ANHelper/ANHelper";
import { CMD } from "../../../public/define/ANHelper/hp/CmdDefine";
import { NA_DATA } from "../../../public/define/ANHelper/hp/DataDefine";
import { OCHelper } from "../../../public/define/OCHelper/OCHelper";
import PushHelper from "../../../public/define/PushHelper";
import { Data } from "../../../public/network/Model/LoginModel";
import { AvatarModel } from "../../../public/network/Model/SystemAvatarListModel";
import { api } from "../../../public/network/NetworkRequest1/NetworkRequest1";
import { UGStore } from "../../store/UGStore";

export class UGLoginModel {
  'API-SID'?: string; // sessid
  'API-TOKEN'?: string; // token
  needFullName?: boolean; // 登录是否需要验证真实姓名

  // 自定义参数
  sessid?: string;
  token?: string;
  static getToken() {
    const user = UGStore.globalProps?.userInfo;
    return user.sessid ?? user["API-SID"];
  }
}

export default class UGUserModel extends UGLoginModel {
  static async updateFromYS() {
    let user;
    switch (Platform.OS) {
      case "ios":
        user = await OCHelper.call('UGUserModel.currentUser');
        break;
      case "android":
        user = await ANHelper.callAsync(CMD.LOAD_DATA, { key: NA_DATA.USER_INFO });
        break;
    }
    if (!user) {
      UGStore.dispatch({ type: 'reset', userInfo: {} });
    } else {
      UGStore.dispatch({ type: 'merge', userInfo: user });
    }
    UGStore.save();
  }
  static updateFromNetwork(completed?: () => void) {
    return api.user.info().useSuccess(({ data: user }, sm) => {
      sm.noShowErrorHUD = true;
      UGStore.dispatch({ type: 'merge', userInfo: user })
      UGStore.save();
      completed && completed();

      // 更新原生数据
      if (Platform.OS == 'ios' && user && Object.keys(user).length) {
        OCHelper.call('UGUserModel.currentUser.setValuesWithDictionary:', [user]);
      }
    })
  }
  static getYS(user: UGLoginModel | Data): UGUserModel {
    var temp = Object.assign(new UGUserModel(), user);
    temp['clsName'] = 'UGUserModel';
    temp.sessid = user['API-SID'];
    temp.token = user['API-TOKEN'];
    return temp;
  }
  static checkLogin() {
    const { isTest, uid } = UGStore.globalProps.userInfo
    if (!isTest && uid?.length) return true;

    if (!uid?.length) {
      Alert.alert("温馨提示", "您还未登录", [
        { text: "取消", onPress: () => { }, style: "cancel" },
        { text: "马上登录", onPress: () => { PushHelper.pushLogin() }, }
      ])
    } else if (isTest) {
      Alert.alert("温馨提示", "请登录正式账号", [
        { text: "取消", onPress: () => { }, style: "cancel" },
        { text: "马上登录", onPress: () => { PushHelper.pushLogin() }, }
      ])
    }
    return false;
  }

  uid?: string; // 用户ID
  avatar?: string; // 头像
  balance?: string; // 余额
  usr?: string; // 昵称
  fullName?: string; // 全名
  chatRoomNickname?: string; // 聊天室昵称
  email?: string; // email
  phone?: string; // 手机号
  qq?: string; // QQ号
  wx?: string; // 微信号
  clientIp?: string; // 用户当前的ip地址
  isLhcdocVip?: string; // 是否是六合文档的VIP "1"
  curLevelInt?: string; // 当级经验值 "100000"
  curLevelGrade?: string; // 等级 "VIP4"
  curLevelTitle?: string; // 头衔 "黄金"
  nextLevelInt?: string; // 下级经验值 "100000"
  nextLevelGrade?: string; // 等级 "VIP5"
  nextLevelTitle?: string; // 头衔 "铂金"
  taskReward?: string; // 成长值 "19073.0000"
  taskRewardTotal?: string; // 总成长值 "20498.5000"
  taskRewardTitle?: string; // 成长标题 "阿西"
  todayWinAmount?: string; // 今日输赢金额 "0.00"
  unsettleAmount?: string; // 未结金额 "10.00"

  playedRealGames?: Array<string>; // 玩过的真人游戏

  allowMemberCancelBet?: boolean; // 是否允许会员撤单
  chatRoomSwitch?: boolean; // 是否是开启聊天室
  hasActLottery?: boolean; // 是否显示活动彩金
  hasBankCard?: boolean; // 是否已绑定银行卡
  hasFundPwd?: boolean; // 是否已设置取款密码
  isAgent?: boolean; // 是否是代理
  googleVerifier?: boolean; // 是否开启google验证
  isBindGoogleVerifier?: boolean; // 判断会员是否绑定谷歌验证码
  isTest?: boolean; // 是否试玩账号
  yuebaoSwitch?: boolean; // 是否是开启利息宝

  unreadFaq?: number;
  unreadMsg?: number; // 站内信未读消息数量
}
