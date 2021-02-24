import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface GameBlockProps {
  containerStyle?: ViewStyle;
  renderGameContent: () => any;
  title: string;
  onPressTotal: () => any;
}

const GameBlock = ({
  title = '',
  containerStyle,
  onPressTotal,
  renderGameContent,
}: GameBlockProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerConatiner}>
        <View style={styles.titleContainer}>
          <View style={styles.titlePillar} />
          <UGText style={styles.title}>{title}</UGText>
        </View>
        <TouchableWithoutFeedback onPress={onPressTotal}>
          <View style={styles.titleContainer}>
            <UGText style={[styles.title, { color: '#e53333' }]}>{'全部 '}</UGText>
            <Ionicons
              name={'ios-arrow-forward'}
              size={scale(18)}
              color={'#e53333'}
              style={{ marginTop: scale(3) }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {renderGameContent && renderGameContent()}
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
    marginTop: scale(3),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
})

export default GameBlock
