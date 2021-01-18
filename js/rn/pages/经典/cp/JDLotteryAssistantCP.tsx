
import React, { useEffect, useRef } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, Image, TouchableOpacity, View, Platform, TextInput, Alert } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { setProps } from '../../base/UGPage';
import { scale } from "../../../public/tools/Scale";

import { anyEmpty, arrayEmpty } from '../../../public/tools/Ext';
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import { UGStore } from '../../../redux/store/UGStore';
import { BetBean, BetMode, jsDic, UGBetItemModel, UGbetListModel, UGbetModel, UGbetParamModel, UGChanglongaideModel, UGplayNameModel } from '../Model/UGChanglongaideModel';

import moment from 'moment';
import { showError, showSuccess } from '../../../public/widget/UGLoadingCP';
import { img_images } from '../../../Res/icon';


export interface JDLotteryAssistantCPAction {
  stopTime?: () => void
  startTime?:() => void
}

interface JDLotteryAssistantCP {
  bottomH?: number,//底部的高度
  items?: Array<UGChanglongaideModel>//界面数据
  isRefreshing?: boolean//下拉刷新开始结束 
  imgLoading?: string //默认图片
  selAideModel?: UGChanglongaideModel //
  selBetItem?: UGBetItemModel//投注
  betCount?: number //下注数
  amountLabel?: string//投注金额
  amount?: string//投注金额(上传)
  betDetailViewhidden?: boolean//提示是否隐藏
  betDetailLabel?: string//提示文字
  betDetail2Label?: string//提示2文字
  timer?: any;//每秒刷新一次界面
  dataTimer?: any;//每20获取一次数据
  timeIsOpen?: boolean//timer 是否已经 启动
  dataTimeIsOpen?: boolean//dataTimer 是否已经 启动
  betModel?: UGChanglongaideModel//选中注单
  jsDic?: {}//上传的字典数据
  curDatadiff?: number //当前本地时间和服务器时间相差多少秒

}

