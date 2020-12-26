import {ScrollView} from "react-native"
import * as React from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKWSItemView from "../HKWSItemView"
import HKTMTItemView from "../HKTMTItemView"

const TWSContainer = ({setProps}) => {
  const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        if (index == 0) {
          return <HKTMTItemView setProps={setProps} key={res.id + index} data={res} />
        } else {
          return <HKWSItemView setProps={setProps} key={res.id + index} data={res} />
        }
      })}
    </ScrollView>
  )
}
export default TWSContainer
