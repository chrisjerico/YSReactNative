import React from 'react'
import { FlatList, FlatListProps } from 'react-native'

const List = (props: Readonly<FlatListProps<any>> & { uniqueKey: string }) => {
  const { uniqueKey } = props
  return (
    <FlatList
      {...props}
      listKey={uniqueKey}
      keyExtractor={(_, index) => uniqueKey + index.toString()}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />)
}



export default List