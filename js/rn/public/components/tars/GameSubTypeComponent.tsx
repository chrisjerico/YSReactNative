import React, { useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { IGameIconListItem } from '../../../redux/model/home/IGameBean'

interface RenderGame {
  item: any;
  index: number;
  onPressGameSubType: (index: number) => any;
}

interface GameSubTypeComponentProps {
  containerStyle?: ViewStyle | ViewStyle[];
  games: any[];
  renderGame: (params: RenderGame) => any;
  renderSubType?: (item: IGameIconListItem, index: number) => any;
  subTypeContainerStyle?: ViewStyle | ViewStyle[];
  numColumns: number;
}

const GameSubTypeComponent = ({
  games = [],
  renderGame,
  containerStyle,
  renderSubType,
  subTypeContainerStyle,
  numColumns,
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
      <View style={styles.gamesContainer}>
        {mainGames?.map((item, index) => {
          return renderGame({ item, index, onPressGameSubType })
        })}
      </View>
      {subType?.length > 0 && (
        <View style={[styles.gamesContainer, subTypeContainerStyle]}>
          {subType?.map(renderSubType)}
        </View>
      )}
      <View style={styles.gamesContainer}>
        {subGames?.map((item, index) => {
          return renderGame({
            item,
            index: index + (mainGames?.length ?? 0),
            onPressGameSubType,
          })
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
})

export default GameSubTypeComponent
