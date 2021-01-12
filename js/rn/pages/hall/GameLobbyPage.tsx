import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { BaseScreen } from '../乐橙/component/BaseScreen'
import { anyEmpty, arrayEmpty } from '../../public/tools/Ext'
import { scale } from '../../public/tools/Scale'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { UGColor } from '../../public/theme/UGThemeColor'
import EmptyView from '../../public/components/view/empty/EmptyView'
import HallGameListComponent from './new/games/HallGameListComponent'
import { HomeRecommendModel, Data } from '../../public/network/Model/HomeRecommendModel'
import APIRouter from '../../public/network/APIRouter'
import { ugLog } from '../../public/tools/UgLog'
import { Toast } from '../../public/tools/ToastUtils'
import UseGameHall from './new/UseGameHall'
import Modal from 'react-native-modal'
import RightMenu from '../../public/components/menu/RightMenu'
import Icon from 'react-native-vector-icons/FontAwesome'
import PushHelper from '../../public/define/PushHelper'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import BackBtnComponent from '../../public/components/tars/BackBtnComponent'
import { PageName } from '../../public/navigation/Navigation'
import MineHeader from '../../public/views/tars/MineHeader'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import CommStyles from '../base/CommStyles'
import { setProps, UGBasePageProps } from '../base/UGPage'
import { navigate, pop } from '../../public/navigation/RootNavigation'
import { api } from '../../public/network/NetworkRequest1/NetworkRequest1'
import { PayAisleListData } from '../../public/network/Model/wd/PayAisleModel'
import LobbyGameListComponent from './new/games/LobbyGameListComponent'
import { ScrollView } from 'react-native-gesture-handler'

/**
 * 游戏大厅
 * @param navigation
 * @constructor
 */
const GameLobbyPage = ({ navigation, route, setProps }: UGBasePageProps) => {

  const { showBackButton } = route?.params

  const [refreshing, setRefreshing] = useState(false) //是否刷新中
  const [isSetData, setIsSetData] = useState(false) //是否存取過數據
  const [gameData, setGameData] = useState<Array<Data>>([])//所有数据

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

    // 刷新UI
    function refreshUI(data: Data[]) {
      setRefreshing(false)
      setGameData(data)
    }

    // 获取彩票数据
    APIRouter.game_homeRecommend().then(({ data: res }) => {
      ugLog('data res=', res)
      if (res?.code == 0) {
        let resData = res?.data
        setIsSetData(true)
        refreshUI(res?.data)
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
  const renderDataList = (item: Array<Data>) =>
    <LobbyGameListComponent refreshing={refreshing}
                           gameData={item}
                           requestGameData={requestGameData}/>

  /**
   * 绘制所有的数据
   */
  const renderAllData = () => {
    return (
      isSetData
      ?
      anyEmpty(gameData)
        ? <EmptyView style={{ flex: 1 }}/>
        : <ScrollView>
          {renderDataList(gameData)}
        </ScrollView>
      : <View></View>
    )
  }

  return (
    <View style={CommStyles.flex}>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader
          showBackBtn={anyEmpty(showBackButton) ? true : showBackButton == '1'}
          onPressBackBtn={() => {
                pop()
            }
          }
          title={'游戏大厅'}
        />
      </SafeAreaHeader>
      {
        renderAllData()
      }
    </View>
  )
}

export default GameLobbyPage
