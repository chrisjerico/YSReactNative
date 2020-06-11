import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import PushHelper from '../../../public/define/PushHelper';
import {scale} from '../helpers/function';
interface ScoreCircleProps {
  score?: number | string;
  size?: number;
  color?: string;
  text?: string;
  showMore?: boolean;
  onPress: () => any;
}

const factor = 1.3;

const ScoreCircle = ({score = 10, size = 35, color = '#ff0000', text = '', showMore = false, onPress}: ScoreCircleProps) => (
  <TouchableOpacity style={showMore ? styles.showMoreContainer : styles.container} onPress={onPress}>
    <View style={styles.circleConatiner}>
      {showMore ? (
        <Icon type={'antdesign'} name={'plus'} color={'#9D9D9D'} />
      ) : (
        <View style={[styles.circle, {backgroundColor: color, width: scale(size * factor), aspectRatio: 1, borderRadius: scale(size * factor)}]}>
          <View style={[styles.scoreContainer, {width: scale(size), aspectRatio: 1, borderRadius: scale(size)}]}>
            <Text style={{fontSize: scale(size * 0.6)}}>{score}</Text>
          </View>
        </View>
      )}
    </View>
    <View style={styles.textContainer}>
      <Text>{text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: scale(60),
    aspectRatio: 65 / 82,
    alignItems: 'center',
  },
  showMoreContainer: {
    width: scale(30),
    aspectRatio: 30 / 82,
    alignItems: 'center',
  },
  circleConatiner: {
    flex: 3,
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
    flex: 1,
    justifyContent: 'center',
  },
});

export default ScoreCircle;
