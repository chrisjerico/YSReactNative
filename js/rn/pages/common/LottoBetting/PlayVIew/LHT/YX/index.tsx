import {ScrollView} from "react-native"
import * as React from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKEXItemView from "../HKEXItemView"

const YXContainer = ({setProps}) => {
  const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        return <HKEXItemView setProps={setProps} data={res} />
      })}
    </ScrollView>
  )
}
export default YXContainer
