import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {chatRoomImage, DowloadAppImage, serviceImage} from '../helpers/config';

const defaultTools = [{uri: serviceImage, onPress: null}, {uri: chatRoomImage, onPress: null}, {uri: DowloadAppImage, onPress: null}];

interface HomeBottomToolComponentProps {
  containerStyle?: ViewStyle;
}

const HomeBottomToolComponent = ({containerStyle}: HomeBottomToolComponentProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {defaultTools.map(({uri, onPress}, index) => (
        <TouchableOpacity style={styles.toolContainer} key={index} onPress={onPress}>
          <Image style={styles.image} source={{uri: uri}} resizeMode={'contain'} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HomeBottomToolComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolContainer: {
    width: '32%',
    aspectRatio: 165 / 85,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
