import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import PushHelper from '../../../public/define/PushHelper';

interface HomeBottomToolComponentProps {
  containerStyle?: ViewStyle;
  tools: HomeBottomTool[];
}

interface HomeBottomTool {
  logo: string;
  userCenterType: number;
}

const HomeBottomToolComponent = ({tools, containerStyle}: HomeBottomToolComponentProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {tools.map((tool: HomeBottomTool, index) => {
        const {logo, userCenterType} = tool;
        return (
          <TouchableOpacity key={index} style={styles.toolContainer} onPress={() => PushHelper.pushUserCenterType(userCenterType)}>
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
