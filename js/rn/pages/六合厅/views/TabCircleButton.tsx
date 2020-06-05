import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {scale} from '../helpers/function';

interface TabCircleButtonProps {
  uri?: string;
}

const TabCircleButton = ({uri = 'https://7478.com/img/1201.4cc317f2.png'}: TabCircleButtonProps) => (
  <TouchableOpacity style={styles.conatiner}>
    <View style={{width: '85%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: '80%', aspectRatio: 1, backgroundColor: '#A6A6D2', borderRadius: scale(85)}}>
        <Image style={{width: '100%', height: '100%'}} source={{uri}} resizeMode={'contain'} />
      </View>
    </View>
    <View style={styles.titleContainer}>
      <Text>{'六合彩'}</Text>
      <Text style={styles.subTitle}>{'一周开三期'}</Text>
    </View>
    <View style={{flex: 1}} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  conatiner: {
    width: '32%',
    aspectRatio: 0.75,
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 2,
  },
  subTitle: {
    color: '#999999',
  },
});

export default TabCircleButton;
