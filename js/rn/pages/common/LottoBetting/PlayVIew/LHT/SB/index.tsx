import { View, ScrollView } from "react-native"
import React from 'react'
import { useSelector } from "react-redux"

import { useDimensions } from "@react-native-community/hooks"
import HKSBItemView from "../HKSBItemView"
import { IGlobalState } from "../../../../../../redux/store/UGStore"
const SBContainer = () => {
  const { currentPlayOdd, } = useSelector((state: IGlobalState) => state.BettingReducer)
  const { width } = useDimensions().screen
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        return <HKSBItemView frameWidth={((width / 4 * 3) - 5) / 2} key={res.id + index} data={res} />
      })}
    </ScrollView>
  )
}
export default SBContainer