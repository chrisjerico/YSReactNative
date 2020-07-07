import { View, Text, TouchableWithoutFeedback } from "react-native"
import { Play } from "../../../../../public/network/Model/PlayOddDataModel"
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { IGlobalState } from "../../../../../redux/store/UGStore"
import { BettingReducerActions } from "../../../../../redux/reducer/BettingReducer"
const SBItem = ({ data }: { data: Play }) => {
  const dispatch = useDispatch()
  const { bettingResult } = useSelector((state: IGlobalState) => state.BettingReducer)
  return (
    <TouchableWithoutFeedback onPress={() => {
      if (data.enable != "0")
        dispatch({ type: BettingReducerActions.itemPress, value: data })
    }}>
      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 5, backgroundColor: bettingResult[data.id] ? 'rgba(151,203,255,0.5)' : "#00000000" }}>
        <Text>{data.name}  {data.enable == "0" ? "--" : parseFloat(data.odds).toFixed(1)}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default SBItem