const JDLotteryAssistantCP = ( { c_ref }: { c_ref: JDLotteryAssistantCPAction }) => {

    /**
 * 初始化
 * @param item
 */
useEffect(() => {
  console.log('useEffect=========================================================');
  c_ref &&
  (c_ref.stopTime = () => {
    console.log('关闭定时器=========================================================');
    destoryTimer()
  })
  c_ref &&
  (c_ref.startTime = () => {
    console.log(' 开启定时器=========================================================');
      starttime()

  })


  initDate()
  onHeaderRefresh()

  return (() => {
    destoryTimer()
   
  })
}, [])

  let { current: v } = useRef<JDLotteryAssistantCP>(
    {
      bottomH: 60,
      items: [],
      isRefreshing: true,
      imgLoading: img_images('loading')
    }
  )
  const [text,setText] = React.useState('');
  const itemHeight = 96
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  /**
* 限制只能输入数字和小数
* 
*/
  function chkPrice(obj) { //方法1
    obj = obj.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    obj = obj.replace(/^\./g, "");//保证只有出现一个.而没有多个. 
    obj = obj.replace(/\.{2,}/g, ".");//保证.只出现一次，而不能出现两次以上 
    obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
    return obj;
  }


  /**
* 下注
* 
*/
  function betClick() {
    let count: number = 0;
    for (let index = 0; index < v.items.length; index++) {
      const element = v.items[index];
      for (let i = 0; i < element?.betList.length; i++) {
        const bet = element?.betList[i];
        if (bet.select) {
          count += 1;
          break;
        }
      }
    }

    if (!count) {
      showError('请选择您的注单')
      return;
    }
    if (anyEmpty(v.amountLabel)) {
      showError('请输入投注金额')
      return;
    }

    if (v.amountLabel.indexOf(".") != -1) {
      let amountArray = v.amountLabel.split('.')
      const a1: string = amountArray[0];
      const a2: string = amountArray[1];
      if (a2.length == 1) {
        v.amount = a1 + '.' + a2;
      }
      else if (a2.length == 2) {
        v.amount = v.amountLabel;
      }
      else {
        showError('金额格式有误')
        return;
      }
    }
    else {
      v.amount = v.amountLabel + '.00';
    }


    if (arrayEmpty(v.items)) {
      showError('请输入投注金额')
      return
    }
    //文字框获得焦点
    let betItem: UGBetItemModel = new UGBetItemModel();
    for (let index = 0; index < v.items.length; index++) {
      const aideModel = v.items[index];
      for (let i = 0; i < aideModel.betList.length; i++) {
        const bet = aideModel.betList[i];
        if (bet.select) {
          v.betModel = aideModel;
          betItem = bet;
        }

      }

    }


    if (!anyEmpty(v.betModel)) {
      v.jsDic = shareBettingData(v.betModel, v.amount);
    }

    let dicMode = new BetMode();
    dicMode.gameId = v.betModel.gameId
    dicMode.betIssue = v.betModel.issue
    dicMode.totalNum = "1"
    dicMode.totalMoney = v.amount
    dicMode.endTime = moment(v.betModel.closeTime).format("X")
    dicMode.tag = '1'
    let betBean = new BetBean();
    betBean.playId = betItem.playId
    betBean.money = v.amount
    betBean.betInfo = ''
    betBean.playIds = ''
    let arr = new Array<BetBean>();
    arr.push(betBean)
    dicMode.betBean = arr

    api.user.userBetWithParams(dicMode).useSuccess(({ msg }) => {
      showSuccess(msg)
      const {  userInfo } = UGStore.globalProps
      const { chatMinFollowAmount = '0' } = systemInfo
      const amountfloat: number = parseFloat(v.amount)
      const webAmountfloat: number = parseFloat(chatMinFollowAmount)

      if (!userInfo.isTest && userInfo.chatShareBet && (amountfloat >= webAmountfloat) && isBetMin(amountfloat)) {
        Alert.alert('分享注单', '是否分享到聊天室', [
          {
            text: '取消',
          },
          {
            text: '分享',
            onPress: () => {
              switch (Platform.OS) {
                case 'ios':
                  goLotteryBetAndChatVC() 
                  break
                case 'android':
                  //TODO android 去聊天室下注页
                  break
              }

            },
          },
        ])
      }
      OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationGetUserInfo']);
      betItem.select = false;
      v.selBetItem = null;
      setProps();


    }).useFailure((err) => {
      console.log('err = ', err);
      // Toast(err.message)
    });

  }

  /**
* 清空方法
* 
*/
function clearClick() {
  for (let index = 0; index < v.items.length; index++) {
    const aideModel = v.items[index];
    for (let i = 0; i < aideModel.betList.length; i++) {
      const bet = aideModel.betList[i];
      bet.select = false;
    }
  }

  v.betDetailViewhidden = true;
  v.betCount = 0;
  v.amountLabel = '';
  setText('');
  setProps()
  infoAction();
}

  /**
* 去聊天室下注页
* 
*/
  async function goLotteryBetAndChatVC() {
    await OCHelper.call('UGSystemConfigModel.currentConfig.setHasShare:', [true])
    await OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{
      selectors: 'LotteryBetAndChatVC.new[setSelectChat:]',
      args1: [true],
    }, true])

 
    setTimeout(() => {
     let dic = {
       'jsDic': v.jsDic
     }
     OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:userInfo:', ['NSSelectChatRoom_share',null,dic]);
    }, 1000);

  }

  /**
* 最小下注数
* 
*/
  function isBetMin(amountfloat?: number) {

    if (anyEmpty(systemInfo.chatShareBetMinAmount)) {
      return true;
    } else {
      let chatShareBetMinAmountfloat: number = parseFloat(systemInfo?.chatShareBetMinAmount)
      if (chatShareBetMinAmountfloat == 0) {
        return true;
      } else {
        return (amountfloat >= chatShareBetMinAmountfloat);
      }
    }
  }

  /**
* 拼装字典用来上传
* 
*/
  function shareBettingData(betModel?: UGChanglongaideModel, amount?: string) {

    let betS: UGBetItemModel = new UGBetItemModel();
    let list: Array<any> = new Array<any>();
    for (let index = 0; index < betModel.betList.length; index++) {
      const bet = betModel.betList[index];
      if (bet.select) {
        betS = bet;
        break;
      }
    }


    let name: string = betModel?.playCateName + '_' + betS?.playName;
    // 组装list 
    {
      let betList: UGbetListModel = new UGbetListModel();
      betList.clsName = undefined;  // 原生要的数据不需要转成Class
      betList.betMoney = amount;
      betList.index = '0';
      betList.odds = betS.odds;
      betList.name = name;
      list.push(betList);
    }

    let betObj: UGbetModel = new UGbetModel();
    // 组装betParams
    {
      let betParams: Array<UGbetParamModel> = new Array<UGbetParamModel>();
      let betList: UGbetParamModel = new UGbetParamModel();
      betList.money = amount;
      betList.name = name;
      betList.odds = betS.odds;
      betList.playId = betS.playId;
      betParams.push(betList);
      betObj.betParams = betParams;
    }

    //组装 playNameArray
    {
      let playNameArray: Array<UGplayNameModel> = new Array<UGplayNameModel>();
      let betList: UGplayNameModel = new UGplayNameModel();
      betList.playName1 = betModel.title + '-' + betModel.playCateName;
      betList.playName2 = betS.playName;
      playNameArray.push(betList)
      betObj.playNameArray = playNameArray;
    }

    //组装 其他数据
    {
      betObj.displayNumber = betModel.displayNumber;
      betObj.gameName = betModel.title;
      betObj.gameId = betModel.gameId;
      betObj.totalNums = '1';
      betObj.totalMoney = amount;
      betObj.turnNum = betModel.issue;
      betObj.ftime = moment(betModel.closeTime).format("X");
      betObj.code = '';
      betObj.specialPlay = false;
    }

    let js: jsDic = {};
    js.betModel = betObj;
    js.list = list;

    //以字符串形式导出
    let paramsjsonString: string = JSON.stringify(betObj);
    // console.log('paramsjsonString  ===', paramsjsonString);

    let listjsonString: string = JSON.stringify(list);
    // console.log('listjsonString  ===', listjsonString);

    let jsonStr: string = 'shareBet(' + listjsonString + ',' + paramsjsonString + ')';

    console.log('jsonStr ====', jsonStr);

    js.jsonStr = jsonStr;

    // console.log('js ====', js);

    return js;
  }

  /**
* cell 按钮点击
* 
*/
  function betItemSelect(item?: any, index?: number) {
    let obj = item?.betList[index];
    obj.select = !obj.select;
    for (let index = 0; index < v.items.length; index++) {
      const aideModel = v.items[index];
      for (let i = 0; i < aideModel.betList.length; i++) {
        const bet = aideModel.betList[i];
        if (bet != obj) {
          bet.select = false;
        }
      }
    }

    if (obj.select) {

      v.selAideModel = item;
      v.selBetItem = obj;
      v.betCount = 1;


      if (anyEmpty(v.amountLabel)) {
        v.betDetailViewhidden = true;
        setProps()
        return;
      }
      v.betDetailViewhidden = false;
      let total: number = parseFloat(v.amountLabel) * parseFloat(obj.odds)
      v.betDetailLabel = v.selAideModel?.title + ', '
        + v.selAideModel?.playCateName + ', '
        + v.selBetItem?.playName;
      v.betDetail2Label = ' 奖金:' + total?.toFixed(4)
    } else {
      v.betDetailViewhidden = true;
      v.selAideModel = null
      v.betCount = 0;
    }
    setProps()

  }


  /**
* cell img的显示数据
* 
*/
  function cellImg(item: any) {

    if (anyEmpty(item.logo)) {

      return v.imgLoading;
    } else {
      return item.logo
    }

  }
  /**
* betView2 的颜色
* 
*/
  function betView2Color(item: any) {
    if (!arrayEmpty(item.betList)) {
      let length = item.betList.length - 1;
      let obj = item.betList[length]
      if (obj.select) {
        return Skin1.themeColor
      } else {
        return 'white'
      }
    }
  }

  /**
*  betView1 的颜色
* 
*/
  function betView1Color(item: any) {
    if (!arrayEmpty(item.betList)) {
      let obj = item.betList[0]
      if (obj.select) {
        return Skin1.themeColor
      } else {
        return 'white'
      }
    }

  }

  /**
* oddsLabel2 playNameLabel2 的颜色
* 
*/
  function lastLabelColor(item: any) {
    if (!arrayEmpty(item.betList)) {
      let length = item.betList.length - 1;
      let obj = item.betList[length]
      if (obj.select) {
        return 'white'
      } else {
        return 'black'
      }
    }
    else {
      return Skin1.textColor1
    }
  }

  /**
* oddsLabel1 playNameLabel1 的颜色
* 
*/
  function fastLabelColor(item: any) {
    if (!arrayEmpty(item.betList)) {
      let obj = item.betList[0]
      if (obj.select) {
        return 'white'
      } else {
        return 'black'
      }
    }
    else {
      return Skin1.textColor1
    }
  }


  /**
* 根据oddsLabel2 的显示数据
* 
*/
  function oddsLabel2(item: any) {
    if (!arrayEmpty(item.betList)) {
      let length = item.betList.length - 1;
      return item.betList[length].odds;
    }
  }

  /**
* 根据playNameLabel2 的显示数据
* 
*/
  function playName2(item: any) {
    if (!arrayEmpty(item.betList)) {
      let length = item.betList.length - 1;
      return item.betList[length].playName;
    }
  }


  /**
* 根据oddsLabel1 的显示数据
* 
*/
  function oddsLabel1(item: any) {
    if (!arrayEmpty(item.betList)) {
      return item.betList[0].odds;
    }
  }

  /**
* 根据playNameLabel1 的显示数据
* 
*/
  function playName1(item: any) {
    if (!arrayEmpty(item.betList)) {
      return item.betList[0].playName;
    }
  }



  /**
* 根据数据playNameColor返回颜色数据
* 
*/
  function playNameColor(item: any) {
    
    if (item.playName === '小' || item.playName === '大') {
      return '#76B473'
    }
    if (item.playName === '单' || item.playName === '双') {
      return '#800080'
    }
    if ('龙' === item.playName  || item.playName === '虎') {
      return '#DC143C'
    }
  
    return '#76B473'
    
  }

  /**
 * 根据数据是数组还是字典返回数据
 * 
 */
  function returnData(data: any) {
    if (Array.isArray(data)) {
      return data;
    } else {
      return data['list']
    }
  }


  /**
 *  备注页控制
 * 
 */
