
import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { scale } from '../../../public/tools/Scale'
import { IGameIconListItem } from '../../../redux/model/home/IGameBean'

export interface GameSubType {
  gemaCutRow?: number;
  subType?: any[];
  indexHistory?: number;
}


interface GameBlockProps {
  games: any[];
  renderGame: (item: any, index: number) => any;
  gameSubType: GameSubType;
  renderSubType: (item: IGameIconListItem, index: number) => any;
  subTypeContainerStyle?: ViewStyle | ViewStyle[];
}

const GameBlock = ({ games, renderGame, gameSubType, renderSubType, subTypeContainerStyle }: GameBlockProps) => {

  const { gemaCutRow, subType } = gameSubType
  const cutElement = gemaCutRow ? gemaCutRow * 4 : -1
  const mainGames = games?.slice(0, cutElement) ?? []
  const subGames = games?.slice(cutElement, -1) ?? []

  console.log("____gemaCutRow-------", gemaCutRow)
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