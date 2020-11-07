import { CCSessionReq } from './../CCSessionModel';


export class api_secure {
  c = 'c=secure&a=';

  // 发送短信验证码
  smsCaptcha(phone: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { phone: phone });
  }

  // 图形验证码（待获取accessToken）
  imgCaptcha() {
    const accessToken = undefined;
    return CCSessionReq.get(this.c + arguments.callee.name, { accessToken: accessToken });
  }

  // 个人中心谷歌验证相关操作
  gaCaptcha(
    action: string,// bind绑定，unbind解绑，gen生成二维码
    code?: string,// 谷歌验证码（绑定、解绑时必填）
  ) {
    return CCSessionReq.get(this.c + arguments.callee.name, { action: action, code: code });
  }
}