// 滑动验证字段
export default class SlideCodeModel {
  // 拿到的字段
  nc_csessionid: string;
  nc_token: string;
  nc_value: string;

  // 提交的字段
  'slideCode[nc_sid]': string;
  'slideCode[nc_token]': string;
  'slideCode[nc_sig]': string;

  static get(scm: SlideCodeModel): SlideCodeModel {
    var temp = new SlideCodeModel();
    temp['slideCode[nc_sid]'] = scm['slideCode[nc_sid]'] ?? scm.nc_csessionid;
    temp['slideCode[nc_sig]'] = scm['slideCode[nc_sig]'] ?? scm.nc_value;
    temp['slideCode[nc_token]'] = scm['slideCode[nc_token]'] ?? scm.nc_token;
    return temp;
  }
}
