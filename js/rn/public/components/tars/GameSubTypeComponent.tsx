import React, { useState } from 'react'
import { FlatList, View, ViewStyle } from 'react-native'
import { List, SubType } from '../../network/Model/HomeGamesModel'

interface RenderGame {
  item: List;
  index: number;
  onPressGameSubType: (index: number) => any;
}

interface GameSubTypeComponentProps {
  containerStyle?: ViewStyle | ViewStyle[];
  games: List[];
  renderGame: (params: RenderGame) => any;
  renderSubType?: ({ item, index }: RenderSubType) => any;
  subTypeContainerStyle?: ViewStyle | ViewStyle[];
  numColumns: number;
  subTypeNumColumns: number;
  listKey: string;
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
  listKey
}: GameSubTypeComponentProps) => {

  const [indexHistory, setIndexHistory] = useState(-1)
  const [cutRow, setCutRow] = useState(-1)
  const [subType, setSubType] = useState([])

  const onPressGameSubType = (index: number) => {
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
        removeClippedSubviews={true}
        listKey={listKey + 'mainGames'}
        keyExtractor={(_, index) => listKey + index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        numColumns={numColumns}
        data={mainGames}
        renderItem={({ item, index }) => {
          return renderGame({ item, index, onPressGameSubType })
        }}
      />
      <FlatList
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
            onPressGameSubType,
          })
        }}
      />
    </View>
  )
}

export default GameSubTypeComponent
