import { FlatList, TouchableWithoutFeedback, View } from 'react-native'
import { ImageButton } from '../../../ImageButton'
import * as React from 'react'
import { fillArray } from '../../../../utils/fillArray'
import { List } from '../../../../../../public/network/Model/HomeGamesModel'
import AppDefine from '../../../../../../public/define/AppDefine'

export const GameListView = ({ list, onPress }: { list: List[], onPress: (list: List) => void }) => {
  return (
    <FlatList
      style={{ flex: 1 }}
      scrollEnabled={false}
      keyExtractor={(item, index) => `boardGame-${index}`}
      numColumns={2}
      data={fillArray(list, 2)}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
      renderItem={({ item }) => {
        return item.icon && item.icon != '' ? (
          <ImageButton
            imgStyle={{
              height: 145,
              width: AppDefine.width / 2 - 12 - 16,
              marginVertical: 4,
              marginHorizontal: 6,
              alignSelf: 'center',
            }}
            uri={item.icon}
            onPress={() => onPress(item)} />
        ) : (
          <View style={{ height: 145, width: AppDefine.width / 2 - 12 - 16, marginHorizontal: 6 }} />
        )
      }} />
  )
}
