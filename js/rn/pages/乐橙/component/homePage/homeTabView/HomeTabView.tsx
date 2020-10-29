import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { RecommendTabView } from './recommendTab/RecommendTabView'
import { LotteryTabView } from './lotteyTab/LotteryTabView'
import { GameListView } from './lotteyTab/GameListView'
import { Icon, List } from '../../../../../public/network/Model/HomeGamesModel'
import { View } from 'react-native'
import { UGStore } from '../../../../../redux/store/UGStore'
import PushHelper from '../../../../../public/define/PushHelper'

export const HomeTabView = ({ homeGames }) => {
  const [height, setHeight] = useState(77)
  const userStore = UGStore.globalProps.userInfo
  const { uid = '' } = userStore

  useEffect(() => {
    homeGames && calculateHeight(0)
  }, [homeGames])

  const thirdPartGamePress = (id: string, gameID?: string) => {
    if (uid != '') {
      const result = homeGames.filter((res) => res.id == id)
      if (gameID && result.length > 0) {
        const gameData = result[0].list.filter((res) => res.id == gameID)
        //@ts-ignore
        PushHelper.pushHomeGame(gameData[0])
      } else if (!gameID && result.length > 0) {
      } else {
      }
    } else {
      PushHelper.pushLogin()
    }
  }

  const calculateHeight = (index: number) => {
    let h = 56
    const list: List[] = homeGames[index]?.list ? homeGames[index]?.list : []
    if (index == 0) {
      h = h + 135
      if (list[0]) {
        h = h + 153
      }
      if (list[1]) {
        h = h + 117
      }
      h = h + Math.ceil((list.length - 3) / 2) * 110
    } else if (index == 1) {
      if (list.length > 1) {
        h = h + 108
      }
      if (list.length > 2) {
        h = h + 28.3
        h = h + Math.ceil((list.length - 2) / 3) * 100
      }
    } else {
      h = list.length >= 2 ? Math.ceil(list.length / 2) * 165 + h : h
    }
    setHeight(h)
  }

  const onPress = (list: List) => {
    list.seriesId != '1'
      ? thirdPartGamePress(list.seriesId, list.gameId)
      : list.gameId
      ? PushHelper.pushCategory(list.seriesId, list.gameId)
      : PushHelper.pushCategory(list.seriesId, list.subType[0]?.gameId)
  }

  const getTab = (item: Icon, index: number) => {
    return index == 0 ? (
      <RecommendTabView onPress={onPress} list={item.list} tabLabel={item.name} />
    ) : index == 1 ? (
      <LotteryTabView onPress={onPress} list={item.list} tabLabel={item.name} />
    ) : (
      <GameListView list={item.list} onPress={onPress} tabLabel={item.name} />
    )
  }

  return homeGames ? (
    <ScrollableTabView
      onChangeTab={({ i }) => calculateHeight(i)}
      tabBarUnderlineStyle={{ height: 2, backgroundColor: '#3c3c3c', marginBottom: 10, width: 36, marginLeft: 16 }}
      tabBarTextStyle={{ color: '#3c3c3c' }}
      style={{
        height,
        marginHorizontal: 10,
        backgroundColor: '#ffffff',
        borderRadius: 16,
      }}
      renderTabBar={() => <ScrollableTabBar />}
    >
      {homeGames.length > 0 ? (
        homeGames.map((item, index) => {
          return getTab(item, index)
        })
      ) : (
        <View />
      )}
    </ScrollableTabView>
  ) : null
}