function infoAction(){
  if (anyEmpty(v.selBetItem)) {
    console.log('=============111');
    return;
  }

  // setProps
  console.log('=============v.amountLabel==',v.amountLabel);
  if (!anyEmpty(v.amountLabel) && !anyEmpty(v.selBetItem) && !anyEmpty(v.selAideModel)) {
    v.betDetailViewhidden = false;
    let total: number = parseFloat(v.amountLabel) * parseFloat(v.selBetItem.odds)
    v.betDetailLabel = v.selAideModel?.title + ', '
      + v.selAideModel?.playCateName + ', '
      + v.selBetItem?.playName;
    v.betDetail2Label = ' 奖金:' + total?.toFixed(4)
    setProps()
  }
  else {
    v.betDetailViewhidden = true;
    setProps()
  }

}

  /**
* 下拉刷新
* 
*/
  const onHeaderRefresh = () => {
    v.isRefreshing = true
    // console.log('下拉刷新');
    getChanglong()
  }

  function getChanglong() {
    // console.log('长龙助手===');
    api.game.changlong('60').useSuccess(({ data }) => {
      // console.log('data =', data);
      if (anyEmpty(data)) {
        console.log('进来了：==================');
        v.isRefreshing = false;
        v.items.length = 0
        setProps();
        return;
      }
      let arrayData = returnData(data);
      if (arrayData.length == 0) {
        // console.log('进来了：==================');
        v.isRefreshing = false;
        v.items.length = 0
        setProps();
        return;
      }
      v.isRefreshing = false
      let temp: Array<UGChanglongaideModel> = v.items;
      v.items = JSON.parse(JSON.stringify(arrayData))

      for (let index = 0; index < temp.length; index++) {
        const clm1 = temp[index];
        for (let i = 0; i < clm1.betList.length; i++) {
          const bet1 = clm1.betList[i];
          if (bet1.select) {
            for (let j = 0; j < v.items.length; j++) {
              const clm2 = v.items[j];
              if (clm1.gameId == clm2.gameId && clm1.displayNumber == clm2.displayNumber) {
                for (let k = 0; k < clm2.betList.length; k++) {
                  const bet2 = clm2.betList[k];
                  if (bet1.playId == bet2.playId) {
                    bet2.select = true;
                  }
                }
              }

            }
          }

        }
      }

      //当前时间：
      var nowData = moment().format('YYYY-MM-DD HH:mm:ss');
      //当前本地时间和服务器时间相差多少秒
      for (let index = 0; index < v.items.length; index++) {
        const element = v.items[index];
        if (!anyEmpty(element.serverTime)) {
          v.curDatadiff = moment(nowData).diff(moment(element.serverTime), 'seconds')
          break;
        }
      }

      setProps()
       starttime()      

    });
  }

 function starttime(){
  if (!v.timeIsOpen) {
    console.log('=========定时器开启======== ========================');
    v.timer = setInterval(() => {
      v.timeIsOpen = true;
      setProps();
    }, 1000)
  }

  if (!v.dataTimeIsOpen) {
    v.dataTimer = setInterval(() => {
      v.dataTimeIsOpen = true;
      getChanglong()
    }, 1000 * 20)
  }

 }
  
  /**
* 渲染定时器
* 
*/
  const _renderTimeItem = ({ item }) => {

    if (moment(item.serverTime) >= moment(item.closeTime)) {

      return (
        <View style={{}}>
          <Text style={{ fontSize: 13, color: 'red', marginLeft: 10 }}>
            {'已封盘'}
          </Text>
        </View>
      );
    } else {

      //服务器时间转换成当地时间 服务器时间  =  当前本地时间 - curDatadiff；

      let severNowTime = moment().subtract(v.curDatadiff, 's').format('YYYY-MM-DD HH:mm:ss');

      if (moment(severNowTime) >= moment(item.closeTime)) {
        return (
          <View style={{}}>
            <Text style={{ fontSize: 13, color: 'red', marginLeft: 10 }}>
              {'已封盘'}
            </Text>
          </View>
        );
      } else {

        let days: number = moment(item.closeTime).diff(moment(severNowTime), 'days');
        // console.log('days =', days);
        let hours: number = moment(item.closeTime).diff(moment(severNowTime), 'hours') - days * 24;
        // console.log('hours =', hours);
        let minutes: number = moment(item.closeTime).diff(moment(severNowTime), 'minutes') - days * 24 * 60 - hours * 60;
        // console.log('minutes =', minutes);
        let seconds: number = moment(item.closeTime).diff(moment(severNowTime), 'seconds') - days * 24 * 3600 - hours * 3600 - minutes * 60;
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
          return (
            <View style={{}}>
              <Text style={{ fontSize: 13, color: 'red', marginLeft: 10 }}>
                {'已封盘'}
              </Text>
            </View>
          );
        }

        if (days) {
          return (
            <View style={{}}>
              <Text style={{ fontSize: 13, color: 'red', marginLeft: 10 }}>
                {dayStr + '天' + hoursStr + ':' + minutesStr + ':' + secondsStr}
              </Text>
            </View>
          );
        }
        if (hours) {
          return (
            <View style={{}}>
              <Text style={{ fontSize: 13, color: 'red', marginLeft: 10 }}>
                {hoursStr + ':' + minutesStr + ':' + secondsStr}
              </Text>
            </View>
          );
        }
        return (
          <View style={{}}>
            <Text style={{ fontSize: 13, color: 'red', marginLeft: 10 }}>
              {minutesStr + ':' + secondsStr}
            </Text>
          </View>
        );
      }
    }
  }



  /**
* 渲染列表项
* 
*/
  const _renderItem = ({ index, item }) => {
    {
      

      return (
        <View style={[styles.viewItem, { alignItems: 'center', marginHorizontal: 10, flexDirection: 'row', }]}>
          {/* 图片 */}
          <View style={{ alignItems: 'center', justifyContent: 'center', }}>
            <Image 

            defaultSource={require('./load.png')} //默认图片
            style={[styles.itemImageImageStyle,]}
             source={{ uri: cellImg(item) }}  />
          </View>
          {/* 内容 */}
          <View style={[{ flexDirection: 'column', marginLeft: 10, }]}>
            {/* 文字1 */}
              <Text style={{ fontSize: 15, color: Skin1.textColor1, }}>
                {item.title}
              </Text>
            {/* 文字2 */}
            <View style={[{ flexDirection: 'row', alignItems: 'center', height: 28, }]}>
              <Text style={{ fontSize: 13, color: Skin1.textColor1 }}>
                {!anyEmpty(item.displayNumber) ? item.displayNumber : item.issue}
              </Text>
              {/* 倒计时 */}
              <_renderTimeItem index={index} item={item} />

            </View>
            {/* 图标 */}
            <View style={[{ flexDirection: 'row', }]}>
              <View style={{ backgroundColor: '#A9A9A9', borderRadius: 3, }}>
                <Text style={{ fontSize: 12, color: 'white', marginHorizontal: 5, marginVertical: 3 }}>
                  {item.playCateName}
                </Text>
              </View>
               <View style={{ marginLeft: 10, backgroundColor: playNameColor(item), borderRadius: 3, }}>
                <Text style={{ fontSize: 12, color: 'white', marginHorizontal: 5, marginVertical: 3 }}>
                  {item.playName}
                </Text>
              </View>
              <View style={{ marginLeft: 10, backgroundColor: '#DC143C', borderRadius: 3, }}>
                <Text style={{ fontSize: 12, color: 'white', marginHorizontal: 5, marginVertical: 3 }}>
                  {item.count}
                </Text>
              </View>

            </View>
          </View >
          {/* 多余 */}
          <View style={[{ flex: 1 }]}></View>
          {/* 按钮 */}
          <View style={[{ flexDirection: 'row', }]}>
            <TouchableOpacity style={[{
              flexDirection: 'column', alignItems: 'center', width: 50, height: 50, borderRadius: 4, borderColor: Skin1.textColor1, borderWidth: 1,
              backgroundColor: betView1Color(item)
            }]}
              onPress={() => {
                betItemSelect(item, 0)
              }}
            >
              <Text style={{ fontSize: 14, color: fastLabelColor(item), marginTop: 6 }}>
                {playName1(item)}
              </Text>
              <Text style={{ fontSize: 12, color: fastLabelColor(item), marginTop: 8 }}>
                {oddsLabel1(item)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{
              marginLeft: 15, flexDirection: 'column', alignItems: 'center', width: 50, height: 50, borderRadius: 4, borderColor: Skin1.textColor1, borderWidth: 1,
              backgroundColor: betView2Color(item)
            }]}
              onPress={() => {
                betItemSelect(item, 1)
              }}
            >
              <Text style={{ fontSize: 14, color: lastLabelColor(item), marginTop: 6 }}>
                {playName2(item)}
              </Text>
              <Text style={{ fontSize: 12, color: lastLabelColor(item), marginTop: 8 }}>
                {oddsLabel2(item)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }


  function initDate(){
    v.bottomH = 60;
    v.imgLoading = img_images('loading')
    v.selAideModel = null
    v.selBetItem = null
    v.betCount = 0
    v.amountLabel = ''
    v.betDetailViewhidden = true
    v.betDetailLabel = ''
    v.betDetail2Label = ''
    v.timeIsOpen = false;
    v.dataTimeIsOpen = false;
    v.amount = ''
    v.betModel = null
    v.jsDic = null
    v.curDatadiff = 0
    v.isRefreshing= true

  }

  function destoryTimer(){
    clearInterval(v.timer)
    clearInterval(v.dataTimer)
    v.timeIsOpen = false;
    v.dataTimeIsOpen = false;
    
    console.log('停止定时器=========================================================');
    // onHeaderRefresh()
  }




  return (
    <View style={[styles.container, { backgroundColor: Skin1.isBlack ? Skin1.CLBgColor : Skin1.textColor4 }]}>
      <View style={{ marginTop: 10, flex: 1, }}>
        {/* 列表 */}
        <View style={{ height: AppDefine.height - 44 - AppDefine.safeArea.top - AppDefine.safeArea.bottom - v.bottomH -50 }}>
          <FlatList
            data={v.items}
            renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
            keyExtractor={(item, index) => index.toString()}
            getItemLayout={(_, index) => ({
              length: v.items.length,
              offset: itemHeight * index,
              index,
          })}
          // initialNumToRender ={24}

            //下拉刷新
            //设置下拉刷新样式
            refreshControl={
              <RefreshControl
                title={"正在加载..."} //android中设置无效
                colors={[Skin1.textColor2]} //android
                tintColor={Skin1.textColor2} //ios
                titleColor={Skin1.textColor2}
                refreshing={v.isRefreshing}
                // refreshing={isHeader}
                onRefresh={() => {
                  onHeaderRefresh(); //下拉刷新加载数据
                }}
              />
            }
          />

        </View>
        {/* 下注详情 */}
        {!v.betDetailViewhidden && <View style={{
          position: 'absolute',
          marginTop: AppDefine.height - 44 - AppDefine.safeArea.top - AppDefine.safeArea.bottom - v.bottomH - 40-50,
          marginLeft: 10,
          backgroundColor: '#FFD9A3',
          height: 35,
          width: 310,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: 3,
        }}>
          <Text style={{ fontSize: 14, color: 'black' }}>
            {v.betDetailLabel}
          </Text>
          <Text style={{ fontSize: 14, color: '#DC143C' }}>
            {v.betDetail2Label}
          </Text>

        </View>}
        {/* 底部 */}
        <View style={{
          position: 'absolute',
          marginTop: AppDefine.height - 44 - AppDefine.safeArea.top - AppDefine.safeArea.bottom - v.bottomH -50,
          justifyContent: 'center',
          flexDirection: 'row',
          width: '100%',
          backgroundColor: '#333333',
          height: v.bottomH + AppDefine.safeArea.bottom,
        }}>
          <TouchableOpacity style={{ height: v.bottomH, width: 80, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: 'white', }}
          onPress={() => {
            clearClick()
          }}
          >
            <Text style={{ fontSize: 18, color: '#FF8C00' }}>
              {'清空'}
            </Text>
          </TouchableOpacity>
          <View style={{ height: v.bottomH, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ fontSize: 16, color: 'white', marginRight: 2, marginLeft: 10 }}>
              {'共'}
            </Text>
            <Text style={{ fontSize: 18, color: '#DC143C' }}>
              {v.betCount}
            </Text>
            <Text style={{ fontSize: 16, color: 'white', marginHorizontal: 2 }}>
              {'注'}
            </Text>
            <View style={{ flex: 1 }}></View>
            <TextInput style={{ height: 30, width: 130, backgroundColor: Skin1.textColor4, marginRight: 10, borderRadius: 3, overflow: 'hidden', borderColor: Skin1.textColor3, borderWidth: 1, color: Skin1.textColor1 }}
              placeholder={'   投注金额'}
              // value={v.amountLabel}text
               value={text}
              placeholderTextColor={Skin1.textColor3}
              onChangeText={(text) => {
                console.log('投注金额==', text);
                setText(chkPrice(text).trim())
                v.amountLabel  = chkPrice(text).trim()
                infoAction();
                
              }}
            ></TextInput>

          </View>
          <TouchableOpacity style={{ height: v.bottomH, width: 90, backgroundColor: '#1E90FF', alignItems: 'center', justifyContent: 'center', }}
            onPress={() => {
              betClick()
            }}
          >
            <Text style={{ fontSize: 18, color: 'white' }}>
              {'马上投注'}
            </Text>
          </TouchableOpacity>
        </View>


      </View>
    </View >

  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  item: {
    flex: 1,
    borderColor: '#E4E7EA',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: scale(22)
  },
  loadMore: {
    alignItems: "center"
  },
  indicator: {
    color: "red",
    margin: scale(10)
  },
  foot: {
    height: scale(150),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  footText: {
    fontSize: scale(22),
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  viewItem: {
    flexDirection: 'column',
    height: scale(96),
  },
  listEmpty: {
    fontSize: scale(22),
    marginTop: scale(15),
  },
  capital_type_picker: {
    height: scale(66),
    padding: scale(8),
    position: 'absolute',
    width: '100%',
  },
  itemImageImageStyle: {
    height: 50,
    width: 50,
    // marginHorizontal:10,
    marginVertical: 10,
    resizeMode: "stretch",

  },
});

export default JDLotteryAssistantCP
