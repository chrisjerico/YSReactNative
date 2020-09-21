import React from 'react'
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native'

interface NavBlockProps {
  navs: any[];
  containerStyle?: StyleProp<ViewStyle>;
  renderNav: (item: any, index: number) => any;
  visible?: boolean;
}

const NavBlock = ({ renderNav, navs = [], containerStyle, visible }: NavBlockProps) => {
  if (visible) {
    return (
      <View style={[styles.container, containerStyle]}>
        {navs.map(renderNav)}
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 105,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})

export default NavBlock
