import React from 'react'
import { View, FlatList, Text, TouchableWithoutFeedback } from 'react-native'
import { useLottoContext, LottoContext, useBettingResult } from './LottoContext'
import TMPlayView from './PlayVIew/TM'
import { useDispatch, useSelector } from 'react-redux'
import { BettingReducerActions } from '../../../redux/reducer/BettingReducer'
import { IGlobalState } from '../../../redux/store/UGStore'
const LottoContent = () => {
  const value = useLottoContext()
  const borderColor = "red"
  const dispatch = useDispatch()
  const { currentPlayOdd } = useSelector((state: IGlobalState) => state.BettingReducer)
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <FlatList keyExtractor={item => item.name} style={{ flex: 1 }} data={value?.currentOddsData?.data?.playOdds ?? []} renderItem={({ item }) => {
        return <TouchableWithoutFeedback onPress={() => {
          dispatch({ type: BettingReducerActions.setCurrentPlayOdd, value: item })
        }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40, borderWidth: currentPlayOdd?.name == item.name ? 1 : 0, borderColor: borderColor }}>
            <View style={{ width: 10, height: 10, backgroundColor: currentPlayOdd?.name == item.name ? borderColor : '#c3c3c3', borderRadius: 5, position: 'absolute', left: 7 }}></View>
            <Text style={{
              fontSize: currentPlayOdd?.name == item.name ? 16 : 15,
              fontWeight: "500",
              textAlign: 'left', color: currentPlayOdd?.name == item.name ? "red" : "#403e3e"
            }}>{item.name}</Text>
          </View>
        </TouchableWithoutFeedback>
      }} />
      <View style={{ flex: 3 }}>
        <TMPlayView />
      </View>
    </View>
  )
}

export default LottoContent