import { Dimensions, FlatList, RefreshControl, StyleSheet, Text, TouchableWithoutFeedback, View, Image, Platform } from 'react-native'
import * as React from 'react'
import { HallGameData, HallGameListData } from '../../../../public/network/Model/game/HallGameModel'
import CommStyles from '../../../base/CommStyles'
import { anyEmpty } from '../../../../public/tools/Ext'
import EmptyView from '../../../../public/components/view/empty/EmptyView'
import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import LotteryBall from '../../../../public/components/view/LotteryBall'
import Button from '../../../../public/views/tars/Button'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { SeriesId } from '../../../../public/models/Enum'
import UseGameHall from '../UseGameHall'
import { Data } from '../../../../public/network/Model/HomeRecommendModel'
import { push } from '../../../../public/navigation/RootNavigation'
import { PageName } from '../../../../public/navigation/Navigation'
import { Res } from '../../../../Res/icon/Res'
import AppDefine from '../../../../public/define/AppDefine'
import { UGUserCenterType } from '../../../../redux/model/全局/UGSysConfModel'
import PushHelper from '../../../../public/define/PushHelper'
import { OCHelper } from '../../../../public/define/OCHelper/OCHelper'
import { ugLog } from '../../../../public/tools/UgLog'
import { BallType } from '../../../bet/const/LotteryConst'
import { UGText } from '../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface IHallGameList {
  refreshing?: boolean //刷新
  gameData?: Array<Data> //所有数据
  requestGameData?: () => void //请求数据
}

/**
 * 游戏大厅列表
 * @param navigation
 * @constructor
 */
const LobbyGameListComponent = ({
  refreshing,
  gameData,
  requestGameData,
}: IHallGameList) => {

  const {
    systemInfo,
    userInfo,
  } = UseGameHall()

  //刷新控件
  const refreshCT = <RefreshControl refreshing={refreshing}
    onRefresh={() => {
      requestGameData()
    }} />

  /**
   * 得到图标
   * @param type
   */
  const games = {
    subId: {
      'lottery': 47,
      'game': 44,
      'fish': 48,
      'card': 43,
      'esport': 46,
      'real': 42,
      'sport': 45,
    },
    icons: {
      'lottery': Res.lottery_ticket,
      'game': Res.game,
      'fish': Res.fish,
      'card': Res.chess,
      'esport': Res.dj,
      'real': Res.real_person,
      'sport': Res.sports,
    }
  }

  /**
   * 绘制彩票信息
   * @param item
   */
  const renderItemContent = (item: Data) => {

    return (
      <TouchableWithoutFeedback onPress={() => {

        if (item.category == 'lottery') {
          if (systemInfo?.mobileGameHall == '1') {//新彩票大厅
            push(PageName.GameHallPage, { showBackButton: true })
          } else if (systemInfo?.mobileGameHall == '2') {//自由彩票大厅
            push(PageName.FreedomHallPage, { showBackButton: true })
          } else if (systemInfo?.mobileGameHall == '0'){
            push(PageName.OldLetteyHallPage, { showBackButton: true })
          }
        } else {


              //如果是威尼斯
              if (Skin1.skitType.indexOf('威尼斯') != -1) {
                push(PageName.SeriesLobbyPage,
                  {
                    gameId: 0,
                    subId: games.subId[item.category],
                    name: item.categoryName,
                    headerColor: Skin1.themeColor,
                    homePage: PageName.WNZHomePage
                  })
              }
              else {

                push(PageName.JDLotterySecondPage, {
                  dataArray: item.games,
                  title: item.categoryName+'系列',

                })
              }
        }
      }}>
        <View style={[_styles.game_item_container, { backgroundColor: Skin1.homeContentColor, }]}>
          <Image
            style={{ width: 60, height: 60, marginRight: 10,marginTop:10,marginLeft:10 }}
            source={{ uri: games.icons[item.category] }} />
          <View>
            <UGText
              style={[_styles.category_name, { color: Skin1.textColor1, marginRight: 10,marginTop:18 },]}
            >{item.categoryName}系列</UGText>
            <UGText
              style={[_styles.play_now, { marginTop: 10, },]}
            >立即游戏</UGText>
          </View>
        </View>
      </TouchableWithoutFeedback>


    )
  }

  return (
    <View style={[CommStyles.flex, _styles.container,]}>
      {
        [
          anyEmpty(gameData)
            ? <EmptyView style={{ flex: 1 }} />
            : <FlatList
              refreshControl={refreshCT}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.category + index}
              data={gameData}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  renderItemContent(item)
                )
              }} />,
        ]
      }
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  game_item_container: {
    flexDirection: 'row',
    marginHorizontal: scale(16),
    marginVertical: scale(16),
    width:scale(230),
    height:scale(130),
    borderRadius: scale(10),

  },
  category_name: {
    fontWeight: 'bold',
    fontSize: scale(20),
    marginTop: scale(5),
    marginBottom: scale(15)
  },
  play_now: {
    fontWeight: 'bold',
    fontSize: scale(18),
    color: 'red'
  }
})

export default LobbyGameListComponent
