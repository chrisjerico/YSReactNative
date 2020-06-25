import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { scale } from '../../../../helpers/function'

interface GameBlockProps {
  containerStyle?: ViewStyle;
  games: any[];
  renderGame: (item: any, index: number) => any;
  title: string;
  onPressTotal: () => any;
}

const GameBlock = ({
  title = '',
  games,
  renderGame,
  containerStyle,
  onPressTotal,
}: GameBlockProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.titleConatiner}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <View
            style={{
              width: scale(7),
              height: '70%',
              backgroundColor: '#EA0000',
              marginRight: scale(10),
              borderRadius: scale(10),
            }}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onPressTotal}>
          <Text style={[styles.title, { color: '#EA0000' }]}>{'全部 >'}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonContainer, containerStyle]}>
        {games.map(renderGame)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    backgroundColor: '#ffffff',
  },
  titleConatiner: {
    width: '100%',
    height: scale(53),
    borderColor: '#dddddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
  },
})

export default GameBlock
