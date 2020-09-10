import React, { useState } from 'react'
import { FlatList, View, ViewStyle } from 'react-native'

interface SubType {
  id: string;
  levelType: string;
  name: string;
  openWay: string;
  tipFlag: string;
  sort: string;
  seriesId: string;
  subId: string;
  parentId: string;
  isDelete: string;
  icon: string;
  url: string;
  category: string;
  hot_icon?: any;
  game_code: string;
  is_plus: string;
  site_ids: string;
  site_id: string;
  subtitle: string;
  gameId: string;
  realName: string;
  title: string;
  isInstant: string;
  isSeal: string;
  isClose: string;
  gameType: string;
  logo: string;
}

interface Game {
  id: string;
  icon: string;
  name: string;
  url: string;
  category: string;
  levelType: string;
  sort: string;
  seriesId: string;
  subId: any;
  tipFlag: string;
  openWay: string;
  hotIcon: string;
  gameCode: string;
  subtitle: string;
  subType: SubType[];
  gameId: any;
  realName: string;
  title: string;
  type: string;
  admin_uid: string;
  enable: string;
  headadd: string;
  footadd: string;
  domain: string;
  docType?: number;
  gameType: string;
  logo: string;
  isInstant: string;
  isSeal: string;
  isClose: string;
  supportTrial?: number;
  isPopup?: number;
}

interface RenderGame {
  item: Game;
  index: number;
  showGameSubType: (index: number) => any;
}

interface GameSubTypeComponentProps {
  containerStyle?: ViewStyle | ViewStyle[];
  games: Game[];
  renderGame: (params: RenderGame) => any;
  renderSubType?: ({ item, index }: RenderSubType) => any;
  subTypeContainerStyle?: ViewStyle | ViewStyle[];
  numColumns: number;
  subTypeNumColumns: number;
  listKey: string;
  contentContainerStyle?: ViewStyle | ViewStyle[];
}

interface RenderSubType {
  item: SubType;
  index: number;
}

const GameSubTypeComponent = ({
  games = [],
  renderGame,
  containerStyle,
  renderSubType,
  subTypeContainerStyle,
  numColumns,
  subTypeNumColumns,
  listKey,
  contentContainerStyle
}: GameSubTypeComponentProps) => {

  const [indexHistory, setIndexHistory] = useState(-1)
  const [cutRow, setCutRow] = useState(-1)
  const [subType, setSubType] = useState([])

  const showGameSubType = (index: number) => {
    const cutRow = Math.ceil((index + 1) / numColumns)
    if (index == indexHistory) {
      setIndexHistory(null)
      setCutRow(null)
      setSubType([])
    } else {
      setIndexHistory(index)
      setCutRow(cutRow)
      setSubType(games[index]?.subType ?? [])
    }
  }

  const sliceCount = cutRow > 0 ? cutRow * numColumns : -1
  const mainGames = sliceCount == -1 ? games : games?.slice(0, sliceCount) ?? []
  const subGames =
    sliceCount == -1 ? [] : games?.slice(sliceCount, games?.length) ?? []

  return (
    <View style={containerStyle}>
      <FlatList
        contentContainerStyle={contentContainerStyle}
        legacyImplementation={true}
        removeClippedSubviews={true}
        listKey={listKey + 'mainGames'}
        keyExtractor={(_, index) => listKey + index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        numColumns={numColumns}
        data={mainGames}
        renderItem={({ item, index }) => {
          return renderGame({ item, index, showGameSubType })
        }}
      />
      <FlatList
        legacyImplementation
        removeClippedSubviews={true}
        listKey={listKey + 'subType'}
        keyExtractor={(_, index) => listKey + index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        numColumns={subTypeNumColumns}
        style={subTypeContainerStyle}
        data={subType}
        renderItem={renderSubType}
      />
      <FlatList
        contentContainerStyle={contentContainerStyle}
        legacyImplementation
        removeClippedSubviews={true}
        listKey={listKey + 'subGames'}
        keyExtractor={(_, index) => listKey + index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        numColumns={numColumns}
        data={subGames}
        renderItem={({ item, index }) => {
          return renderGame({
            item,
            index: index + (mainGames?.length ?? 0),
            showGameSubType,
          })
        }}
      />
    </View>
  )
}

export default GameSubTypeComponent
