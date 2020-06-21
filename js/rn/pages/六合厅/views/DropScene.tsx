import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from '../../../helpers/function';
import ScoreCircle from './LotteryBall';

interface DropSceneProps {
  lotterys: Lottery[];
  date: string;
  renderText: () => React.ReactNode;
  square?: boolean;
  onPress: () => any;
}

interface Lottery {
  number?: string;
  color?: string;
  sx?: string;
  showMore?: boolean;
}

const DropScene = ({ lotterys, date, renderText, square, onPress }: DropSceneProps) => {
  return (
    <TouchableOpacity style={{ backgroundColor: '#ADADAD', aspectRatio: 515 / 590 }} onPress={onPress}>
      <View style={styles.awardsContainer}>
        <Text>{'第 '}</Text>
        <Text style={{ color: '#ff861b' }}>{date}</Text>
        <Text>{' 期开奖结果'}</Text>
      </View>
      <View style={styles.scoreCircleCintainer}>
        {lotterys.map((lottery, index) => {
          const { number, color, sx } = lottery;
          return (
            <ScoreCircle
              key={index}
              score={number}
              color={color}
              text={sx}
              showMore={index == 6}
              square={square}
              onPress={() => {
                console.log('轉跳');
              }}
            />
          );
        })}
      </View>
      <View style={styles.nextAwardTimeContainer}>
        <View style={{ flexDirection: 'row' }}>{renderText && renderText()}</View>
        <View>
          <Text style={{ color: '#ff861b' }}>{'星期三'}</Text>
        </View>
      </View>
      <View style={{ flex: 231 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextAwardTimeContainer: {
    flex: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
  },
  scoreCircleCintainer: {
    flex: 77,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
  },
  awardsContainer: {
    flex: 41,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
    paddingHorizontal: scale(15),
  },
});

export default DropScene;
