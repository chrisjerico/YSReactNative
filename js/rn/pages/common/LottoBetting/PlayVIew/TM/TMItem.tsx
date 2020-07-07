import { Play } from "../../../../../public/network/Model/PlayOddDataModel"
import { useDispatch, useSelector } from "react-redux"
import { IGlobalState } from "../../../../../redux/store/UGStore"
import React from 'react'
import { View, Text, TouchableWithoutFeedback } from "react-native"
import { BettingReducerActions } from "../../../../../redux/reducer/BettingReducer"
const TMItem = ({ data, }: { data: Play, }) => {
  const dispatch = useDispatch()
  const { bettingResult } = useSelector((state: IGlobalState) => state.BettingReducer)
  return (
    <TouchableWithoutFeedback onPress={() => {
      if (data.enable != "0")
        dispatch({ type: BettingReducerActions.itemPress, value: data })
    }}>
      <View style={{ flex: 1, borderWidth: 1, borderColor: '#444', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', backgroundColor: bettingResult[data.id] ? 'rgba(151,203,255,0.5)' : "#00000000" }}>
        <View style={{ width: 30, height: 30, borderRadius: 15, borderColor: "red", borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
          <Text>{data.code}</Text>
        </View>
        <Text>{data.odds.split(".")[0]}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default TMItem