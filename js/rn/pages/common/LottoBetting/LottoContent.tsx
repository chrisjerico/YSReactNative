import React, { useEffect } from 'react'
import { View, FlatList, Text, TouchableWithoutFeedback } from 'react-native'
import { useLottoContext, LottoContext, useBettingResult } from './LottoContext'
import TMPlayView from './PlayVIew/TM'
import { useDispatch, useSelector } from 'react-redux'
import { BettingReducerActions } from '../../../redux/reducer/BettingReducer'
import { IGlobalState } from '../../../redux/store/UGStore'
import { OCHelper } from '../../../public/define/OCHelper/OCHelper'
import { NSValue } from '../../../public/define/OCHelper/OCBridge/OCCall'
import LMContainer from './PlayVIew/LM'
import ZMContainer from './PlayVIew/ZM'
import ZMContainer16 from './PlayVIew/ZM16'
const LottoContent = () => {
  const value = useLottoContext()
  const borderColor = "red"
  const dispatch = useDispatch()
  const { currentPlayOdd } = useSelector((state: IGlobalState) => state.BettingReducer)
  useEffect(() => {
    // OCHelper.call('CMCommon.hideTabBar', []);
  }, [])
  const getPlayView = () => {
    switch (currentPlayOdd?.code) {
      case 'TM':
        return <TMPlayView />
        break;
      case 'LM':
        return <LMContainer />
      case 'ZM':
        return <ZMContainer />
      case 'ZM1-6':
        return <ZMContainer16 />
      default:
        break;
    }
  }
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <FlatList keyExtractor={item => item.name} style={{ flex: 1 }} data={value?.currentOddsData?.data?.playOdds ?? []} renderItem={({ item }) => {
        return <TouchableWithoutFeedback onPress={() => {
          dispatch({ type: BettingReducerActions.setCurrentPlayOdd, value: item })
        }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40, borderWidth: currentPlayOdd?.name == item.name ? 1 : 0, borderColor: borderColor, borderBottomWidth: currentPlayOdd?.name == item.name ? 2 : 0 }}>
            <View style={{ width: 8, height: 8, backgroundColor: currentPlayOdd?.name == item.name ? borderColor : '#c3c3c3', borderRadius: 4, position: 'absolute', left: 5 }}></View>
            <Text style={{
              fontSize: 15,
              fontWeight: currentPlayOdd?.name == item.name ? 'bold' : 'normal',
              textAlign: 'left', color: currentPlayOdd?.name == item.name ? "red" : "#403e3e",
              marginLeft: 5
            }}>{item.name}</Text>
          </View>
        </TouchableWithoutFeedback>
      }} />
      <View style={{ flex: 3 }}>
        {getPlayView()}

      </View>
    </View>
  )
}

export default LottoContent