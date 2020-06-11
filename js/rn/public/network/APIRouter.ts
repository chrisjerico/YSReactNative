import { httpClient } from './httpClient';
import { HomeGamesModel } from './Model/HomeGamesModel';
import { RankListModel } from './Model/RankListModel';
import { BannerModel } from './Model/BannerModel';
import { NoticeModel } from './Model/NoticeModel';
import SlideCodeModel from '../../redux/model/other/SlideCodeModel';
import { LoginModel } from './Model/LoginModel';
import { UGStore } from '../../redux/store/UGStore';
import { OCHelper } from '../define/OCHelper/OCHelper';
import { BalanceModel } from './Model/BalanceModel';
import { OnlineModel } from './Model/OnlineModel';
import { RegisterModel } from './Model/RegisterModel';
//api 統一在這邊註冊
//httpClient.["method"]<DataModel>

class APIRouter {
    /**
     * 首頁遊戲資料
     */
    static game_homeGames = () => {
        return httpClient.get<HomeGamesModel>('c=game&a=homeGames')
    }
    /**
    * 輪播圖
    */
    static system_banners = () => {
        return httpClient.get<BannerModel>('c=system&a=banners')
    }
    /**
    * 跑馬燈
    */
    static notice_latest = () => {
        return httpClient.get<NoticeModel>("c=notice&a=latest")
    }
    /**
    * 優惠活動
    */
    static system_promotions = () => {
        return httpClient.get("c=system&a=promotions")
    }
    static user_info = () => {
        return httpClient.get("c=user&a=info")
    }
    static activity_redBagDetail = () => {
        return httpClient.get("c=activity&a=redBagDetail")
    }
    static system_floatAds = () => {
        return httpClient.get("c=system&a=floatAds")
    }
    static system_rankingList = () => {
        return httpClient.get<RankListModel>("c=system&a=rankingList")
    }
    static user_login = (uname: string, pwd: string, googleCode?: string, slideCode?: SlideCodeModel) => {
        if (slideCode) {
            slideCode = SlideCodeModel.get(slideCode);
        }
        return httpClient.post<LoginModel>('c=user&a=login', { usr: uname, pwd: pwd, ggCode: googleCode, ...slideCode });
    }
    static user_balance_token = async () => {
        const user = await OCHelper.call('UGUserModel.currentUser');
        return httpClient.get<BalanceModel>("c=user&a=balance&token=" + user.token)
    }
    static system_onlineCount = async () => {
        return httpClient.get<OnlineModel>("c=system&a=onlineCount")
    }
    static user_logout = async () => {
        const user = await OCHelper.call('UGUserModel.currentUser');
        return httpClient.post<any>("c=user&a=logout", {
            token: user?.token
        })
    }
    static secure_imgCaptcha = async () => {
        const accessToken = await OCHelper.call('OpenUDID.value');
        return httpClient.get("c=secure&a=imgCaptcha", {
            params: {
                accessToken: accessToken
            }
        })
    }
    static user_reg = async (params: {
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
        regType: 'user' | 'agent'; // 用户注册 或 代理注册,
        device: string,
        accessToken: string
    }) => {
        var accessToken = await OCHelper.call('OpenUDID.value');
        params = { ...params, device: '3', accessToken: accessToken, }
        debugger
        return httpClient.post<RegisterModel>('c=user&a=reg', params);
    }
}
export default APIRouter