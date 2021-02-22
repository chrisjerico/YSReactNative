import { Image, ImageBackground, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
import { skin1, Skin1 } from "../../../public/theme/UGSkinManagers";
import { scale } from "../../../public/tools/Scale";
import { Button } from "react-native-elements";
import { Res } from "../../../Res/icon/Res";
import AppDefine from "../../../public/define/AppDefine";
import { ImagePlaceholder } from "../tools/ImagePlaceholder";
import moment from "moment";
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'


interface JDCLTimeCP {
  serverTime: string     //服务器时间
  closeTime: string      // 关闭时间

}


export const JDCLTimeCP =  ({serverTime,closeTime}:JDCLTimeCP  ) => {
  let timer: any;//每秒刷新一次界面
  //当前时间：
  var nowData = moment().format('YYYY-MM-DD HH:mm:ss');
  //当前本地时间和服务器时间相差多少秒
  let curDatadiff = (moment(nowData).diff(moment( serverTime), 'seconds'))//每1获取一次数据 是否启动
  let [timeIsOpen, setTimeIsOpen] = useState<boolean>(false)//每1获取一次数据 是否启动
  let  [t, setT] = useState<number>(1)//每1获取一次数据 是否启动
  /**
* 初始化
* @param item
*/
  useEffect(() => {
    console.log('JDCLTimeCPuseEffect=========================================================');

    starttime()

    return (() => {//安卓退出调用
      destoryTimer()

    })
  }, [])

  function starttime() {
    if (!timeIsOpen) {
      console.log('=========JDCLTimeCP定时器开启======== ========================');
      timer = setInterval(() => {
        setTimeIsOpen(true)
        setT(t++)
      }, 1000)
    }
  }


  function destoryTimer() {
    clearInterval(timer)
    setTimeIsOpen(false)
    console.log('JDCLTimeCP停止定时器=========================================================');
    // onHeaderRefresh()
  }


  function reloadText(){
    if (moment( serverTime) >= moment( closeTime)) {
      return '已封盘'
    } else {
      //服务器时间转换成当地时间 服务器时间  =  当前本地时间 - curDatadiff；
      let severNowTime = moment().subtract(curDatadiff, 's').format('YYYY-MM-DD HH:mm:ss');
      if (moment(severNowTime) >= moment( closeTime)) {
        return '已封盘'
      } else {

        let days: number = moment( closeTime).diff(moment(severNowTime), 'days');
        // console.log('days =', days);
        let hours: number = moment( closeTime).diff(moment(severNowTime), 'hours') - days * 24;
        // console.log('hours =', hours);
        let minutes: number = moment( closeTime).diff(moment(severNowTime), 'minutes') - days * 24 * 60 - hours * 60;
        // console.log('minutes =', minutes);
        let seconds: number = moment( closeTime).diff(moment(severNowTime), 'seconds') - days * 24 * 3600 - hours * 3600 - minutes * 60;
        // console.log('seconds =', seconds);

        let dayStr: string; let hoursStr: string; let minutesStr: string; let secondsStr: string;
        dayStr = '' + days;
        if (hours < 10) {
          hoursStr = '0' + hours;
        } else {
          hoursStr = '' + (hours);
        }
        if (minutes < 10) {
          minutesStr = '0' + minutes;
        } else {
          minutesStr = '' + (minutes);
        }
        if (seconds < 10) {
          secondsStr = '0' + seconds;
        } else {
          secondsStr = '' + (seconds);
        }

        if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
          return '已封盘'
        }

        if (days) {
          return   dayStr + '天' + hoursStr + ':' + minutesStr + ':' + secondsStr;
        }
        if (hours) {
          return hoursStr + ':' + minutesStr + ':' + secondsStr
        }
        return minutesStr + ':' + secondsStr
      }
    }
  }

    return (
      <View style={{}}>
        <UGText style={{ fontSize: 13, color: 'red', marginLeft: 10 }}>
        {reloadText()}
        </UGText>
      </View>
    );



}




