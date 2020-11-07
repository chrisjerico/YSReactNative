import { CCSessionReq } from "../CCSessionModel";


export class api_oauth {
  c = 'c=oauth&a=';

  // 是否已绑定Facebook
  hasBind(uuid:string, platform='facebook') {
    return CCSessionReq.get(this.c + arguments.callee.name, {uuid:uuid, platform:platform});
  }

  // 解除三方绑定
  unbind(platform='facebook') {
    return CCSessionReq.post(this.c + arguments.callee.name, {platform:platform});
  }

  // 访问无密码登录接口（接口待调试）
  login(uuid:string, name:string, platform='facebook') {
    return CCSessionReq.post(this.c + arguments.callee.name, {uuid:uuid, name:name, platform:platform});
  }

  // 绑定Facebook
  bindAccount(uuid:string, name:string, usr:string, pwd:string, platform='facebook') {
    return CCSessionReq.post(this.c + arguments.callee.name, {uuid:uuid, name:name, usr:usr, pwd:pwd, platform:platform});
  }
}