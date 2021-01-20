import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { RecommendTabView } from './recommendTab/RecommendTabView'
import { LotteryTabView } from './lotteyTab/LotteryTabView'
import { GameListView } from './lotteyTab/GameListView'
import { Icon, List } from '../../../../../public/network/Model/HomeGamesModel'
import { View } from 'react-native'
import { UGStore } from '../../../../../redux/store/UGStore'
import PushHelper from '../../../../../public/define/PushHelper'
import useHomePage from '../../../../../public/hooks/tars/useHomePage'
import { navigate, push } from '../../../../../public/navigation/RootNavigation'
import { PageName } from '../../../../../public/navigation/Navigation'
import { WNZThemeColor } from '../../../../../public/theme/colors/WNZThemeColor'
import { LCThemeColor } from '../../../../../public/theme/colors/LCThemeColor'
import { GameType } from '../../../../../public/models/Enum'
import { LHThemeColor } from '../../../../../public/theme/colors/LHThemeColor'
import { MenuType } from '../../../../../public/define/ANHelper/hp/GotoDefine'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'

export const HomeTabView = ({ homeGames, sysInfo }) => {
  const [height, setHeight] = useState(77)

  useEffect(() => {
    homeGames && calculateHeight(0)
  }, [homeGames])

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
      h = list.length >= 2 ? Math.ceil(list.length / 2) * 153 + h : h
    }
    setHeight(h)
  }

  const onPress = (list: List) => {
    const { gameId, subId, name } = list
    if (gameId == GameType.大厅
      && (subId != MenuType.CQK &&
        subId != MenuType.CZ &&
        subId != MenuType.TX &&
        subId != MenuType.ZHGL &&
        subId != MenuType.CZJL &&
        subId != MenuType.TXJL)) {
      if (subId == 47 && sysInfo?.mobileGameHall == '1') {//新彩票大厅
        push(PageName.GameHallPage, { showBackButton: true })

      } else if (subId == 47 && sysInfo?.mobileGameHall == '2') {//自由彩票大厅
        push(PageName.FreedomHallPage, { showBackButton: true })

      } else {
        push(PageName.SeriesLobbyPage,
          {
            gameId,
            subId,
            name,
            headerColor: Skin1.themeColor,
            homePage: PageName.LCHomePage,
          })
      }
    } else {
      PushHelper.pushHomeGame(list)
    }
  }

  const getTab = (item: Icon, index: number) => {
    return index == 0 ? (
      <RecommendTabView onPress={onPress} key={index} list={item.list} tabLabel={item.name} />
    ) : index == 1 ? (
      <LotteryTabView onPress={onPress} key={index} list={item.list} tabLabel={item.name} />
    ) : (
      <GameListView list={item.list} key={index} onPress={onPress} tabLabel={item.name} />
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
      renderTabBar={() => <ScrollableTabBar />}>
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
