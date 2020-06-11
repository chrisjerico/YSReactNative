import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {UGUserCenterType} from '../../../redux/model/全局/UGSysConfModel';

interface HomeBottomToolComponentProps {
  containerStyle?: ViewStyle;
  tools: HomeBottomTool[];
  onPressBottomTool: (userCenterType: UGUserCenterType) => any;
}

interface HomeBottomTool {
  logo: string;
  userCenterType: number;
}

const HomeBottomToolComponent = ({onPressBottomTool, tools, containerStyle}: HomeBottomToolComponentProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {tools.map((tool: HomeBottomTool, index) => {
        const {logo, userCenterType} = tool;
        return (
          <TouchableOpacity key={index} style={styles.toolContainer} onPress={() => onPressBottomTool(userCenterType)}>
            <Image style={styles.image} source={{uri: logo}} resizeMode={'contain'} />
          </TouchableOpacity>
        );
      })}
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
