import { Platform, RefreshControl, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import { anyEmpty } from '../tools/Ext'
import { scale } from '../tools/Scale'
import { skin1, Skin1 } from '../theme/UGSkinManagers'
import { UGColor } from '../theme/UGThemeColor'
import EmptyView from './view/empty/EmptyView'
import APIRouter from '../network/APIRouter'
import { ugLog } from '../tools/UgLog'
import { Toast } from '../tools/ToastUtils'
import SafeAreaHeader from '../views/tars/SafeAreaHeader'
import MineHeader from '../views/tars/MineHeader'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { pop } from '../navigation/RootNavigation'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { UGBasePageProps } from '../../pages/base/UGPage'
import CommStyles from '../../pages/base/CommStyles'
import UseGameHall from '../../pages/hall/new/UseGameHall'
import MiddleMenu, { IMiddleMenuItem } from './menu/MiddleMenu'
import { GameHistorylistBean, GameHistoryModel } from '../network/Model/HomeRecommendModel'
import AppDefine from '../define/AppDefine'
import { Calendar } from 'react-native-plain-calendar'
import moment from 'moment'
import Dialog from "react-native-dialog";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { UGStore } from '../../redux/store/UGStore'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

/**
 * 其他注单1
 * @param navigation
 * @constructor
 */
const OtherRecord = ({ route, setProps }: UGBasePageProps) => {

  let { type, showBackButton } = route?.params
  // ugLog('--------------------------route?.params==', route?.params)

  const refMenu = useRef(null)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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


  const [currentType, setCurrentType] = useState<IMiddleMenuItem>()  //選擇注單類形
  const [refreshing, setRefreshing] = useState(false) //是否刷新中
  const [page] = useState(1)
  const [history, setHistory] = useState<Array<GameHistorylistBean>>([])
  const [isSetData, setIsSetData] = useState(false) //是否存取過數據
  const [betTotal, setBetTotal] = useState(0) //是否存取過數據
  const [validbetTotal, setValidBetTotal] = useState('0') //是否存取過數據
  const [winTotal, setWinTotal] = useState(0) //是否存取過數據
  const [selectStartDate, setSelectStartDate] = useState<boolean>(false) //正在选择开始日期
  const [startDate, setStartDate] = useState<string>(moment().format('yyyy-MM-DD'))//选中的开始日期

  // ugLog('startDate ==  ',startDate)

  useEffect(() => {
    typeArray.forEach((item) => {
      if (item.id == type)
        setCurrentType(item)
    })
    setProps({
      didFocus: (params) => {
        ugLog('--------------------------params==', params)
        switch (Platform.OS) {
          case 'ios':
              let dic = params;
              for (var key in dic) {
                if (key == 'gameType') {
                  if (anyEmpty(dic[key])) {
                    type = 'real';
                  }
                  else {
                    type = dic[key];
                  }
                  setCurrentType(typeArray.find((v) => v.type == type))
                  requestGameData()
                }
              }

            break;
          case 'android':
            //TODO Android 传参
            break;
        }


      },
    }, false)
  }, [])



  useEffect(() => {
    if (currentType?.type)  requestGameData()
  }, [currentType, startDate])

  useEffect(() => {
  }, [selectStartDate])

  useEffect(() => {
    ugLog("history= ", history)
  }, [history])



  /**
   * 点击菜单
   * @param index
   */
  const clickMenu = (index: number, item: IMiddleMenuItem) => {
    refMenu?.current?.toggleMenu()
    setCurrentType(item)
  }

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
    onRefresh={() => {
      requestGameData()
    }} />

  /**
   * 请求游戏数据
   */
  const requestGameData = async () => {
    console.log("requestGameData")
    setRefreshing(true)

    // 刷新UI
    function refreshUI(data: GameHistoryModel) {
      setRefreshing(false)
      setHistory(data.data.list)
      let vBetTotal = data.data.totalValidBetAmount

      if (!anyEmpty(vBetTotal)) {
        setValidBetTotal(vBetTotal)
      }

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

    // ugLog('page==',page)
    ugLog('currentType?.type==',currentType?.type)
    // ugLog('startDate==',startDate)
    // 获取注單數據
    APIRouter.ticket_history_args(
      page + '', '20', currentType?.type, startDate, startDate
    ).then(({ data: res }) => {
      // ugLog('获取注單數據=======', res)
      if (res?.code == 0) {
        console.log("refreshUI = ", res)
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
    return (
      <>
        <View style={{ flex: 1 }}>
          {
            [
              anyEmpty(item)
                ? <EmptyView style={{ flex: 1 }} />
                : <FlatList
                  refreshControl={refreshCT}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => item.id + index}
                  data={item}
                  numColumns={1}
                  renderItem={({ item }) => {
                    return (
                      <View style={[_styles.text_title_container, { backgroundColor: skin1.textColor4 }]}>
                        <UGText style={[_styles.text_content_0, { color: skin1.textColor1 }]}>{item.gameName}{'\n'}{item.gameTypeName}</UGText>
                        <UGText style={[_styles.text_content_0, { color: skin1.textColor1 }]}>{item.betTime}</UGText>
                        <UGText style={[_styles.text_content_0, { color: skin1.textColor1 }]}>{item.betAmount}</UGText>
                        <UGText style={[_styles.text_content_0, { color: skin1.textColor1 }]}>{item.winAmount}</UGText>
                        <View style={_styles.text_content_0}>
                          <TouchableOpacity onPress={
                            () => {
                              let url2 = AppDefine.host + item.bet_details.url;
                              const { token, sessid } = UGStore.globalProps?.userInfo
                              const newUrl2 = `${url2}&loginsessid=${sessid}&logintoken=${token}`
                              let url1 = `${AppDefine.host}/chat/appcheck?from=app`
                              const newUrl1 = `${url1}&loginsessid=${sessid}&logintoken=${token}`
                              switch (Platform.OS) {
                                case 'ios':
                                  OCHelper.call('CMCommon.goTGWebUrl:url2:title:', [
                                    newUrl1, newUrl2, '注单详情'
                                  ]
                                  )
                                  break
                                case 'android':
                                  //TODO android 注单详情
                                  break
                              }

                            }
                          }>
                            <UGText style={{ color: 'red' }}>{'详情'}</UGText>
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
        anyEmpty(history)
          ? <EmptyView style={{ flex: 1 }} />
          :
          <View>
            <ScrollView style={{ height: AppDefine.height - 44 - AppDefine.safeArea.top - 0 - 60 - 50, }}>
              {
                renderDataList(history)
              }
              <View style={{ height: 20, }}>
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
    // ugLog('curDate ==  ',curDate)
    return (

      <View key={'renderCalendar'}
        style={[_styles.calendar_wid, { backgroundColor: UGColor.BackgroundColor2, }]}>
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
                <UGText style={[_styles.calendar_button, { color: UGColor.TextColor3, }]}>{'上一月'}</UGText>
              </TouchableWithoutFeedback>
              <UGText style={[_styles.calendar_title, { color: UGColor.TextColor2, }]}>{arr[1] + '年 ' + Number(months.indexOf(arr[0]) + 1) + '月'}</UGText>
              <TouchableWithoutFeedback onPress={onNextMonth}>
                <UGText style={[_styles.calendar_button, { color: UGColor.TextColor3, }]}>{'下一月'}</UGText>
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
      color={'#ffffff'} />
  </TouchableWithoutFeedback>

  return (
    <View style={CommStyles.flex}>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader
          showBackBtn={anyEmpty(showBackButton) ? true : showBackButton == '1'}
          rightButton={rightButton}
          showRightTitle={true}
          onPressBackBtn={() => {
            //情况网络数据
            setHistory([]);
            pop()
          }
          }
          onPressTitle={() => {
            refMenu?.current?.toggleMenu()
          }}
          title={currentType?.title}
          titleIcon={'chevron-down'}
        />

      </SafeAreaHeader>
      <MiddleMenu
        styles={{ width: scale(200) }}
        curId={currentType?.id}
        key={currentType?.id}
        ref={refMenu}
        onMenuClick={clickMenu}
        menu={typeArray} />

      <>
        <Dialog.Container
          contentStyle={{
            paddingTop: 0, width: scale(500),
            backgroundColor: UGColor.BackgroundColor2
          }}
          headerStyle={{ height: 0 }}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          visible={selectStartDate} onBackdropPress={handleCancel}>
          <MemoCalendar />
        </Dialog.Container>
      </>
      <View style={_styles.text_title_container}>
        <UGText style={_styles.text_content_0}>{'游戏'}</UGText>
        <UGText style={_styles.text_content_0}>{'时间'}</UGText>
        <UGText style={_styles.text_content_0}>{'投注金额'}</UGText>
        <UGText style={_styles.text_content_0}>{'输赢'}</UGText>
        <UGText style={_styles.text_content_0}>{'详情'}</UGText>
      </View>
      <View style={[_styles.text_bottom_container, { bottom: 0, backgroundColor: skin1.themeColor, }]}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
          <UGText style={[_styles.text_content_bottom, { color: skin1.navBarTitleColor, marginTop: 10 }]}>{'下注总金额: '}</UGText>
          <UGText style={[_styles.text_content_bottom, { color: 'yellow', }]}>{betTotal}</UGText>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
          <UGText style={[_styles.text_content_bottom, { color: skin1.navBarTitleColor, marginTop: 10 }]}>{'有效下注总金额:'}</UGText>
          <UGText style={[_styles.text_content_bottom, { color: 'yellow', }]}>{validbetTotal}</UGText>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
          <UGText style={[_styles.text_content_bottom, { color: skin1.navBarTitleColor, marginTop: 10 }]}>{'输赢金额: '}</UGText>
          <UGText style={[_styles.text_content_bottom, { color: skin1.navBarTitleColor, }]}>{winTotal}</UGText>
        </View>

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
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: skin1.textColor4,
    position: 'absolute',

  },
  text_content_bottom: {
    flex: 1,
    fontSize: scale(20),
    textAlign: 'center',
  },
  calendar_wid: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,
  },
  calendar_button: {
    fontSize: scale(22),
    textAlign: 'center',
    padding: scale(18),
  },
  calendar_title: {
    flex: 1,
    fontSize: scale(24),
    textAlign: 'center',
    padding: scale(16),
  },
})

export default OtherRecord
