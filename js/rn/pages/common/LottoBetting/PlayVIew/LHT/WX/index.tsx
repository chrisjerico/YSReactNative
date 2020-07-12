import { View, ScrollView } from "react-native"
import React from 'react'
import { useSelector } from "react-redux"
import { IGlobalState } from "../../../../../../redux/store/UGStore"
import HKWXItemView from "../HKWXItemView"

const WXSContainer = () => {
  const { currentPlayOdd, } = useSelector((state: IGlobalState) => state.BettingReducer)
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        return <HKWXItemView key={res.id + index} data={res} />
      })}
    </ScrollView>
  )
}
export default WXSContainer