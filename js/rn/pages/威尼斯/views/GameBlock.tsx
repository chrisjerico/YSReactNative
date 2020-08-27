
import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { scale } from '../../../public/tools/Scale'
import { IGameIconListItem } from '../../../redux/model/home/IGameBean'

export interface GameSubType {
  cutRow?: number;
  subType?: any[];
  gameIndexHistory?: number;
}


interface GameBlockProps {
  games: any[];
  renderGame: (item: any, index: number) => any;
  gameSubType: GameSubType;
  renderSubType: (item: IGameIconListItem, index: number) => any;
  subTypeContainerStyle?: ViewStyle | ViewStyle[];
  numColumns: number;
}

const GameBlock = ({ games, renderGame, gameSubType, renderSubType, subTypeContainerStyle, numColumns }: GameBlockProps) => {

  const { cutRow, subType } = gameSubType
  const sliceCount = cutRow ? (cutRow * numColumns) : -1
  const mainGames = sliceCount == -1 ? games : games?.slice(0, sliceCount) ?? []
  const subGames = sliceCount == -1 ? [] : games?.slice(sliceCount, games?.length) ?? []

  return (
    <View>
      <View style={styles.gamesContainer}>{mainGames?.map(renderGame)}</View>
      {
        <View style={[styles.gamesContainer, subTypeContainerStyle]}>
          {subType?.map(renderSubType)}
        </View>
      }
      <View style={styles.gamesContainer}>
        {subGames?.map((ele, index) => {
          return renderGame(ele, index + (mainGames?.length ?? 0))
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
  },
})

export default GameBlock