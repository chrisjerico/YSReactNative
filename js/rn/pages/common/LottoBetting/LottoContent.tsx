import React, { useEffect } from 'react'
import { View, FlatList, Text, TouchableWithoutFeedback } from 'react-native'
import { useLottoContext, LottoContext, useBettingResult } from './LottoContext'
import { BettingReducerActions } from '../../../redux/reducer/BettingReducer'
import { UGStore } from '../../../redux/store/UGStore'
import { PlayOdd } from '../../../public/network/Model/PlayOddDataModel'
import YXContainer from './PlayVIew/LHT/YX'
import SBContainer from './PlayVIew/LHT/SB'
import ZTContainer from './PlayVIew/LHT/ZT'
import LMAContainer from './PlayVIew/LHT/LMA'
import WSContainer from './PlayVIew/LHT/WS'
import TWSContainer from './PlayVIew/LHT/TWS'
import WXSContainer from './PlayVIew/LHT/WX'
import LMContainer from './PlayVIew/LHT/LM'
import ZMContainer from './PlayVIew/LHT/ZM'
import TMPlayView from './PlayVIew/LHT/TM'
import ZMContainer16 from './PlayVIew/LHT/ZM16'
const LottoContent = () => {
  const value = useLottoContext()
  const borderColor = "red"
  const { currentPlayOdd } = UGStore.globalProps.BettingReducer;
  useEffect(() => {
    // OCHelper.call('CMCommon.hideTabBar', []);
  }, [])
  const getPlayView = () => {
    switch (currentPlayOdd?.code) {
      case 'TM':
        return <TMPlayView />
        break;
      case 'LM':
      case 'ZOX':
        return <LMContainer />
      case 'SB':
        return <SBContainer />
      case 'ZM':
        return <ZMContainer />
      case 'ZM1-6':
        return <ZMContainer16 />
      case 'ZT':
        return <ZTContainer />
      case 'LMA':
        return <LMAContainer />
      case 'YX':
      case 'ZX':
      case 'TX':
        return <YXContainer />
      case 'WS':
        return <WSContainer />
      case 'TWS':
        return <TWSContainer />
      case 'WX':
        return <WXSContainer />
      default:
        break;
    }
  }
  const onPress = (item: PlayOdd) => {
    UGStore.dispatch({
      type: BettingReducerActions.setCurrentPlayOdd, value: item
    });
  }
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <FlatList keyExtractor={item => item.name} style={{ flex: 1 }} data={value?.currentOddsData?.data?.playOdds ?? []} renderItem={({ item }) => {
        return <TouchableWithoutFeedback onPress={onPress.bind(null, item)} >
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