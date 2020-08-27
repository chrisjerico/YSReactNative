import { AxiosResponse } from "axios";
import { Platform } from "react-native";
import SlideCodeModel from '../../redux/model/other/SlideCodeModel';
import { ANHelper } from "../define/ANHelper/ANHelper";
import { CMD } from "../define/ANHelper/hp/CmdDefine";
import { OCHelper } from '../define/OCHelper/OCHelper';
import { UGStore } from './../../redux/store/UGStore';
import { CachePolicyEnum, httpClient } from './httpClient';
import { BalanceModel } from './Model/BalanceModel';
import { BannerModel } from './Model/BannerModel';
import { FloatADModel } from './Model/FloatADModel';
import { HomeADModel } from './Model/HomeADModel';
import { HomeGamesModel } from './Model/HomeGamesModel';
import { LhcdocCategoryListModel } from './Model/LhcdocCategoryListModel';
import { LoginModel } from './Model/LoginModel';
import { LottoGamesModel } from './Model/LottoGamesModel';
import { NoticeModel } from './Model/NoticeModel';
import { OnlineModel } from './Model/OnlineModel';
import { PlayOddDataModel } from './Model/PlayOddDataModel';
import { PromotionsModel } from './Model/PromotionsModel';
import { RankListModel } from './Model/RankListModel';
import { RedBagDetailActivityModel } from './Model/RedBagDetailActivityModel';
import { RegisterModel } from './Model/RegisterModel';
import { SystemAvatarListModel } from './Model/SystemAvatarListModel';
import { SystemConfigModel } from './Model/SystemConfigModel';
import { TaskChangeAvatarModel } from './Model/TaskChangeAvatarModel';
import { TurntableListModel } from './Model/TurntableListModel';
import { YueBaoStatModel } from './Model/YueBaoStatModel';
//api 統一在這邊註冊
//httpClient.["method"]<DataModel>
export interface UserReg {
  inviter?: string; // 推荐人ID
  usr?: string; // 账号
  pwd?: string; // 密码
  fundPwd?: string; // 取款密码
  fullName?: string; // 真实姓名
  qq?: string; // QQ号
  wx?: string; // 微信号
  phone?: string; // 手机号
  smsCode?: string; // 短信验证码
  imgCode?: string; // 字母验证码,
  "slideCode[nc_sid]"?: string;
  "slideCode[nc_token]"?: string;
  "slideCode[nc_sig]"?: string;
  email?: string; // 邮箱
  regType: 'user' | 'agent'; // 用户注册 或 代理注册,
  device?: string;
  accessToken?: string;
  slideCode?: any;
}

class APIRouter {
  /**
   * 首頁遊戲資料
   */
  static game_homeGames = async () => {
    return httpClient.get<HomeGamesModel>('c=game&a=homeGames')
  }
  /**
  * 輪播圖
  */
  static system_banners = async () => {
    return httpClient.get<BannerModel>('c=system&a=banners')
  }
  /**
  * 跑馬燈
  */
  static notice_latest = async () => {
    return httpClient.get<NoticeModel>("c=notice&a=latest")
  }
  /**
  * 優惠活動
  */
  static system_promotions = async () => {
    return httpClient.get<PromotionsModel>("c=system&a=promotions")
  }
  static user_info = async () => {
    let tokenParams = "";
    switch (Platform.OS) {
      case "ios":
        let user = await OCHelper.call('UGUserModel.currentUser');
        tokenParams = 'token=' + user?.token;
        break;
      case "android":
        tokenParams = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS,
          { blGet: true, });
        break;
    }

