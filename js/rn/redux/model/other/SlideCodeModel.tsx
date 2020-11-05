// 滑动验证字段
export default class SlideCodeModel {
  // 拿到的字段
  nc_csessionid?: string
  nc_token: string
  nc_value?: string
  nc_sig: string

  // 提交需要把 nc_csessionid字段改为nc_sid
  nc_sid: string

  constructor(sc: SlideCodeModel) {
    for (const key in sc) {
      this[key] = sc[key]
    }
    this.nc_sid = sc?.nc_csessionid
  }
}
