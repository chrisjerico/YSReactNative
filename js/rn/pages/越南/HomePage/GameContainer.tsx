import React, { useMemo } from 'react'
import { useDimensions } from '@react-native-community/hooks'
import { List } from '../../../public/network/Model/BannerModel'
import { HomeGamesModel } from '../../../public/network/Model/HomeGamesModel'
import { FlatList, TouchableOpacity, View, Text } from 'react-native'
import PushHelper from '../../../public/define/PushHelper'
import FastImage from 'react-native-fast-image'
import { seriesId } from './HomeConfig'

const TabContainer = ({ data, filter, homeGames }: { data: List[], filter: string, homeGames: HomeGamesModel }) => {
  const { width } = useDimensions().screen
  const people = useMemo(() => { return (Math.random() * 400 + 200).toFixed(0) }, [])
  return (

    <FlatList style={{ flex: 1 }} scrollEnabled={false} renderItem={({ item }) => {
      return (
        <TouchableOpacity onPress={() => {
          PushHelper.pushHomeGame(item)
        }} style={{ width: (width - 20) / 2 }}>
          <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
            <FastImage source={{ uri: item?.logo }} style={{ width: 65, aspectRatio: 1, }} />
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#f2f2f2", paddingBottom: 20, marginLeft: 6, alignItems: 'flex-end', justifyContent: 'space-between', width: width - 130 }}>
              <View style={{ flexDirection: 'column', }}>
                <Text style={{ color: "#3b3b3b", fontSize: 18, marginVertical: 10 }}>{item.name}</Text>
                {seriesId[item.seriesId] ? <Text style={{ color: "#8a8d96", fontSize: 12 }}>{seriesId[item.seriesId]} | <Text style={{ color: "#fb9608", fontWeight: "bold" }}>{people}人在玩</Text> </Text> : null}
              </View>
              <View style={{ width: 86, height: 28, borderRadius: 16, backgroundColor: "#71abff", justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>進入遊戲</Text>
              </View>
            </View>
          </View>

        </TouchableOpacity>
      )
    }} data={homeGames?.data?.icons?.filter((res) => res.id == filter)?.[0]?.list ?? []} />
  )

}
export default TabContainer