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

  // 获取站内消息列表
  msgList(page=1, rows=20) {
    return CCSessionReq.get(this.c + arguments.callee.name, {page:page,rows:rows});
  }

  // 获取资金明细
  fundLogs(startTime:string, endTime?:string, page=1, rows=20) {
    return CCSessionReq.get(this.c + arguments.callee.name, {startTime:startTime, endTime:endTime, page:page, rows:rows});
  }

  // 设置取款密码
  addFundPwd(login_pwd:string, fund_pwd:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {login_pwd:login_pwd, fund_pwd:fund_pwd});
  }

  // 修改登录密码
  changeLoginPwd(old_pwd:string, new_pwd:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {old_pwd:old_pwd, new_pwd:new_pwd});
  }

  // 修改取款密码
  changeFundPwd(old_pwd:string, new_pwd:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {old_pwd:old_pwd, new_pwd:new_pwd});
  }

  // 取消注单
  cancelBet(orderId:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {orderId:orderId});
  }

  // 游客投注（待完善）
  guestBet() {
    return CCSessionReq.post(this.c + arguments.callee.name);
  }

  // 用户投注（待完善）
  bet() {
    return CCSessionReq.post(this.c + arguments.callee.name);
  }
  
  // 即时投注（待完善）
  instantBet() {
    return CCSessionReq.post(this.c + arguments.callee.name);
  }

  // 提交反馈
  addFeedback(type:string, pid:string, content:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {type:type, pid:pid, content:content});
  }

  // 刪除全部站內信
  deleteMsgAll() {
    return CCSessionReq.post(this.c + arguments.callee.name);
  }

  // 反馈列表
  myFeedback(type:number, date:string, isReply:boolean, page=1, rows=20) {
    return CCSessionReq.get(this.c + arguments.callee.name, {type:type, date:date, isReply:isReply, page:page, rows:rows});
  }

  // 全部站內信全部已读
  readMsgAll() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 反馈详情
  feedbackDetail(pid:string) {
    return CCSessionReq.get(this.c + arguments.callee.name, {pid:pid});
  }

  // 单条消息已读
  readMsg(id:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {id:id});
  }

  // 常用登录地点列表
  address() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 更新常用登录地点（待完善）
  changeAddress() {
    return CCSessionReq.post(this.c + arguments.callee.name);
  }

  // 删除常用登录地点
  delAddress(id:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {id:id});
  }

  // 下注明细列表
  lotteryDayStat(date:string) {//日期2020-06-27
    return CCSessionReq.post(this.c + arguments.callee.name, {date:date});
  }

  // 我的提款账户列表
  bankCard() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 设置真实姓名
  profileName(fullName:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {fullName:fullName});
  }

  // 绑定提款账户
  bindBank(
    type: number,//1银行卡，2支付宝，3微信，4虚拟币
    bank_id: string, //提款渠道ID
    bank_addr: string, // 银行:开户地址，支付宝:不填，微信:手机号，虚拟币:链名称
    bank_card: string, // 银行卡号，或支付宝，或微信号，或虚拟币收款号
    ) {
    return CCSessionReq.post(this.c + arguments.callee.name, {type:type, bank_id:bank_id, bank_addr:bank_addr, bank_card:bank_card});
  }

  // 获取头像配置
  getAvatarSetting() {
    return CCSessionReq.post(this.c + arguments.callee.name);
  }

  // 修改头像
  updateAvatar(publicAvatarId:string) {// 公用头像ID
    return CCSessionReq.post(this.c + arguments.callee.name, {publicAvatarId:publicAvatarId});
  }

  // 上传身份证（待完善）
  uploadIdentity(files) {
    return CCSessionReq.post(this.c + arguments.callee.name);
  }

  

}

