import { StyleSheet, View } from 'react-native'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { anyEmpty } from '../../public/tools/Ext'
import { scale } from '../../public/tools/Scale'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { UGColor } from '../../public/theme/UGThemeColor'
import EmptyView from '../../public/components/view/empty/EmptyView'
import { Data } from '../../public/network/Model/HomeRecommendModel'
import APIRouter from '../../public/network/APIRouter'
import { ugLog } from '../../public/tools/UgLog'
import { Toast } from '../../public/tools/ToastUtils'
import UseGameHall from './new/UseGameHall'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/tars/MineHeader'
import CommStyles from '../base/CommStyles'
import { UGBasePageProps } from '../base/UGPage'
import { pop } from '../../public/navigation/RootNavigation'
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

export default GameLobbyPage
