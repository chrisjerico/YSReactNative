import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { scale } from '../../../public/tools/Scale';

interface LotteryBallProps {
  score?: number | string;
  size?: number;
  color?: string;
  text?: string;
  showMore?: boolean;
  onPress: () => any;
  square?: boolean;
}

const factor = 1.3;

const LotteryBall = ({ score = null, size = 35, color = '#ff0000', text = '', showMore = false, onPress, square = false }: LotteryBallProps) => {
  return (
    <TouchableOpacity style={showMore ? styles.showMoreContainer : styles.container} onPress={onPress}>
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
            <Text style={{ fontSize: scale(size * 0.6), color: '#ffffff' }}>{score}</Text>
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
                <View style={[styles.scoreContainer, { width: scale(size), aspectRatio: 1, borderRadius: scale(size) }]}>
                  <Text style={{ fontSize: scale(size * 0.6) }}>{score}</Text>
                </View>
              </View>
            )}
      </View>
      <View style={styles.textContainer}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  )
};

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
});

export default LotteryBall;
