import React, { useCallback } from 'react'
import { FlatList, FlatListProps } from 'react-native'

const List = (props: Readonly<FlatListProps<any>> & { uniqueKey: string }) => {
  const { uniqueKey } = props
  const keyExtractor = useCallback((item: any, index: number) => uniqueKey + index.toString(), [uniqueKey])
  return <FlatList scrollEnabled={false} {...props} listKey={uniqueKey} keyExtractor={keyExtractor} showsVerticalScrollIndicator={false} />
}

export default List