    if (tokenParams) {
      return httpClient.get("c=user&a=info&" + tokenParams)
    } else {
      return Promise.reject({
        msg: 'no token'
      })
    }
  }
  static user_guestLogin = async () => {
    return httpClient.post<LoginModel>("c=user&a=guestLogin", {
      usr: '46da83e1773338540e1e1c973f6c8a68',
      pwd: '46da83e1773338540e1e1c973f6c8a68',
    })
  }
  static activity_redBagDetail = async () => {
    // return httpClient.get<RedBagDetailActivityModel>("c=activity&a=redBagDetail")
    let tokenParams = "";
    switch (Platform.OS) {
      case "ios":
        let user = await OCHelper.call('UGUserModel.currentUser');
        tokenParams = 'token=' + user?.token;
        break;
      case "android":
        tokenParams = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS,
          { blGet: true, });
        break;
    }

    return httpClient.get<RedBagDetailActivityModel>("c=activity&a=redBagDetail&" + tokenParams)
  }
  static activity_turntableList = () => {
    if (UGStore.globalProps.userInfo?.isTest) {
      return {};
    }
    return httpClient.get<TurntableListModel>("c=activity&a=turntableList")
  }
  static system_floatAds = async () => {
    return httpClient.get<FloatADModel>("c=system&a=floatAds")
  }
  static system_rankingList = async () => {
    return httpClient.get<RankListModel>("c=system&a=rankingList")
  }
  static user_login = async (uname: string, pwd: string, googleCode?: string, slideCode?: SlideCodeModel) => {
    try {
      if (slideCode) {
        slideCode = SlideCodeModel?.get(slideCode);
      }
      return httpClient.post<LoginModel>('c=user&a=login', { usr: uname, pwd: pwd, ggCode: googleCode, ...slideCode }, {
        noToken: true
      } as any);
    } catch (error) {
      throw error
    }
  }
  static user_balance_token = async () => {
    let tokenParams = "";
    switch (Platform.OS) {
      case "ios":
        let user = await OCHelper.call('UGUserModel.currentUser');
        tokenParams = 'token=' + user?.token;
        break;
      case "android":
        tokenParams = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS,
          { blGet: true, });
        break;
    }

    return httpClient.get<BalanceModel>("c=user&a=balance&" + tokenParams)
  }
  static system_onlineCount = async () => {
    return httpClient.get<OnlineModel>("c=system&a=onlineCount")
  }
  static user_logout = async () => {
    let tokenParams = {};
    switch (Platform.OS) {
      case "ios":
        let user = await OCHelper.call('UGUserModel.currentUser');
        tokenParams = {
          token: user?.token
        }
        break;
      case "android":
        let mapStr = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS);
        tokenParams = JSON.parse(mapStr)
        break;
    }

    return httpClient.post<any>("c=user&a=logout", tokenParams)
  }
  static secure_imgCaptcha = async () => {
    let accessToken = "";
    switch (Platform.OS) {
      case 'ios':
        accessToken = await OCHelper.call('OpenUDID.value');
        break;
      case 'android':
        accessToken = await ANHelper.callAsync(CMD.ACCESS_TOKEN)
        break;
    }
    return httpClient.get("c=secure&a=imgCaptcha", {
      params: {
        accessToken: accessToken
      }
    })
  }
  static secure_smsCaptcha = async (phone) => {
    return httpClient.post('c=secure&a=smsCaptcha', { phone: phone });
  }

  static system_config = async () => {
    return httpClient.get<SystemConfigModel>("c=system&a=config")
  }

  static user_reg = async (params: UserReg) => {
    try {
      let accessToken = "";
      switch (Platform.OS) {
        case 'ios':
          accessToken = await OCHelper.call('OpenUDID.value');
          break;
        case 'android':
          accessToken = await ANHelper.callAsync(CMD.ACCESS_TOKEN)
          break;
      }
      return httpClient.post<RegisterModel>('c=user&a=reg', {
        ...params, device: '3', accessToken: accessToken,
      }, {
        noToken: true
      } as any)
    } catch (error) {
      throw error
    }
  }

  static lhcdoc_categoryList = async () => {
    return httpClient.get<LhcdocCategoryListModel>('c=lhcdoc&a=categoryList');
  };

  static lhcdoc_lotteryNumber = async () => {
    return httpClient.get('c=lhcdoc&a=lotteryNumber');
  };
  static game_lotteryGames = async (): Promise<AxiosResponse<LottoGamesModel>> => {
    //@ts-ignore
    return httpClient.get<LottoGamesModel>('c=game&a=lotteryGames', {
      //@ts-ignore
      isEncrypt: false,
      cachePolicy: CachePolicyEnum?.cacheByTime,
      expiredTime: 3
    });
  }
  static game_playOdds = async (id: string): Promise<AxiosResponse<PlayOddDataModel>> => {
    return httpClient.get("c=game&a=playOdds&id=" + id, {
      //@ts-ignore
      isEncrypt: false
    })
  }

  static system_avatarList = async () => {
    return httpClient.get<SystemAvatarListModel>('c=system&a=avatarList');
  };

  static task_changeAvatar = async (filename: string) => {
    let tokenParams = {};
    switch (Platform.OS) {
      case "ios":
        let user = await OCHelper.call('UGUserModel.currentUser');
        tokenParams = {
          token: user?.token,
          filename
        }
        break;
      case "android":
        let mapStr = await ANHelper.callAsync(CMD.ENCRYPTION_PARAMS);
        tokenParams = {
          ...JSON.parse(mapStr),
          filename
        }
        break;
    }
    return httpClient.post<TaskChangeAvatarModel>("c=task&a=changeAvatar", tokenParams)
  };

  static system_homeAds = async () => {
    return httpClient.get<HomeADModel>("c=system&a=homeAds")
  }
  static language_getLanguagePackage = async (lanCode: string) => {
    return httpClient.get("c=language&a=getLanguagePackage&languageCode=" + lanCode,
      {
        //@ts-ignore
        isEncrypt: false
      })
  }
  static language_getConfigs = async () => {
    return httpClient.get("c=language&a=getConfigs")
  }
  static yuebao_stat = async () => {
    return httpClient.get<YueBaoStatModel>("c=yuebao&a=stat")
  }
}
export default APIRouter
