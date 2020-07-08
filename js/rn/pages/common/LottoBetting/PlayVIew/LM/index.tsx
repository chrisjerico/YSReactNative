import { View, Text, } from "react-native"
import React from 'react'
import { useSelector } from "react-redux"
import { IGlobalState } from "../../../../../redux/store/UGStore"
import HKNormalItemView from "../LHT/HKNormalItemView"
const LMContainer = () => {
  const { currentPlayOdd, } = useSelector((state: IGlobalState) => state.BettingReducer)
  return (
    <View style={{ flex: 1, paddingRight: 5 }}>
      <HKNormalItemView fix={2} data={currentPlayOdd?.playGroups?.filter((res) => res.name == currentPlayOdd.name)?.[0] ?? undefined} />
    </View>
  )
}
export default LMContainer