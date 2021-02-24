import { SampleAPI } from "../DoySessionModel";
import login from "../model/user/login";
import reg from "../model/user/reg";


export class api_user {
  static c = new SampleAPI('user');

  // 登录
  static login(usr: string, pwd: string) {
    return this.c.post<login>('login', { usr, pwd: pwd?.md5() })
  }


  // 退出登录
  static logout() {
    return this.c.post<null>('logout', {})
  }

  // 注册
  static reg(usr: string, pwd: string, realName: string,) {
    return this.c.post<reg>('reg', { usr, pwd: pwd?.md5(), realName, device: 2 })
  }
}