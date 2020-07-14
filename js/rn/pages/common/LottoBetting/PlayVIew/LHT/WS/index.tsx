import { View, ScrollView } from "react-native"
import React from 'react'
import { useSelector } from "react-redux"
import { IGlobalState } from "../../../../../../redux/store/UGStore"
import HKEXItemView from "../HKEXItemView"
import HKWSItemView from "../HKWSItemView"

const WSContainer = () => {
  const { currentPlayOdd, } = useSelector((state: IGlobalState) => state.BettingReducer)
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        return <HKWSItemView data={res} />
      })}
    </ScrollView>
  )
}
export default WSContainer