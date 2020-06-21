import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface BottomToolBlockProps {
  containerStyle?: ViewStyle;
  tools: HomeBottomTool[];
  renderBottomTool: (item: HomeBottomTool, index: number) => any;
}

interface HomeBottomTool {
  logo: string;
  userCenterType?: number;
}

const BottomToolBlock = ({ renderBottomTool, tools, containerStyle }: BottomToolBlockProps) => {
  return <View style={[styles.container, containerStyle]}>{tools.map(renderBottomTool)}</View>;
};

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

export default BottomToolBlock;
