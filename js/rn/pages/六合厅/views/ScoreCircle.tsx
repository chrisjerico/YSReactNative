import React from 'react';
import {scale} from '../helpers/function';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PushHelper from '../../../public/define/PushHelper';

interface ScoreCircleProps {
  score?: number | string;
  size?: number;
  color?: string;
  text?: string;
}

const factor = 1.3;

const ScoreCircle = ({score = 10, size = 35, color = '#ff0000', text = ''}: ScoreCircleProps) => (
  <TouchableOpacity style={styles.container} onPress={() => PushHelper.pushLogin()}>
    <View style={styles.circleConatiner}>
      <View style={[styles.circle, {backgroundColor: color, width: scale(size * factor), aspectRatio: 1, borderRadius: scale(size * factor)}]}>
        <View style={[styles.scoreContainer, {width: scale(size), aspectRatio: 1, borderRadius: scale(size)}]}>
          <Text style={{fontSize: scale(size * 0.6)}}>{score}</Text>
        </View>
      </View>
    </View>
    <View style={styles.textContainer}>
      <Text>{text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: scale(70),
    aspectRatio: 70 / 82,
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
