import { CCSessionModel, CCSessionReq, SampleAPI } from './../CCSessionModel';
import { Platform } from "react-native";
import SlideCodeModel from "../../../../redux/model/other/SlideCodeModel";
import UGUserModel, { UGLoginModel } from "../../../../redux/model/全局/UGUserModel";
import { ANHelper } from "../../../define/ANHelper/ANHelper";
import { CMD } from "../../../define/ANHelper/hp/CmdDefine";
import { OCHelper } from "../../../define/OCHelper/OCHelper";
import { Data } from "../../Model/RegisterModel";
import { AvatarSettingModel } from '../../Model/SystemAvatarListModel';



export class api_user {
  static c = new SampleAPI('c=user&a=');

  // 获取用户信息（我的页）
  static info() {
    return this.c.get<UGUserModel>('info');
  }

  // 登录
  static login(uname: string, pwd: string, googleCode?: string, slideCode?: SlideCodeModel, fullName?:string) {
    return this.c.post<UGLoginModel>('login', { usr: uname, pwd: pwd, ggCode: googleCode, slideCode: slideCode, fullName:fullName });
  }

  // 注册
  static async reg(params: {
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
    return this.c.post<Data>('reg', params);
  }

  // 检查用户是否已存在
  static exists(usr: string) {
    return this.c.post('exists', { usr: usr });
  }

  // 退出登录
  static logout() {
    return this.c.post('logout');
  }

  // 登录试玩账号
  static guestLogin() {
    return this.c.post('guestLogin', {
      usr: '46da83e1773338540e1e1c973f6c8a68',
      pwd: '46da83e1773338540e1e1c973f6c8a68',
    });
  }

  // 获取站内消息列表
  static msgList(page=1, rows=20) {
    return this.c.get('msgList', {page:page,rows:rows});
  }

  // 获取资金明细
  static fundLogs(startTime:string, endTime?:string, page=1, rows=20) {
    return this.c.get('fundLogs', {startTime:startTime, endTime:endTime, page:page, rows:rows});
  }

  // 设置取款密码
  static addFundPwd(login_pwd:string, fund_pwd:string) {
    return this.c.post('addFundPwd', {login_pwd:login_pwd, fund_pwd:fund_pwd});
  }

  // 修改登录密码
  static changeLoginPwd(old_pwd:string, new_pwd:string) {
    return this.c.post('changeLoginPwd', {old_pwd:old_pwd, new_pwd:new_pwd});
  }

  // 修改取款密码
  static changeFundPwd(old_pwd:string, new_pwd:string) {
    return this.c.post('changeFundPwd', {old_pwd:old_pwd, new_pwd:new_pwd});
  }

  // 取消注单
  static cancelBet(orderId:string) {
    return this.c.post('cancelBet', {orderId:orderId});
  }

  // 游客投注（待完善）
  static guestBet() {
    return this.c.post('guestBet');
  }

  // 用户投注（待完善）
  static bet() {
    return this.c.post('bet');
  }
  
  // 即时投注（待完善）
  static instantBet() {
    return this.c.post('instantBet');
  }

  // 提交反馈
  static addFeedback(type:string, pid:string, content:string) {
    return this.c.post('addFeedback', {type:type, pid:pid, content:content});
  }

  // 刪除全部站內信
  static deleteMsgAll() {
    return this.c.post('deleteMsgAll');
  }

  // 反馈列表
  static myFeedback(type:number, date:string, isReply:boolean, page=1, rows=20) {
    return this.c.get('myFeedback', {type:type, date:date, isReply:isReply, page:page, rows:rows});
  }

  // 全部站內信全部已读
  static readMsgAll() {
    return this.c.get('readMsgAll');
  }

  // 反馈详情
  static feedbackDetail(pid:string) {
    return this.c.get('feedbackDetail', {pid:pid});
  }

  // 单条消息已读
  static readMsg(id:string) {
    return this.c.post('readMsg', {id:id});
  }

  // 常用登录地点列表
  static address() {
    return this.c.get('address');
  }

  // 更新常用登录地点（待完善）
  static changeAddress() {
    return this.c.post('changeAddress');
  }

  // 删除常用登录地点
  static delAddress(id:string) {
    return this.c.post('delAddress', {id:id});
  }

  // 下注明细列表
  static lotteryDayStat(date:string) {//日期2020-06-27
    return this.c.post('lotteryDayStat', {date:date});
  }

  // 我的提款账户列表
  static bankCard() {
    return this.c.get('bankCard');
  }

  // 设置真实姓名
  static profileName(fullName:string) {
    return this.c.post('profileName', {fullName:fullName});
  }

  // 绑定提款账户
  static bindBank(
    type: number,//1银行卡，2支付宝，3微信，4虚拟币
    bank_id: string, //提款渠道ID
    bank_addr: string, // 银行:开户地址，支付宝:不填，微信:手机号，虚拟币:链名称
    bank_card: string, // 银行卡号，或支付宝，或微信号，或虚拟币收款号
    ) {
    return this.c.post('bindBank', {type:type, bank_id:bank_id, bank_addr:bank_addr, bank_card:bank_card});
  }

  // 获取头像配置
  static getAvatarSetting() {
    return this.c.post<AvatarSettingModel>('getAvatarSetting');
  }

  // 修改头像
  static updateAvatar(publicAvatarId:string) {// 公用头像ID
    return this.c.post('updateAvatar', {publicAvatarId:publicAvatarId});
  }

  // 上传头像
  static uploadAvatar(files: string) {// 图片文件路径
    return this.c.post<{isReview:boolean}>('uploadAvatar', {}, {files:files});
  }

  // 上传身份证（待完善）
  static uploadIdentity(files) {
    return this.c.post('uploadIdentity');
  }

}

