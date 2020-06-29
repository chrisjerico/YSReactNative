import React from 'react'
import { Text, View } from 'react-native'
import { scale } from '../../../../helpers/function'

interface ToolBlockProps {
  tools: any[];
  renderTool: (item: any, index: number) => any;
  title: string;
}

const ToolBlock = ({ tools, renderTool, title }: ToolBlockProps) => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: scale(10),
        marginVertical: scale(10),
      }}
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
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: '#ffffff',
          borderBottomLeftRadius: scale(5),
          borderBottomRightRadius: scale(5),
        }}
      >
        {tools?.map(renderTool)}
      </View>
    </View>
  )
}

export default ToolBlock
