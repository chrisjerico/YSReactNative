import { CCSessionReq, SampleAPI } from './../CCSessionModel';


export class api_secure {
  static c = new SampleAPI('c=secure&a=');

  // 发送短信验证码
  static smsCaptcha(phone: string) {
    return this.c.post('smsCaptcha', { phone: phone });
  }

  // 图形验证码（待获取accessToken）
  static imgCaptcha() {
    const accessToken = undefined;
    return this.c.get('imgCaptcha', { accessToken: accessToken });
  }

  // 个人中心谷歌验证相关操作
  static gaCaptcha(
    action: string,// bind绑定，unbind解绑，gen生成二维码
    code?: string,// 谷歌验证码（绑定、解绑时必填）
  ) {
    return this.c.get('gaCaptcha', { action: action, code: code });
  }
}