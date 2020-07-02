import { View, Text } from "react-native"
import React from 'react'
import { ViewTypes } from "../RecycleList/HotRecycleList"
import { HotDataProps } from "../dataConfig.ts/hotData"
import FastImage from "react-native-fast-image"
import { HomeGamesModel } from "../../../public/network/Model/HomeGamesModel"
import PushHelper from "../../../public/define/PushHelper"
import { OCHelper } from "../../../public/define/OCHelper/OCHelper"
const Hot1x1Cell = ({ type, data, thirdPartGamePress, homeGames }: { type: ViewTypes, data: HotDataProps, thirdPartGamePress, homeGames: HomeGamesModel }) => {
  const onPress = () => {

    let index = homeGames?.data?.icons?.findIndex((res) => res.id == data.id)
    let subIndex = homeGames?.data?.icons?.[index]?.list.findIndex((res) => res.title == data.child[0].title)
    if (index != -1 && subIndex != -1) {
      PushHelper.pushHomeGame(homeGames?.data?.icons?.[index]?.list[subIndex])
    } else {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', ['查无游戏']);
    }

  }
  return (
    <View style={{ backgroundColor: "#282828", flex: 1, borderRadius: 8, marginBottom: 10, marginRight: type == ViewTypes["1x1L"] ? 10 : 0, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexDirection: 'column', paddingVertical: 20, }}>
        <Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{data.title}</Text>
        <Text onPress={onPress} style={{ color: "#676767", marginBottom: 10, marginRight: 5 }}>{data.child[0].title}</Text>
      </View>
      <FastImage resizeMode={'contain'} source={{ uri: data.image }} style={{ width: 67, height: 104, }} />

    </View>
  )
}
export default Hot1x1Cell