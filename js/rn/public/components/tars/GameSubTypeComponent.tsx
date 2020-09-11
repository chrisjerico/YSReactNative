import React, { useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { Game, SubType } from '../../models/Interface'
import List from '../../views/tars/List'

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
