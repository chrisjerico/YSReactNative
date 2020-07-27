import { View, ScrollView } from "react-native"
import React from 'react'
import { IGlobalState, UGStore } from "../../../../../../redux/store/UGStore"
import HKBallsView from "../HKBallsView"
import HKNormalItemView from "../HKNormalItemView"

const ZMContainer = () => {
  const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        console.log(res)
        if (index == 0) {
          return <HKBallsView key={res.id + index} data={res} />
        } else {
          return <HKNormalItemView key={res.id + index} data={res} />
        }
      })}
    </ScrollView>
  )
}
export default ZMContainer