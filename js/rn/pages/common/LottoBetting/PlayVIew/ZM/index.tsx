import { View, ScrollView } from "react-native"
import React from 'react'
import { useSelector } from "react-redux"
import { IGlobalState } from "../../../../../redux/store/UGStore"
import HKBallsView from "../LHT/HKBallsView"
import HKNormalItemView from "../LHT/HKNormalItemView"
const ZMContainer = () => {
  const { currentPlayOdd, } = useSelector((state: IGlobalState) => state.BettingReducer)
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        console.log(res)
        if (index == 0) {
          return <HKBallsView data={res} />
        } else {
          return <HKNormalItemView data={res} />
        }
      })}
    </ScrollView>
  )
}
export default ZMContainer