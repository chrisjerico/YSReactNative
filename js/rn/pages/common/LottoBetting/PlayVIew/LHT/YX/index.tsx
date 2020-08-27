import { View, ScrollView } from "react-native"
import React from 'react'
import { IGlobalState, UGStore } from "../../../../../../redux/store/UGStore"
import HKBallsView from "../HKBallsView"
import HKNormalItemView from "../HKNormalItemView"
import HKEXItemView from "../HKEXItemView"

const YXContainer = () => {
  const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        return <HKEXItemView data={res} />
      })}
    </ScrollView>
  )
}
export default YXContainer