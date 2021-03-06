import * as React from "react"
import { FlatList, Image, Text, TouchableWithoutFeedback, View } from "react-native"
import { List } from "../../../../../public/network/Model/HomeGamesModel"
import { fillArray } from "../../../utils/fillArray"
import AppDefine from "../../../../../public/define/AppDefine"
import PushHelper from "../../../../../public/define/PushHelper"
import { UGText } from '../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const LotteryTabView = ({ list }: { list: List[] }) => {
  return (
    <FlatList
      bounces={false}
      numColumns={4}
      keyExtractor={(item, index) => `lottery-${index}`}
      data={fillArray(list, 4)}
      renderItem={({ item }) => {
        return item.icon ? (
          <TouchableWithoutFeedback
            style={{
              height: 96,
              width: AppDefine.width / 4,
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
            onPress={() => {
              PushHelper.pushCategory(1, item.gameId)
            }}>
            <View style={{
              flex: 1,
              height: 91,
              borderRadius: 6,
              padding: 5,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              margin: 2,
            }}>
              <Image style={{
                flex: 1,
                height: 63,
                width: 63,
                resizeMode: "stretch",
              }} source={{ uri: item.icon }}/>
              <UGText style={{
                fontSize: 12,
                color: "#333333",
                fontWeight: "bold",
                marginTop: 10,
              }}>{item.title}</UGText>
            </View>
          </TouchableWithoutFeedback>
        ) : <View style={{ width: AppDefine.width / 4 }}/>
      }}/>
  )
}
