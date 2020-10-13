import ScrollableTabView from 'react-native-scrollable-tab-view'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { RecommendTabView } from './recommendTab/RecommendTabView'
import { LotteryTabView } from './lotteyTab/LotteryTabView'
import { GameListView } from './lotteyTab/GameListView'
import useGetHomeInfo from '../../../../../public/hooks/useGetHomeInfo'
import { Icon, List } from '../../../../../public/network/Model/HomeGamesModel'
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { UGStore } from '../../../../../redux/store/UGStore'
import PushHelper from '../../../../../public/define/PushHelper'
import AppDefine from '../../../../../public/define/AppDefine'

export const HomeTabView = () => {
  const { homeGames } = useGetHomeInfo()
  const [games, setGames] = useState<Icon[]>([])
  const [height, setHeight] = useState(77)
  const userStore = UGStore.globalProps.userInfo
  const { uid = '' } = userStore

  useEffect(() => {
    homeGames?.data?.icons && setGames(homeGames.data.icons)
    homeGames?.data?.icons && calculateHeight(0)
  }, [homeGames])

  const thirdPartGamePress = (id: string, gameID?: string) => {
    if (uid != '') {
      const result = homeGames.data.icons.filter((res) => res.id == id)
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
    const list: List[] = games[index]?.list ? games[index]?.list : []
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
      h = list.length >= 2 ? Math.ceil(list.length / 2) * 125 + h : h
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

  return homeGames?.data?.icons ? (
    <ScrollableTabView
      onChangeTab={({ i }) => calculateHeight(i)}
      tabBarUnderlineStyle={{ height: 2, backgroundColor: '#3c3c3c' }}
      tabBarTextStyle={{ color: '#3c3c3c' }}
      style={{
        height,
        marginTop: 8,
        marginHorizontal: 10,
        backgroundColor: '#ffffff',
        borderRadius: 16,
      }}
      renderTabBar={(props) => (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={{
            height: 56,
            flexDirection: 'row',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}>
          {props.tabs.map((name, page) => {
            const isTabActive = props.activeTab === page
            const textColor = isTabActive ? '#000000' : '#555'
            const backgroundColor = '#fff'
            return (
              <TouchableWithoutFeedback key={page} onPress={() => props.goToPage(page)}>
                <View
                  style={{
                    backgroundColor,
                    width: AppDefine.width / 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: isTabActive ? '#000000' : '#fff',
                    }}>
                    <Text style={[{ color: textColor, marginVertical: 8, fontSize: 16 }]}>{name}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          })}
        </ScrollView>
      )}>
      {games.length > 0 ? (
        games.map((item, index) => {
          return getTab(item, index)
        })
      ) : (
        <View />
      )}
    </ScrollableTabView>
  ) : null
}
