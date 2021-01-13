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
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { PushHomeGame } from '../../public/models/Interface'
import Button from '../../public/views/temp/Button'
import TwoLevelType from '../../public/network/Model/HomeRecommendModel'
import TwoLevelListComponent from '../hall/new/games/TwoLevelListComponent'

interface TwoLevelProps {
  showBackButton: Boolean,
  game: PushHomeGame
}

/**
 * 二級遊戲
 * @param navigation
 * @constructor
 */
const TwoLevelGames = ({ navigation, route, setProps }: UGBasePageProps) => {

  const { game, showBackButton} = route?.params

  const [refreshing, setRefreshing] = useState(false) //是否刷新中
  const [isSetData, setIsSetData] = useState(false) //是否存取過數據
  const [gameData, setGameData] = useState<Array<TwoLevelType>>([])//所有数据
  const [filterData, setFilterData] = useState<Array<TwoLevelType>>([])
  const [searchText, setSearchText] = useState("")  //搜尋二級遊戲

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
    function refreshUI(data: TwoLevelType[]) {
      setRefreshing(false)
      setGameData(data)
      setFilterData(data)
    }
    
    // 获取彩票数据
    APIRouter.game_realGameTypes(game.gameId, "").then(({ data: res }) => {
      ugLog('data res=', res)
      if (res?.code == 0) {
        setIsSetData(true)
        res?.data.forEach((v) => {
          v.id = game.gameId
        })
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
  const renderDataList = (item: Array<TwoLevelType>) =>
    <>
      <View style={_styles.searchView}>
        <Text style={{ 
          fontSize: scale(23),
          color: Skin1.themeColor, 
          marginRight: scale(15), }}>全部游戏</Text>
        <TextInput 
            style={_styles.searchInput}
            onChangeText={ (text) => {
                setSearchText(text)
            }}
            />
        <Button
            title={'搜索'}
            containerStyle={[_styles.searchButton, {backgroundColor: Skin1.themeColor}]}
            titleStyle={{ 
              color: '#ffffff',
              fontSize: scale(23)
            }}
            onPress={() => {
              setFilterData(gameData.filter((v) => {
                return v.name.includes(searchText)
              }))
            }} /> 
      </View>
      <TwoLevelListComponent 
        refreshing={refreshing}
        gameData={item}
        requestGameData={requestGameData}/>
    </>

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
          {renderDataList(filterData)}
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
          title={game.name}
        />
      </SafeAreaHeader>
      {
        renderAllData()
      }
    </View>
  )
}

const _styles = StyleSheet.create({
  searchView: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10)
  },
  searchInput: { 
    width: scale(250),
    height: scale(50),
    fontSize: scale(23),
    color: Skin1.textColor1, 
    marginRight: scale(15), 
    borderColor: Skin1.textColor1, 
    borderRadius: scale(5),
    borderWidth: scale(1),
    textAlignVertical: 'center',
    paddingVertical: scale(0),
    paddingLeft: scale(10),
  },
  searchButton: { 
    width: scale(85), 
    height: scale(50),
    borderRadius: scale(2) 
  }
})

export default TwoLevelGames
