import {View,} from "react-native"
import * as React from 'react'
import {useEffect} from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKNormalItemView from "../HKNormalItemView"

const LMContainer = ({setProps}) => {
  const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  useEffect(() => {
      currentPlayOdd?.playGroups && console.log("cc", currentPlayOdd?.playGroups?.filter((res) => res.name == currentPlayOdd.name)?.[0])
  }, [currentPlayOdd])
  return (
    <View style={{ flex: 1, paddingRight: 5 }}>
      <HKNormalItemView setProps={setProps} data={currentPlayOdd?.playGroups?.filter((res) => res.name == currentPlayOdd.name)?.[0] ?? undefined} />
    </View>
  )
}
export default LMContainer
