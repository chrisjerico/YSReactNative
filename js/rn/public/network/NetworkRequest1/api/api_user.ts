import { CCSessionModel, CCSessionReq } from './../CCSessionModel';
import { Platform } from "react-native";
import SlideCodeModel from "../../../../redux/model/other/SlideCodeModel";
import UGUserModel, { UGLoginModel } from "../../../../redux/model/全局/UGUserModel";
import { ANHelper } from "../../../define/ANHelper/ANHelper";
import { CMD } from "../../../define/ANHelper/hp/CmdDefine";
import { OCHelper } from "../../../define/OCHelper/OCHelper";
import { Data } from "../../Model/RegisterModel";



export class api_user {
  c = 'c=user&a=';

  // 获取用户信息（我的页）
  info() {
    return CCSessionReq.get<UGUserModel>(this.c + arguments.callee.name);
  }

  // 登录
  login(uname: string, pwd: string, googleCode?: string, slideCode?: SlideCodeModel) {
    return CCSessionReq.post<UGLoginModel>(this.c + arguments.callee.name, { usr: uname, pwd: pwd, ggCode: googleCode, slideCode: slideCode });
  }

  // 注册
  async reg(params: {
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
  }) {
    let accessToken = "";
    switch (Platform.OS) {
      case 'ios':
        accessToken = await OCHelper.call('OpenUDID.value');
        break;
      case 'android':
        accessToken = await ANHelper.callAsync(CMD.ACCESS_TOKEN)
        break;
    }
    params = Object.assign({ device: '3', accessToken: accessToken }, params);
    return CCSessionReq.post<Data>(this.c + arguments.callee.name, params);
  }

  // 检查用户是否已存在
  exists(usr: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { usr: usr });
  }

  // 退出登录
  logout() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 登录试玩账号
  guestLogin() {
    return CCSessionReq.post(this.c + arguments.callee.name, {
      usr: '46da83e1773338540e1e1c973f6c8a68',
      pwd: '46da83e1773338540e1e1c973f6c8a68',
    });
  }

}

