import { View, Text, } from "react-native"
import React from 'react'
import { IGlobalState, UGStore } from "../../../../../../redux/store/UGStore"
import HKNormalItemView from "../HKNormalItemView"

const LMContainer = () => {
  const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  return (
    <View style={{ flex: 1, paddingRight: 5 }}>
      <HKNormalItemView data={currentPlayOdd?.playGroups?.filter((res) => res.name == currentPlayOdd.name)?.[0] ?? undefined} />
    </View>
  )
}
export default LMContainer