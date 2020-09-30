import {ScrollView} from "react-native"
import * as React from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKWSItemView from "../HKWSItemView"

const WSContainer = ({setProps}) => {
  const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        return <HKWSItemView setProps={setProps} data={res} />
      })}
    </ScrollView>
  )
}
export default WSContainer
