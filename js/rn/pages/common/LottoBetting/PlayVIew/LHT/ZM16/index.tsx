import { View, ScrollView } from "react-native"
import React from 'react'
import { IGlobalState, UGStore } from "../../../../../../redux/store/UGStore"
import HKNormalWithSBView from "../HKNormalWithSBView"

const ZMContainer16 = () => {
  const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        return <HKNormalWithSBView key={res.alias + "ZM16"} data={res} />
      })}
    </ScrollView>
  )
}
export default ZMContainer16