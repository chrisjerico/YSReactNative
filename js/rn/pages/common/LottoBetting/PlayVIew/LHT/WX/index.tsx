import {ScrollView} from "react-native"
import * as React from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKWXItemView from "../HKWXItemView"

const WXSContainer = ({setProps}) => {
  const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        return <HKWXItemView setProps={setProps} key={res.id + index} data={res} />
      })}
    </ScrollView>
  )
}
export default WXSContainer
