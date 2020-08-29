import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import { scale } from '../../../public/tools/Scale'
import { IGameIconListItem } from '../../../redux/model/home/IGameBean'
import Ionicons from 'react-native-vector-icons/Ionicons'

export interface GameSubType {
  cutRow?: number;
  subType?: any[];
  gameIndexHistory?: number;
}

interface GameBlockProps {
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  games: any[];
  renderGame: (item: any, index: number) => any;
  title: string;
  onPressTotal: () => any;
  renderSubType?: (item: IGameIconListItem, index: number) => any;
  subTypeContainerStyle?: ViewStyle | ViewStyle[];
  gameSubType?: GameSubType;
  numColumns: number;
}

const GameBlock = ({
  title = '',
  games = [],
  renderGame,
  containerStyle,
  contentContainerStyle,
  onPressTotal,
  renderSubType,
  subTypeContainerStyle,
  gameSubType = {},
  numColumns
}: GameBlockProps) => {
  const { cutRow, subType } = gameSubType
  const sliceCount = cutRow ? (cutRow * numColumns) : -1
  const mainGames = sliceCount == -1 ? games : games?.slice(0, sliceCount) ?? []
  const subGames = sliceCount == -1 ? [] : games?.slice(sliceCount, games?.length) ?? []

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerConatiner}>
        <View style={styles.titleContainer}>
          <View style={styles.titlePillar} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableWithoutFeedback onPress={onPressTotal}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: '#e53333' }]}>{'全部 '}</Text>
            <Ionicons name={'ios-arrow-forward'} size={scale(18)} color={'#e53333'} style={{ marginTop: scale(3) }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={[contentContainerStyle]}>
        <View style={styles.gamesContainer}>{mainGames?.map(renderGame)}</View>
        {
          subType?.length > 0 && <View style={[styles.gamesContainer, subTypeContainerStyle]}>
            {subType?.map(renderSubType)}
          </View>
        }
        <View style={styles.gamesContainer}>
          {subGames?.map((ele, index) => {
            return renderGame(ele, index + (mainGames?.length ?? 0))
          })}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    backgroundColor: '#ffffff',
    paddingBottom: scale(20),
    paddingTop: scale(10),
  },
  headerConatiner: {
    width: '100%',
    aspectRatio: 11.8,
    borderColor: '#f2f2f2',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(23),
  },
  titlePillar: {
    width: scale(5.5),
    height: '110%',
    backgroundColor: '#e53333',
    marginRight: scale(10),
    borderRadius: scale(10),
    marginTop: scale(3)
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10)
  },
})

export default GameBlock
