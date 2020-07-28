import { View, FlatList, Text, TouchableWithoutFeedback } from "react-native"
import React from 'react'
import { PlayGroup, Play } from "../../../../../public/network/Model/PlayOddDataModel"
import { IGlobalState, UGStore } from "../../../../../redux/store/UGStore"
import { getHKballColor } from "../lottoSetting"
import { BettingReducerActions } from "../../../../../redux/reducer/BettingReducer"
const HKEXItemView = ({ data }: { data: PlayGroup }) => {
  const { shengXiaoValue, bettingResult } = UGStore.globalProps.BettingReducer;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={() => {
          return <Text style={{ marginVertical: 10, width: "100%", textAlign: 'center' }}>{data.alias}</Text>
        }}
        data={data.plays} renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback onPress={() => {
              if (data.enable != "0")
                UGStore.dispatch({ type: BettingReducerActions.itemPress, value: item });
            }}>
              <View style={{ width: "100%", height: 40, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: "gray", backgroundColor: bettingResult[item.id] ? 'rgba(151,203,255,0.5)' : "#00000000" }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: "bold", marginHorizontal: 10, fontSize: 16 }}>{item.name}</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.odds.replace("00", "")}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 60, }}>
                  {shengXiaoValue[item?.name]?.map((res, index) => {
                    return <View key={res + index + 3} style={{
                      marginRight: 3,
                      width: 30, height: 30, borderRadius: 15, borderColor: getHKballColor(res < 10 ? "0" + res : res.toString()),
                      borderWidth: 1, justifyContent: 'center', alignItems: 'center',
                    }}>
                      <Text>{res < 10 ? "0" + res : res.toString()}</Text>
                    </View>
                  })}
                </View>
              </View>
            </TouchableWithoutFeedback>)
        }} />
    </View>
  )
}
export default HKEXItemView