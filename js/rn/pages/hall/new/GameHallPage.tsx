import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { BaseScreen } from '../../乐橙/component/BaseScreen'
import { anyEmpty, arrayEmpty } from '../../../public/tools/Ext'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { UGColor } from '../../../public/theme/UGThemeColor'
import EmptyView from '../../../public/components/view/empty/EmptyView'
import HallGameListComponent from './games/HallGameListComponent'
import { HallGameData, GroupGameData, HallGameModel1 } from '../../../public/network/Model/game/HallGameModel'
import APIRouter from '../../../public/network/APIRouter'
import { ugLog } from '../../../public/tools/UgLog'
import { Toast } from '../../../public/tools/ToastUtils'
import UseGameHall from './UseGameHall'
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
import { setProps } from '../../base/UGPage'
import { pop } from '../../../public/navigation/RootNavigation'
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1'
import { PayAisleListData } from '../../../public/network/Model/wd/PayAisleModel'

interface IRouteParams {
  showBackButton?: boolean //是否显示返回按钮
}

/**
 * 新游戏大厅
 * @param navigation
 * @constructor
 */
const GameHallPage = ({ navigation, route }) => {

  const { showBackButton }: IRouteParams = route?.params

  const refMenu = useRef(null)
  const [refreshing, setRefreshing] = useState(false) //是否刷新中
  const [gameData, setGameData] = useState<Array<HallGameData>>([])//所有数据
  const { current: v } = useRef<{
    hallGames?: HallGameData[]
    isGroup: boolean
  }>({ isGroup: true });

  const {
    systemInfo,
    userInfo,
  } = UseGameHall()

  useEffect(() => {
    requestGameData()
  }, [])

  setProps({
    didFocus: () => {
      !gameData?.length && requestGameData()
    }
  }, false)

  /**
   * 请求游戏数据
   */
  const requestGameData = async () => {
    setRefreshing(true)

    // 处理分组数据
    function groupGameToHallGame(groups: GroupGameData[]): HallGameData[] {
      const temp: { [x: string]: HallGameData } = {}
      groups?.forEach((group) => {
        group?.lotteries?.forEach((l) => {
          v.hallGames?.forEach((hall) => {
            hall?.list?.forEach((g) => {
              g.pic = g.pic ?? l.logo
              if (l?.id != g?.id) return
              if (temp[group?.id] == undefined) {
                temp[group?.id] = { ...hall, list: [] }
              }
              temp[group?.id].list?.push(g)
            })
          })
        })
      })
      return Object.values(temp)
    }

    // 刷新UI
    function refreshUI(data: HallGameData[]) {
      setRefreshing(false)

      // 是否显示分类
      if (systemInfo?.picTypeshow != '1') {
        let temp: HallGameModel1[] = []
        data?.forEach(element => {
          temp = temp.concat(element?.list)
        });
        data[0].list = temp
        setGameData([data?.[0]])
      } else {
        setGameData(data)
      }
    }

    // 获取分组数据
    function getGroup() {
      api.game.lotteryGroupGames().useCompletion(({ data, msg }, err, sm) => {
        sm.noShowErrorHUD = true

        if (data?.length) {
          refreshUI(groupGameToHallGame(data))
        } else {
          v.isGroup = false
          refreshUI(v.hallGames)
        }
      })
    }

    // 获取彩票数据
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
        v.hallGames = resData
        if (v.isGroup) {
          getGroup()
        } else {
          refreshUI(resData)
        }
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
    <HallGameListComponent tabLabel={item?.gameTypeName}
                           refreshing={refreshing}
                           gameData={item}
                           requestGameData={requestGameData}/>

  /**
   * 绘制所有的数据
   */
  const renderAllData = () => {
    if (systemInfo?.picTypeshow != '1') {
      return (
        anyEmpty(gameData)
          ? <EmptyView style={{ flex: 1 }}/>
          : renderDataList(gameData[0])
      )

    } else {
      return (
        anyEmpty(gameData)
          ? <EmptyView style={{ flex: 1 }}/>
          : <ScrollableTabView
            tabBarUnderlineStyle={[_styles.tab_bar_underline,
              { backgroundColor: Skin1.themeColor }]}
            tabBarActiveTextColor={Skin1.themeColor}
            tabBarInactiveTextColor={Skin1.textColor1}
            tabBarTextStyle={{ fontSize: scale(20) }}
            style={[{ flex: 1 }]}
            renderTabBar={() => <ScrollableTabBar style={_styles.tab_bar}/>}>
            {
              gameData?.map((tabItem, index) => {
                  return (
                    renderDataList(tabItem)
                  )
                },
              )
            }
          </ScrollableTabView>
      )

    }
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
   * 绘制菜单
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
                    onPressBackBtn={()=>{ pop() }}
                    showBackBtn={Platform.OS == 'ios' || showBackButton}/>
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
  container: {},
  tab_bar: {
    backgroundColor: '#f4f4f4',
  },
  tab_bar_underline: {
    height: scale(3),
  },
  item_container: {
    paddingHorizontal: scale(32),
    paddingVertical: scale(16),
  },
  item_content: {
    borderWidth: scale(1),
    borderColor: UGColor.LineColor1,
    borderRadius: scale(22),
    padding: scale(16),
  },
  bank_name_container: {
    flexDirection: 'row',
    color: UGColor.TextColor1,
    fontSize: scale(24),
    alignItems: 'center',
  },
  bank_name_icon: {
    width: scale(36),
    height: scale(36),
  },
  bank_name: {
    flex: 1,
    color: UGColor.TextColor1,
    fontSize: scale(22),
    marginLeft: scale(16),
  },
  bank_name_edit: {
    width: scale(28),
    height: scale(28),
  },
  bank_user_name: {
    color: UGColor.TextColor3,
    fontSize: scale(20),
    paddingTop: scale(16),
  },
  right_button: {
    color: 'white',
    fontSize: scale(20),
    padding: scale(8),
  },

})

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default GameHallPage
