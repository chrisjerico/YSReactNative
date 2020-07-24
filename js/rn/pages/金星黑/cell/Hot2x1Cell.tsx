import { View, Text, FlatList } from "react-native"
import React from 'react'
import { ChildProps, HotDataProps } from "../dataConfig.ts/hotData"
import { useDimensions } from "@react-native-community/hooks"
import FastImage from "react-native-fast-image"
import { HomeGamesModel } from "../../../public/network/Model/HomeGamesModel"
import PushHelper from "../../../public/define/PushHelper"
import { OCHelper } from "../../../public/define/OCHelper/OCHelper"
const Hot2x1Cell = ({ data, thirdPartGamePress, homeGames }: { data: HotDataProps, thirdPartGamePress, homeGames: HomeGamesModel }) => {
  const { width } = useDimensions().screen
  const onPress = (title) => {

    let index = homeGames?.data?.icons?.findIndex((res) => res.id == data.id)
    let subIndex = homeGames?.data?.icons?.[index]?.list.findIndex((res) => res.title == title)
    if (index != -1 && subIndex != -1) {
      PushHelper.pushHomeGame(homeGames?.data?.icons?.[index]?.list[subIndex])
    } else {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', ['查无游戏']);
    }

  }
  return (
    <View style={{ backgroundColor: "#282828", flex: 1, borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexDirection: 'column', paddingTop: 20, }}>
        <Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{data.title}</Text>

        <FlatList keyExtractor={item => item.title} style={{ width: (width - 20) * 0.6 }} columnWrapperStyle={{ justifyContent: 'space-between', }} scrollEnabled={false} data={data.child} numColumns={3} renderItem={({ item }) => {
          return <Text onPress={onPress.bind(null, item.title)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</Text>
        }} />
      </View>
      <FastImage resizeMode={'contain'} style={{ width: 129, height: 106 }} source={{ uri: data.image }} />
    </View>
  )
}
export default Hot2x1Cell