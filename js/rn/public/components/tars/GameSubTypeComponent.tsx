import React, { useState } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { Game, SubType } from '../../models/Interface'
import List from '../../views/tars/List'
import { ugLog } from '../../tools/UgLog'
import { arrayLength } from '../../tools/Ext'

interface RenderGame {
  item: Game
  index: number
  showGameSubType: (index: number) => boolean
}

interface GameSubTypeComponentProps {
  containerStyle?: StyleProp<ViewStyle>
  games: Game[]
  renderGame: (params: RenderGame) => any
  renderSubType?: ({ item, index }: RenderSubType) => any
  subTypeContainerStyle?: StyleProp<ViewStyle>
  numColumns: number
  subTypeNumColumns: number
  uniqueKey: string
  contentContainerStyle?: StyleProp<ViewStyle>
  reRender?: boolean
}

interface RenderSubType {
  item: SubType
  index: number
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
      return false
    } else {
      const subType = games[index]?.subType ?? []
      setIndexHistory(index)
      setCutRow(cutRow)
      setSubType(subType)
      return true
    }
  }

  const sliceCount = cutRow > 0 ? cutRow * numColumns : -1
  const mainGames = sliceCount == -1 ? games : games?.slice(0, sliceCount) ?? []
  const subGames = sliceCount == -1 ? [] : games?.slice(sliceCount, games?.length) ?? []

  //ugLog('renderGameSub mainGames=', JSON.stringify(mainGames))
  return (
    <View style={containerStyle}>
      <List
        uniqueKey={uniqueKey + 'mainGames'}
        contentContainerStyle={contentContainerStyle}
        removeClippedSubviews
        numColumns={numColumns}
        initialNumToRender={arrayLength(mainGames)}
        data={mainGames}
        renderItem={({ item, index }) => {
          return renderGame({ item, index, showGameSubType })
        }}
      />
      {subType?.length > 0 && <List uniqueKey={uniqueKey + 'subType'} removeClippedSubviews numColumns={subTypeNumColumns} style={subTypeContainerStyle} data={subType} renderItem={renderSubType} />}
      <List
        uniqueKey={uniqueKey + 'subGames'}
        contentContainerStyle={contentContainerStyle}
        removeClippedSubviews
        numColumns={numColumns}
        initialNumToRender={arrayLength(subGames)}
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
