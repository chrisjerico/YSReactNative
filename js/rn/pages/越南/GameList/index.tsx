import { View, FlatList, Text } from "react-native"
import React, { useState } from 'react'
import { OCHelper } from "../../../public/define/OCHelper/OCHelper"
import { NSValue } from "../../../public/define/OCHelper/OCBridge/OCCall"
import AppDefine from "../../../public/define/AppDefine"
import { useSafeArea } from "react-native-safe-area-context"
import { useDimensions } from "@react-native-community/hooks";
import { TouchableOpacity } from "react-native-gesture-handler"
import { pop } from "../../../public/navigation/RootNavigation"
import { Icon } from "react-native-elements"
import { HomeGamesModel } from "../../../public/network/Model/HomeGamesModel"
import FastImage, { FastImageProperties } from "react-native-fast-image"
import PushHelper from "../../../public/define/PushHelper"
const GameList = ({ route, navigation }) => {
  const { homeGames, index }: { homeGames: HomeGamesModel, index: number } = route?.params;
  const { width } = useDimensions().screen
  const openSideBar = () => {
    OCHelper.call("UGYYRightMenuView.alloc.initWithFrame:[show]", [NSValue.CGRectMake(AppDefine.width / 2, 0, AppDefine.width / 2, AppDefine.height)])
  }
  const [tbx, setTbx] = useState(index)
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <FlatList style={{ width: 77, }} data={homeGames?.data?.icons} renderItem={({ item, index }) => {
          return <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderBottomColor: "#3c3c3c", borderBottomWidth: 1 }} onPress={() => {
            setTbx(index)
          }}>
            <FastImage style={{ width: 33, height: 33 }} source={{ uri: item.logo }} />
            <Text style={{ color: '#3871f5', marginBottom: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        }}></FlatList>
        <FlatList style={{ width: width - 38, backgroundColor: '#f2f2f2' }} data={homeGames?.data?.icons?.[tbx]?.list} renderItem={({ item, index }) => {
          return <TouchableOpacity onPress={() => {
            PushHelper.pushHomeGame(item)
          }} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <FastImageAutoHeight resizeMode={'contain'} style={{ width: width - 90, marginBottom: 10 }} source={{ uri: item.logo }} />
            <Text style={{ color: '#3871f5', fontSize: 14 }}>{item.name}</Text>
          </TouchableOpacity>
        }}></FlatList>
      </View>
    </View>
  )
}
const Header = () => {
  const { top } = useSafeArea()
  const { width } = useDimensions().screen
  return (
    <View style={{ width: width, }}>
      <View style={{ height: top }}></View>
      <View style={{ width, height: 45, flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => {
          pop();
          OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
        }}>
          <Icon name='ios-arrow-back' type="ionicon" color="rgba(142, 142, 147,1)" size={30} />
        </TouchableOpacity >
      </View>
    </View>
  )
}
const FastImageAutoHeight = (props: FastImageProperties) => {
  const [picHeight, setPicHeight] = useState(100)
  return (
    <FastImage {...props} style={[props.style, { height: picHeight }]} onLoad={(e) => {
      setPicHeight((((AppDefine.width - 20)) / e.nativeEvent.width) * e.nativeEvent.height)
    }} />
  )
}
export default GameList