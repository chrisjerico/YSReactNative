import { Dimensions, FlatList, RefreshControl, StyleSheet, Text, TouchableWithoutFeedback, View, Image, ImageBackground, Platform } from 'react-native'
import * as React from 'react'
import { HallGameData, HallGameListData } from '../../../../public/network/Model/game/HallGameModel'
import CommStyles from '../../../base/CommStyles'
import { anyEmpty } from '../../../../public/tools/Ext'
import EmptyView from '../../../../public/components/view/empty/EmptyView'
import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import LotteryBall, { BallType } from '../../../../public/components/view/LotteryBall'
import Button from '../../../../public/views/tars/Button'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { SeriesId } from '../../../../public/models/Enum'
import UseGameHall from '../UseGameHall'
import { Data, TwoLevelGame, TwoLevelType } from '../../../../public/network/Model/HomeRecommendModel'
import { push } from '../../../../public/navigation/RootNavigation'
import { PageName } from '../../../../public/navigation/Navigation'
import { Res } from '../../../../Res/icon/Res'
import { ANHelper } from '../../../../public/define/ANHelper/ANHelper'
import { CMD } from '../../../../public/define/ANHelper/hp/CmdDefine'
import { OCHelper } from '../../../../public/define/OCHelper/OCHelper'
import { api } from '../../../../public/network/NetworkRequest1/NetworkRequest1'
import { showLoading } from '../../../../public/widget/UGLoadingCP'

interface ITwoLevelGameList {
  refreshing?: boolean //刷新
  gameData?: Array<TwoLevelType> //所有数据
  requestGameData?: () => void //请求数据
  gameID?:string //游戏id
}

/**
 * 游戏大厅列表
 * @param navigation
 * @constructor
 */
const TwoLevelListComponent = ({ refreshing,
                                 gameData,
                                 requestGameData,
                                 gameID,
                               }: ITwoLevelGameList) => {

  const {
    systemInfo,
    userInfo,
  } = UseGameHall()

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      requestGameData()
                                    }}/>

  /**
   * 绘制彩票信息
   * @param item
   */
  const renderItemContent = (item: TwoLevelType) => {

    return (
      <TouchableWithoutFeedback onPress={() => {
        const game = {
        seriesId: '5',
        gameId: item.id,
        gameCode: item.code,
      }

      const gameIOS = {
        seriesId: '5',
        gameId: gameID,
        subId:gameID,
        gameCode: item.code,
        clsName:'GameModel',
      }
      switch (Platform.OS) {
        case 'ios':
          OCHelper.call('UGNavigationController.current.pushViewControllerWithGameModel:', [gameIOS])
          break;
        case 'android':
          ANHelper.callAsync(CMD.OPEN_NAVI_PAGE, game)
          break;
      }

        
      }}>
      <View style={_styles.game_item_container}>
        <ImageBackground 
          style={{ height: scale(160), width: scale(160)}} 
          source={{ uri: item.pic }}>
            <Text
              style={_styles.name}
              >{item.name}</Text>
          </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={[CommStyles.flex]}>
      {
        [
          anyEmpty(gameData)
            ? <EmptyView style={{ flex: 1 }}/>
            : <FlatList
                refreshControl={refreshCT}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.code + index}
                data={gameData}
                numColumns={3}
                renderItem={({ item, index }) => {
                  return (
                    renderItemContent(item)
                  )
                }}/>,
        ]
      }
    </View>
  )
}

const _styles = StyleSheet.create({
  game_item_container: {
    flexDirection: 'column',
    alignContent: 'space-around',
    borderRadius: scale(5),
    margin: scale(10),
  },
  name: { 
    width: '100%',
    color: "white",
    fontSize: scale(22), 
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
})

export default TwoLevelListComponent
