import {ScrollView} from "react-native"
import * as React from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKNormalWithSBView from "../HKNormalWithSBView"

const ZMContainer16 = ({setProps}) => {
  const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        return <HKNormalWithSBView setProps={setProps} key={res.alias + "ZM16"} data={res} />
      })}
    </ScrollView>
  )
}
export default ZMContainer16
