import {ScrollView} from "react-native"
import * as React from 'react'
import {useDimensions} from "@react-native-community/hooks"
import HKSBItemView from "../HKSBItemView"
import {UGStore} from "../../../../../../redux/store/UGStore"

const SBContainer = ({setProps}) => {
  const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  const { width } = useDimensions().screen
  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map((res, index) => {
        return <HKSBItemView setProps={setProps} frameWidth={((width / 4 * 3) - 5) / 2} key={res.id + index} data={res} />
      })}
    </ScrollView>
  )
}
export default SBContainer
