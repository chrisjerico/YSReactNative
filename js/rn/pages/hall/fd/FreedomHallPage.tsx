import { RefreshControl, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { BaseScreen } from '../../乐橙/component/BaseScreen'
import { anyEmpty, arrayEmpty } from '../../../public/tools/Ext'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { UGColor } from '../../../public/theme/UGThemeColor'
import EmptyView from '../../../public/components/view/empty/EmptyView'
import FreedomGameListComponent from './games/FreedomGameListComponent'
import { HallGameData } from '../../../public/network/Model/game/HallGameModel'
import APIRouter from '../../../public/network/APIRouter'
import { ugLog } from '../../../public/tools/UgLog'
import { Toast } from '../../../public/tools/ToastUtils'
import UseFreedomHall from './UseFreedomHall'
import Modal from 'react-native-modal'
import RightMenu from '../../../public/components/menu/RightMenu'
import Icon from 'react-native-vector-icons/FontAwesome'
import PushHelper from '../../../public/define/PushHelper'
import { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel'
import SafeAreaHeader from '../../../public/views/tars/SafeAreaHeader'
import { BZHThemeColor } from '../../../public/theme/colors/BZHThemeColor'
import BackBtnComponent from '../../../public/components/tars/BackBtnComponent'
import { PageName } from '../../../public/navigation/Navigation'
import MineHeader from '../../../public/views/tars/MineHeader'
import { OCHelper } from '../../../public/define/OCHelper/OCHelper'
import CommStyles from '../../base/CommStyles'
import FastImage from 'react-native-fast-image'
import { Res } from '../../../Res/icon/Res'
import LinearGradient from 'react-native-linear-gradient'
import { push } from '../../../public/navigation/RootNavigation'

/**
 * 自由游戏大厅
 * @param navigation
 * @constructor
 */
const FreedomHallPage = ({ navigation, setProps }) => {

  const refMenu = useRef(null)
  const [refreshing, setRefreshing] = useState(false) //是否刷新中
  const [gameData, setGameData] = useState<Array<HallGameData>>([])//所有数据

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      requestGameData()
                                    }}/>
  const {
    systemInfo,
    userInfo,
  } = UseFreedomHall()

  useEffect(() => {
    requestGameData()
  }, [])

  /**
   * 请求游戏数据
   */
  const requestGameData = async () => {
    setRefreshing(true)
    APIRouter.game_lotteryHallGames().then(({ data: res }) => {
      let resData = res?.data
      //ugLog('data res=', res)
      if (res?.code == 0) {
        //parentGameType 是 越南彩，gameType 可能是越南彩下面的某一个彩
        resData?.map((parentItem) => {
          parentItem?.list?.map((item) => {
            item.parentGameType = parentItem.gameType
          })
        })

        setGameData(resData)

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
  const renderDataList = (item: HallGameData) =>
    <FreedomGameListComponent gameData={item}/>

  /**
   * 绘制所有的数据
   */
  const renderAllData = () => {
    return (
      anyEmpty(gameData)
        ? <EmptyView style={{ flex: 1 }}/>
        : <ScrollView refreshControl={refreshCT}
                      style={{ backgroundColor: UGColor.BackgroundColor1 }}
                      showsVerticalScrollIndicator={false}>
          {
            [
              <FastImage style={_styles.top_bg_image}
                         resizeMode={'stretch'}
                         source={{ uri: Res.game_select }}/>,
              <View style={_styles.top_container}>
                <TouchableWithoutFeedback onPress={() => {
                  PushHelper.pushUserCenterType(UGUserCenterType.彩票注单记录)
                }}>
                  <View style={_styles.top_item_content}>
                    <FastImage style={_styles.top_item_icon}
                               resizeMode={'contain'}
                               source={{ uri: Res.gameListjrsy }}/>
                    <Text style={_styles.top_item_text}>{'今日输赢'}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                  PushHelper.pushUserCenterType(UGUserCenterType.开奖结果)
                }}>
                  <View style={_styles.top_item_content}>
                    <FastImage style={_styles.top_item_icon}
                               resizeMode={'contain'}
                               source={{ uri: Res.gameListlskj }}/>
                    <Text style={_styles.top_item_text}>{'开奖记录'}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                  push(PageName.PromotionPage, {
                    showBackBtn: true,
                  })
                }}>
                  <View style={_styles.top_item_content}>
                    <FastImage style={_styles.top_item_icon}
                               resizeMode={'contain'}
                               source={{ uri: Res.gameListyhhd }}/>
                    <Text style={_styles.top_item_text}>{'优惠活动'}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>,
              gameData?.map((tabItem, index) => {
                return (
                  renderDataList(tabItem)
                )
              }),
            ]
          }
        </ScrollView>)
  }

  /**
   * 绘制右按钮
   */
  const rightButton = <TouchableWithoutFeedback onPress={() => {
    refMenu?.current?.toggleMenu()
  }}>
    <Icon size={scale(30)}
          name={'bars'}
          style={{ padding: scale(16) }}
          color={'white'}/>
  </TouchableWithoutFeedback>

  const menuStr = [['即时注单', userInfo?.unsettleAmount], ['今日已结'], ['开奖记录'], ['提现']]
  /**
   * 点击菜单
   * @param index
   */
  const renderMenu = (index) => {
    refMenu?.current?.toggleMenu()
    switch (index) {
      case 0:
        PushHelper.pushUserCenterType(UGUserCenterType.即时注单)
        break
      case 1:
        PushHelper.pushUserCenterType(UGUserCenterType.彩票注单记录)
        break
      case 2:
        PushHelper.pushUserCenterType(UGUserCenterType.开奖结果)
        break
      case 3:
        PushHelper.pushUserCenterType(UGUserCenterType.取款)
        break
    }
  }

  return (
    <View style={CommStyles.flex}>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'彩票大厅'}
                    showRightTitle={true}
                    rightButton={rightButton}
                    showBackBtn={false}/>
      </SafeAreaHeader>
      {
        renderAllData()
      }
      <RightMenu ref={refMenu}
                 onMenuClick={renderMenu}
                 menu={menuStr}/>
    </View>
  )
}

const _styles = StyleSheet.create({
  top_container: {
    width: '100%',
    aspectRatio: 2.8,
    flexDirection: 'row',
  },
  top_bg_image: {
    width: '100%',
    aspectRatio: 3.2,
    position: 'absolute',
  },
  top_item_content: {
    flex: 1,
    alignItems: 'center',
    padding: scale(16),
  },
  top_item_icon: {
    width: scale(60),
    aspectRatio: 1,
  },
  top_item_text: {
    color: UGColor.TextColor2,
    paddingTop: scale(8),
    fontSize: scale(20),
  },
})

export default FreedomHallPage
