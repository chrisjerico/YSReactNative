import { StyleSheet } from 'react-native'
import * as React from 'react'
import { useState } from 'react'
import { BaseScreen } from '../../乐橙/component/BaseScreen'
import { anyEmpty } from '../../../public/tools/Ext'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { UGColor } from '../../../public/theme/UGThemeColor'
import EmptyView from '../../../public/components/view/empty/EmptyView'
import HallGameListComponent from './games/HallGameListComponent'
import { HallGameData } from '../../../public/network/Model/game/HallGameModel'
import APIRouter from '../../../public/network/APIRouter'
import { ugLog } from '../../../public/tools/UgLog'
import { Toast } from '../../../public/tools/ToastUtils'
import UseGameHall from './UseGameHall'

/**
 * 游戏大厅
 * @param navigation
 * @constructor
 */
const GameHallPage = ({ navigation, setProps }) => {

  const [refreshing, setRefreshing] = useState(false) //是否刷新中
  const [gameData, setGameData] = useState<Array<HallGameData>>([])//所有数据

  const {
    systemInfo,
    userInfo,
  } = UseGameHall()

  /**
   * 请求存款记录
   * clear: 从头请求
   * selPage: 指定哪一页
   */
  const requestGameData = async () => {
    setRefreshing(true)
    APIRouter.game_lotteryHallGames().then(({ data: res }) => {
      let resData = res?.data
      ugLog('datas res=', res)
      if (res?.code == 0) {
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
    <HallGameListComponent tabLabel={item?.gameTypeName}
                           refreshing={refreshing}
                           gameData={item?.list}
                           requestGameData={requestGameData}/>

  return (
    <BaseScreen style={_styles.container}
                screenName={'彩票大厅'}>
      {
        [
          anyEmpty(gameData)
            ? <EmptyView style={{ flex: 1 }}/>
            : <ScrollableTabView
              tabBarUnderlineStyle={_styles.tab_bar_underline}
              tabBarActiveTextColor={Skin1.themeColor}
              tabBarInactiveTextColor={Skin1.textColor1}
              tabBarTextStyle={{ fontSize: scale(20) }}
              style={[{ flex: 1 }]}
              renderTabBar={() => <DefaultTabBar style={_styles.tab_bar}/>}>
              {
                gameData?.map((tabItem, index) => {
                    return (
                      renderDataList(tabItem)
                    )
                  },
                )
              }
            </ScrollableTabView>,
        ]
      }
    </BaseScreen>
  )
}

const _styles = StyleSheet.create({
  container: {},
  tab_bar: {
    backgroundColor: '#f4f4f4',
  },
  tab_bar_underline: {
    height: scale(3),
    backgroundColor: Skin1.themeColor,
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
