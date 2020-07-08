import { View, ScrollView } from "react-native"
import React from 'react'
import { useSelector } from "react-redux"
import { IGlobalState } from "../../../../../redux/store/UGStore"
import HKNormalWithSBView from "../LHT/HKNormalWithSBView"
const ZMContainer16 = () => {
  const { currentPlayOdd, } = useSelector((state: IGlobalState) => state.BettingReducer)
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        return <HKNormalWithSBView key={res.alias + "ZM16"} data={res} />
      })}
    </ScrollView>
  )
}
export default ZMContainer16