import React from 'react'
import { FlatList, FlatListProps } from 'react-native'

const List = (props: Readonly<FlatListProps<any>> & { uniqueKey: string }) => {
  const { uniqueKey, data } = props
  return (
    <FlatList scrollEnabled={false} listKey={uniqueKey} keyExtractor={(_, index) => uniqueKey + index.toString()} showsVerticalScrollIndicator={false} initialNumToRender={data?.length} {...props} />
  )
}

export default List
