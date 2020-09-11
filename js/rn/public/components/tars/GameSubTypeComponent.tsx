import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import List from '../../views/tars/List'

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
  uniqueKey: string;
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
  uniqueKey = 'uniqueKey',
  contentContainerStyle,
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
      <List
        uniqueKey={uniqueKey + 'mainGames'}
        contentContainerStyle={contentContainerStyle}
        legacyImplementation={true}
        removeClippedSubviews={true}
        numColumns={numColumns}
        data={mainGames}
        renderItem={({ item, index }) => {
          return renderGame({ item, index, showGameSubType })
        }}
      />
      <List
        uniqueKey={uniqueKey + 'subType'}
        legacyImplementation
        removeClippedSubviews={true}
        numColumns={subTypeNumColumns}
        style={subTypeContainerStyle}
        data={subType}
        renderItem={renderSubType}
      />
      <List
        uniqueKey={uniqueKey + 'subGames'}
        contentContainerStyle={contentContainerStyle}
        legacyImplementation
        removeClippedSubviews={true}
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
