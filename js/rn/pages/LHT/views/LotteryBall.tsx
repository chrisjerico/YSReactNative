import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface LotteryBallProps {
  score?: number | string
  size?: number
  color?: string
  text?: string
  showMore?: boolean
  onPress: () => any
  square?: boolean
}

const factor = 1.3

const LotteryBall = ({ score = null, size = 35, color = '#ff0000', text = '', showMore = false, onPress, square = false }: LotteryBallProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={showMore ? styles.showMoreContainer : styles.container}>
        <View
          style={[
            styles.circleConatiner,
            {
              height: scale(30 + size),
            },
          ]}>
          {showMore ? (
            <Icon type={'antdesign'} name={'plus'} color={'#9D9D9D'} />
          ) : square ? (
            <View
              style={[
                styles.squareContainer,
                {
                  width: size,
                  backgroundColor: color,
                },
              ]}>
              <UGText style={{ fontSize: scale(size * 0.6), color: '#ffffff' }}>{score}</UGText>
            </View>
          ) : (
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: color,
                  width: scale(size * factor),
                  aspectRatio: 1,
                  borderRadius: scale(size * factor),
                },
              ]}>
              <View
                style={[
                  styles.scoreContainer,
                  {
                    width: scale(size),
                    aspectRatio: 1,
                    borderRadius: scale(size),
                  },
                ]}>
                <UGText style={{ fontSize: scale(size * 0.6) }}>{score}</UGText>
              </View>
            </View>
          )}
        </View>
        <View style={styles.textContainer}>
          <UGText>{text}</UGText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  squareContainer: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  showMoreContainer: {
    width: scale(30),
    aspectRatio: 30 / 82,
    alignItems: 'center',
  },
  circleConatiner: {
    justifyContent: 'center',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    height: scale(30),
  },
})

export default LotteryBall
