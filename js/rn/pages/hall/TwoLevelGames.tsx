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
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
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

  let { game, showBackButton } = route?.params

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
    didFocus: (params) => {
      !gameData?.length && requestGameData()
      setSearchText("");
    },
    didBlur: () => {
      console.log('二級遊戲didBlur');
      setSearchText("");
    },

  }, false)


  /**
   * 游戏数据id
   */
  function gameDataId(){

    let gotoId = anyEmpty(game.id)?game.gameId:game.id
    return gotoId
  }

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
    
    api.game.realGameTypes(gameDataId(), "").useSuccess(({ data }) => {
      let res = { data: data }
     
      if ( anyEmpty(res.data)) {
        return;
      }
      setIsSetData(true)
      for (let index = 0; index < res.data.length; index++) {
        const v = res.data[index];
        v.id = gameDataId();
      }
      refreshUI(res.data)
    })
      .useCompletion(
        (res, err, sm) => {
          setRefreshing(false)
        }
      )
  }

  /**
   * 绘制各Tab列表
   * @param item
   */
  const renderDataList = (item: Array<TwoLevelType>) =>
    <>
      <TwoLevelListComponent
        refreshing={refreshing}
        gameData={item}
        gameID= {gameDataId()}
        requestGameData={requestGameData} />
    </>

  /**
   * 绘制所有的数据
   */
  const renderAllData = () => {
    return (
      isSetData
        ?
        anyEmpty(gameData)
          ? <EmptyView style={{ flex: 1 }} />
          :
          <View>
            <View style={_styles.searchView}>
              <TouchableOpacity
                onPress={() => {
                  setFilterData(gameData)
                }}>
                <Text style={{
                  fontSize: scale(23),
                  color: Skin1.textColor1,
                  marginRight: scale(15),
                }}>全部游戏</Text>
              </TouchableOpacity>
              <TextInput
                style={[_styles.searchInput,{ color: Skin1.textColor1,}]}
                onChangeText={(text) => {
                  setSearchText(text)
                }}
                value={searchText}
              />
              <Button
                title={'搜索'}
                containerStyle={[_styles.searchButton, { backgroundColor: Skin1.themeColor }]}
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
            <ScrollView >
              {renderDataList(filterData)}
              <View
                style={{
                  height: 20,
                }}
              >
              </View>
            </ScrollView>

          </View>
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
          title={game?.name ?? game?.title}
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
