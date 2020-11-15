import { CCSessionReq, SampleAPI } from "../CCSessionModel";


export class api_oauth {
  static c = new SampleAPI('c=oauth&a=');

  // 是否已绑定Facebook
  static hasBind(uuid:string, platform='facebook') {
    return this.c.get('hasBind', {uuid:uuid, platform:platform});
  }

  // 解除三方绑定
  static unbind(platform='facebook') {
    return this.c.post('unbind', {platform:platform});
  }

  // 访问无密码登录接口（接口待调试）
  static login(uuid:string, name:string, platform='facebook') {
    return this.c.post('login', {uuid:uuid, name:name, platform:platform});
  }

  // 绑定Facebook
  static bindAccount(uuid:string, name:string, usr:string, pwd:string, platform='facebook') {
    return this.c.post('bindAccount', {uuid:uuid, name:name, usr:usr, pwd:pwd, platform:platform});
  }
}