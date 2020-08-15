import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

interface NavBlockProps {
  navs: any[];
  containerStyle?: ViewStyle;
  renderNav: (item: any, index: number) => any;
}

const NavBlock = ({ renderNav, navs = [], containerStyle }: NavBlockProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {navs.map(renderNav)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 130,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default NavBlock
