import moment from "moment";

class DateUtil{
  /**
   * 例如:2017-06-28 10:48:46转成date类,
   * 可把- replace成/
   * @param dateString
   * @return Date
   */
  static parserDateString(dateString){
      if(dateString){
          let regEx = new RegExp("\\-","gi");
          let validDateStr=dateString.replace(regEx,"/");
          let milliseconds=Date.parse(validDateStr);
          return new Date(milliseconds);

      }
  }

  // timestamp时间戳  formater时间格式  
     /**
   * 例如:把'1608865442000' 转成对应格式 'MM月dd日' 字符串
   * @param timestamp
   * @param formater
   * @return string
   */ 
  static stampformat(timestamp:string, formater :string) { 
    if (!timestamp)return '';
      formater = (formater != null)? formater : 'yyyy-MM-dd hh:mm';

      console.log('timestamp',timestamp );
      
      if (timestamp.length  == 13) {
        let strInt = parseInt(timestamp)
      return moment(strInt).format(formater)
      }
      else
      {
         let str = timestamp + '000'
        let strInt = parseInt(str)
        console.log('strInt=========',strInt);
        return moment(strInt).format(formater)
      }
     
  }


   /**
   * 例如:把'2012-12-31' 转成对应格式 'MM月dd日' 字符串
   * @param numberStr
   * @param dateString
   * @return string
   */
  static formatTime(numberStr:string, format:string) {
    if (!numberStr)return '';
    const date = moment(numberStr).toDate();//转Date
    var nowtime = date.format(format); //调用
    return nowtime;
  }
}
export default DateUtil;