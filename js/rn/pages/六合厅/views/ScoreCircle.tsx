import React from 'react';
import {scale} from '../helpers/function';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface ScoreCircleProps {
  score?: number;
  size?: number;
  color?: string;
  text?: string;
}

const factor = 1.3;

const ScoreCircle = ({score = 10, size = 35, color = '#ff0000', text = '马/土'}: ScoreCircleProps) => (
  <TouchableOpacity style={styles.container}>
    <View style={[styles.circleConatiner, {backgroundColor: color, width: scale(size * factor), aspectRatio: 1, borderRadius: scale(size * factor)}]}>
      <View style={[styles.inlineContainer, {width: scale(size), aspectRatio: 1, borderRadius: scale(size)}]}>
        <Text style={{fontSize: scale(size * 0.6)}}>{score}</Text>
      </View>
    </View>
    <Text>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginRight: scale(20),
    width: scale(50),
    aspectRatio: 50 / 82,
    justifyContent: 'space-between',
  },
  circleConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineContainer: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScoreCircle;
