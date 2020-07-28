
import React from 'react'
import { View, Text, TouchableWithoutFeedback } from "react-native"
import { Play } from "../../../../../../public/network/Model/PlayOddDataModel"
import { IGlobalState, UGStore } from "../../../../../../redux/store/UGStore"
import { getHKballColor } from "../../lottoSetting"
import { BettingReducerActions } from "../../../../../../redux/reducer/BettingReducer"
const TMItem = ({ data, }: { data: Play, }) => {
  const { bettingResult } = UGStore.globalProps.BettingReducer;
  const borderColor = getHKballColor(data.name)
  return (
    <TouchableWithoutFeedback onPress={() => {
      if (data.enable != "0")
        UGStore.dispatch({ type: BettingReducerActions.itemPress, value: data });
    }}>
      <View style={{ flex: 1, borderWidth: 1, borderColor: '#444', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', backgroundColor: bettingResult[data.id] ? 'rgba(151,203,255,0.5)' : "#00000000" }}>
        <View style={{ width: 30, height: 30, borderRadius: 15, borderColor: borderColor, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
          <Text>{data.name}</Text>
        </View>
        <Text>{data.odds.replace(".0000", "").replace(".00", "").replace("00", "")}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default TMItem