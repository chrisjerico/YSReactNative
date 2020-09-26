import React from 'react'
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native'

interface BottomToolBlockProps {
  containerStyle?: StyleProp<ViewStyle>
  tools: HomeBottomTool[]
  renderBottomTool: (item: HomeBottomTool, index: number) => any
}

interface HomeBottomTool {
  logo: string
  userCenterType?: number
}

const BottomToolBlock = ({ renderBottomTool, tools, containerStyle }: BottomToolBlockProps) => {
  return <View style={[styles.container, containerStyle]}>{tools?.map(renderBottomTool)}</View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default BottomToolBlock
