import React from 'react'
import { Text, View, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import { scale } from '../../../public/tools/Scale'

interface ToolBlockProps {
  tools: any[];
  renderTool: (item: any, index: number) => any;
  title: string;
  contentContainer?: StyleProp<ViewStyle>;
}

const ToolBlock = ({ tools, renderTool, title, contentContainer }: ToolBlockProps) => {
  return (
    <View
      style={styles.container}
    >
      <View
        style={{
          width: '100%',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: scale(5),
          borderTopRightRadius: scale(5),
          aspectRatio: 500 / 50,
          justifyContent: 'center',
          borderBottomColor: '#d9d9d9',
          borderBottomWidth: scale(0.1),
        }}
      >
        <Text
          style={{
            paddingLeft: scale(25),
            fontWeight: '500',
            fontSize: scale(20),
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={[styles.contentContainer, contentContainer]}
      >
        {tools?.map(renderTool)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scale(10),
    marginVertical: scale(8),
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: scale(5),
    borderBottomRightRadius: scale(5),
  }
})

export default ToolBlock
