import moment from "moment";

class DateUtil {
  /**
   * 例如:2017-06-28 10:48:46转成date类,
   * 可把- replace成/
   * @param dateString
   * @return Date
   */
  static parserDateString(dateString) {
    if (dateString) {
      let regEx = new RegExp("\\-", "gi");
      let validDateStr = dateString.replace(regEx, "/");
      let milliseconds = Date.parse(validDateStr);
      return new Date(milliseconds);

    }
  }

  // timestamp时间戳  formater时间格式  
  /**
* 例如:把'1608865442000' 转成对应格式 'MM月dd日' 字符串
* @param timestamp  时间搓
* @param formater   时间格式
* @return string
*/
  static stampformat(timestamp: string, formater: string) {
    if (!timestamp) return '';
    formater = (formater != null) ? formater : 'yyyy-MM-dd hh:mm';
    if (timestamp.length == 13) {
      let strInt = parseInt(timestamp)
      return moment(strInt).format(formater)
    }
    else {
      let str = timestamp + '000'
      let strInt = parseInt(str)
      return moment(strInt).format(formater)
    }

  }


  /**
  * 例如:把'2012-12-31' 转成对应格式 'MM月dd日' 字符串
  * @param numberStr  '2012-12-31'
  * @param dateString 'MM月dd日' 格式
  * @return string
  */
  static formatTime(numberStr: string, format: string) {
    if (!numberStr) return '';
    const date = moment(numberStr).toDate();//转Date
    var nowtime = date.format(format); //调用
    return nowtime;
  }

  /**
 * 例如:把两时间字符串求出他们的时间差
 * @param data1Str  '2016-10-11 18:06:03'
 * @param data2Str  '2015-10-11 18:06:03'
 * @param type  years months days minutes seconds
 * @return number
 */
  static diff(data1Str: string, data2Str: string, type?: string) {

  return  moment(data1Str).diff(moment(data2Str), 'seconds')

    // let returnNum :number;
    // switch (type) {
    //   case 'years':
    //     returnNum = moment(data1Str).diff(moment(data2Str), 'years')
    //     break;
    //   case 'months':
    //     returnNum = moment(data1Str).diff(moment(data2Str), 'months')
    //     break;
    //   case 'days':
    //     returnNum = moment(data1Str).diff(moment(data2Str), 'days')
    //     break;
    //   case 'minutes':
    //     returnNum = moment(data1Str).diff(moment(data2Str), 'minutes')
    //     break;
    //   case 'seconds':
    //     returnNum = moment(data1Str).diff(moment(data2Str), 'seconds')
    //     break;

    //   default:
    //     returnNum = moment(data1Str).diff(moment(data2Str), 'seconds')
    //     break;
    // }
    // return  returnNum
  } 
}
export default DateUtil;