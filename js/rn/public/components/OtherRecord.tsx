import { Platform, RefreshControl, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import { anyEmpty, arrayEmpty } from '../tools/Ext'
import { scale } from '../tools/Scale'
import { skin1, Skin1 } from '../theme/UGSkinManagers'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { UGColor } from '../theme/UGThemeColor'
import EmptyView from './view/empty/EmptyView'
import APIRouter from '../network/APIRouter'
import { ugLog } from '../tools/UgLog'
import { Toast } from '../tools/ToastUtils'
import Modal from 'react-native-modal'
import RightMenu from './menu/RightMenu'
import Icon from 'react-native-vector-icons/Entypo'
import PushHelper from '../define/PushHelper'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import SafeAreaHeader from '../views/tars/SafeAreaHeader'
import BackBtnComponent from './tars/BackBtnComponent'
import { PageName } from '../navigation/Navigation'
import MineHeader from '../views/tars/MineHeader'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { navigate, pop, push } from '../navigation/RootNavigation'
import { api } from '../network/NetworkRequest1/NetworkRequest1'
import { PayAisleListData } from '../network/Model/wd/PayAisleModel'
import { FlatList, ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import { PushHomeGame } from '../models/Interface'
import Button from '../views/temp/Button'
import { UGBasePageProps } from '../../pages/base/UGPage'
import CommStyles from '../../pages/base/CommStyles'
import UseGameHall from '../../pages/hall/new/UseGameHall'
import MiddleMenu, { IMiddleMenuItem } from './menu/MiddleMenu'
import { GameHistorylistBean, GameHistoryModel } from '../network/Model/HomeRecommendModel'
import Game3rdView from './Game3rdView'
import { iteratorSymbol } from 'immer/dist/internal'
import AppDefine from '../define/AppDefine'
import { Calendar } from 'react-native-plain-calendar'
import { format } from 'prettier'
import moment from 'moment'
import Dialog from "react-native-dialog";
import AntDesign from 'react-native-vector-icons/AntDesign'

/**
 * 其他注单
 * @param navigation
 * @constructor
 */
const OtherRecord = ({ navigation, route, setProps }: UGBasePageProps) => {

  let { type, showBackButton} = route?.params

  
  if (anyEmpty(type)) {
    type =  'real';
  }
  console.log('type===========',type);
 
  const refMenu = useRef(null)
  const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // 游戏分类：lottery=彩票，real=真人，card=棋牌，game=电子游戏，sport=体育，fish=捕鱼, esport=电竞
  const typeArray: IMiddleMenuItem[] = [
    {
      title: '真人注单', //菜单名字
      subTitle: null, // 次级名字
      icon: null, //图标地址
      id: '23', //识别标识
      type: 'real'
    },
    {
      title: '棋牌注单',
      subTitle: null,
      icon: null,
      id: '24',
      type: 'card'
    },
    {
      title: '捕鱼注单',
      subTitle: null,
      icon: null,
      id: '25',
      type: 'fish'
    },
    {
      title: '电子注单',
      subTitle: null,
      icon: null,
      id: '22',
      type: 'game'
    },
    {
      title: '电竞注单',
      subTitle: null,
      icon: null,
      id: '26',
      type: 'esport'
    },
    {
      title: '体育注单',
      subTitle: null,
      icon: null,
      id: '27',
      type: 'sport'
    },
  ]

  const [currentType, setCurrentType] = useState(typeArray[0])  //選擇注單類形
  const [refreshing, setRefreshing] = useState(false) //是否刷新中
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Array<GameHistorylistBean>>([])
  const [isSetData, setIsSetData] = useState(false) //是否存取過數據
  const [betTotal, setBetTotal] = useState(0) //是否存取過數據
  const [winTotal, setWinTotal] = useState(0) //是否存取過數據
  const [selectStartDate, setSelectStartDate] = useState<boolean>(false) //正在选择开始日期
  const [startDate, setStartDate] = useState<string>(null)//选中的开始日期

  const {
    systemInfo,
    userInfo,
  } = UseGameHall()

  useEffect(() => {
    setCurrentType(typeArray.find((v) => v.id == type))
  }, [])

  useEffect(() => {
    ugLog("startDate: " + startDate)
    requestGameData()
  }, [currentType, startDate])

  useEffect(() => {
  }, [selectStartDate])

  setProps({
    didFocus: (params) => {

      switch (Platform.OS) {
        case 'ios':
          let dic = params;
          console.log('dic===========',dic);
 
          
          for (var key in dic) {
            console.log('key==',key);
            console.log('dic[key]==',dic[key]);
            if (key == 'type') {
            
              if (anyEmpty(dic[key])) {
                type =  'real';
              }
              else{
                type =  dic[key];
              }
            }
          }
          break;
        case 'android':
          //TODO Android 传参
          break;
      }
      !data?.length && requestGameData()
     
    }
  }, false)

  /**
   * 点击菜单
   * @param index
   */
  const clickMenu = (index: number, item: IMiddleMenuItem) => {
    refMenu?.current?.toggleMenu()
    setCurrentType(item)
    let date = moment().format('yyyy-MM-DD');
    setStartDate(date)
  }

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      requestGameData()
                                    }}/>

  /**
   * 请求游戏数据
   */
  const requestGameData = async () => {
    setRefreshing(true)

    // 刷新UI
    function refreshUI(data: GameHistoryModel) {
      setRefreshing(false)
      setData(data.data.list)
      let total = 0
      data.data.list.forEach((e) => { 
        total += Number(e.betAmount)
      })
      setBetTotal(total)
      total = 0
      data.data.list.forEach((e) => { 
        total += Number(e.winAmount)
      })
      setWinTotal(total)
      renderAllData()
    }
    
    // 获取注單數據
    APIRouter.ticket_history_args(
      page+'', '20', currentType?.type, startDate, startDate
    ).then(({ data: res }) => {
      ugLog('data res=', res)
      if (res?.code == 0) {
        setIsSetData(true)
        refreshUI(res)
      } else {
        Toast(res?.msg)
      }
    }).finally(() => {
      setRefreshing(false)
    })
  }

  /**
   * 绘制各Tab列表
   * @param item
   */
  const renderDataList = (item: Array<GameHistorylistBean>) => {
    ugLog('item=', item)
    return (
    <>
      <View style={{ flex: 1 }}>
        {
          [
            anyEmpty(item)
              ? <EmptyView style={{ flex: 1 }}/>
              : <FlatList 
                  refreshControl={refreshCT}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => item.id + index}
                  data={item}
                  numColumns={1}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={[_styles.text_title_container, {backgroundColor: skin1.textColor4}]}>
                        <Text style={_styles.text_content_0}>{item.gameName}{'\n'}{item.gameTypeName}</Text>
                        <Text style={_styles.text_content_0}>{item.betTime}</Text>
                        <Text style={_styles.text_content_0}>{item.betAmount}</Text>
                        <Text style={_styles.text_content_0}>{item.winAmount}</Text>
                        <View style={_styles.text_content_0}>
                          <TouchableOpacity onPress={
                            () => {
                              ugLog("URL: ", AppDefine.host + '/' + item.bet_details.url)
                              push(PageName.Game3rdView, { uriPath: AppDefine.host + '/' + item.bet_details.url })
                            }
                          }>
                            <Text>{'详情'}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  }}
                  />,
          ]
        }
      </View>
    </>
    )
  }

  /**
   * 绘制所有的数据
   */
  const renderAllData = () => {
    return (
      isSetData
      ?
      anyEmpty(data)
        ? <EmptyView style={{ flex: 1 }}/>
        : 
        <View>
          <ScrollView style={{ height:AppDefine.height - 44 - AppDefine.safeArea.top - AppDefine.safeArea.bottom - 60 - 50, }}>
            {
              renderDataList(data)
            }
            <View style={{ height:20, }}>
            </View>
          </ScrollView>
        </View>
      : <View></View>
    )
  }
 
  const handleCancel = () => {
    setSelectStartDate(false);
  };

  /**
   * 绘制日历选择
   */
  let renderCalendar = () => {
    let curDate = new Date(startDate)

    return (
      
        <View key={'renderCalendar'}
              style={_styles.calendar_wid}>
          <Calendar.Picker selectedDate={curDate}
              onDayPress={(date: Date) => {
                let curDate = date.format('yyyy-MM-dd')
                if (selectStartDate) {//设置起始日期
                  setStartDate(curDate)
                  setTimeout(() => {
                  setSelectStartDate(false)
                  }, 100)
                }
              }}
              HeaderComponent={({
                                  currentMonth,
                                  onPrevMonth,
                                  onNextMonth,
                                }) => {
                const arr = currentMonth.split(' ')
                ugLog(arr[0] + arr[1])
                return <View style={{ flexDirection: 'row' }}>
                  <TouchableWithoutFeedback onPress={onPrevMonth}>
                    <Text style={_styles.calendar_button}>{'上一月'}</Text>
                  </TouchableWithoutFeedback>
                  <Text style={_styles.calendar_title}>{arr[1] + '年 ' + Number(months.indexOf(arr[0])+1) + '月'}</Text>
                  <TouchableWithoutFeedback onPress={onNextMonth}>
                    <Text style={_styles.calendar_button}>{'下一月'}</Text>
                  </TouchableWithoutFeedback>
                </View>
              }}
              disabledDayPick={false}
                           weekdays={['周天', '周一', '周二', '周三', '周四', '周五', '周六']}
          />
        </View>
    )
  }

  const MemoCalendar = memo(renderCalendar)
  /**
   * 绘制右按钮
   */
  const rightButton = <TouchableWithoutFeedback onPress={() => {
    setSelectStartDate(true)
  }}>
    <AntDesign size={scale(30)}
          name={'calendar'}
          style={{ padding: scale(16) }}
          color={'#ffffff'}/>
  </TouchableWithoutFeedback>

  return (
    <View style={CommStyles.flex}>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader
          showBackBtn={anyEmpty(showBackButton) ? true : showBackButton == '1'}
          rightButton={rightButton} 
          showRightTitle={true}
          onPressBackBtn={() => {
              pop()
            }
          }
          onPressTitle={() => {
            refMenu?.current?.toggleMenu()
          }}
          title={currentType?.title ?? '真人注单'}
          titleIcon={'chevron-down'}
        />

      </SafeAreaHeader>
      <MiddleMenu
        styles={{ width: scale(200) }}
        key={currentType?.id}
        ref={refMenu}
        onMenuClick={clickMenu}
        menu={typeArray}/>
        
        <>
          <Dialog.Container 
            contentStyle={{ paddingTop: 0, width: scale(500),
              backgroundColor: UGColor.BackgroundColor2}}
            headerStyle={{ height: 0}}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
            visible={selectStartDate} onBackdropPress={handleCancel}>
            <MemoCalendar />
          </Dialog.Container> 
        </>
      <View style={_styles.text_title_container}>
        <Text style={_styles.text_content_0}>{'游戏'}</Text>
        <Text style={_styles.text_content_0}>{'时间'}</Text>
        <Text style={_styles.text_content_0}>{'投注金额'}</Text>
        <Text style={_styles.text_content_0}>{'输赢'}</Text>
        <Text style={_styles.text_content_0}>{'详情'}</Text>
      </View>
      <View style={_styles.text_bottom_container}>
        <Text style={[_styles.text_content_bottom, {alignItems: 'flex-start'}]}>{'下注总金额: ' + betTotal}</Text>
        <Text style={[_styles.text_content_bottom, {alignItems: 'flex-end'}]}>{'输赢金额: ' + winTotal}</Text>
      </View>
      {
        renderAllData()
      }
    </View>
  )
}

const TAB_ITEM_HEIGHT = scale(70) //tab高度

const _styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text_title_container: {
    backgroundColor: UGColor.BackgroundColor2,
    height: TAB_ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.BackgroundColor3,
  },
  text_content_0: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(20),
    alignItems: 'center',
    textAlign: 'center',
  },
  text_bottom_container: {
    backgroundColor: skin1.themeColor,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'flex-end',
    color: skin1.textColor4,
    position: 'absolute',
    bottom: AppDefine.safeArea.bottom
  },
  text_content_bottom: {
    flex: 1,
    color: skin1.textColor4,
    fontSize: scale(20),
    textAlign: 'center',
  },
  calendar_wid: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UGColor.BackgroundColor2,
    width: '100%',
    zIndex: 1,
  },
  calendar_button: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    textAlign: 'center',
    padding: scale(18),
  },
  calendar_title: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(24),
    textAlign: 'center',
    padding: scale(16),
  },
})

export default OtherRecord
