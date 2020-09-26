import React from 'react'
import { FlatList, FlatListProps } from 'react-native'

const List = (props: Readonly<FlatListProps<any>> & { uniqueKey: string }) => {
  const { uniqueKey, scrollEnabled = false } = props
  return (
    <FlatList
      {...props}
      listKey={uniqueKey}
      keyExtractor={(_, index) => uniqueKey + index.toString()}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={false}
    />)
}



export default List