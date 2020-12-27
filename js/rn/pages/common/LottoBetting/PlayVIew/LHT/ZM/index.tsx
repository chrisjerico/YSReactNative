import {ScrollView} from "react-native"
import * as React from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKBallsView from "../HKBallsView"
import HKNormalItemView from "../HKNormalItemView"

const ZMContainer = ({setProps}) => {
  const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        console.log(res)
        if (index == 0) {
          return <HKBallsView setProps={setProps} key={res.id + index} data={res} />
        } else {
          return <HKNormalItemView setProps={setProps}  key={res.id + index} data={res} />
        }
      })}
    </ScrollView>
  )
}
export default ZMContainer
