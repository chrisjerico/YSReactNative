import { View, ScrollView } from "react-native"
import React from 'react'
import { useSelector } from "react-redux"
import { IGlobalState } from "../../../../../../redux/store/UGStore"
import HKBallsView from "../HKBallsView"
import HKNormalItemView from "../HKNormalItemView"
import HKWSItemView from "../HKWSItemView"
import HKTMTItemView from "../HKTMTItemView"

const TWSContainer = () => {
  const { currentPlayOdd, } = useSelector((state: IGlobalState) => state.BettingReducer)
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        console.log(res)
        if (index == 0) {
          return <HKTMTItemView key={res.id + index} data={res} />
        } else {
          return <HKWSItemView key={res.id + index} data={res} />
        }
      })}
    </ScrollView>
  )
}
export default TWSContainer