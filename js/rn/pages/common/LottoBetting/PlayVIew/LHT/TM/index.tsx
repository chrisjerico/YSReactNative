import React, { useEffect, useState, useContext } from 'react'
import { View, Image, Text, TouchableWithoutFeedback, FlatList, ScrollView, TouchableOpacity } from 'react-native'

import { useDimensions } from '@react-native-community/hooks';
import { IGlobalState, UGStore } from '../../../../../../redux/store/UGStore';
import { ShengXiaoTitle } from '../../lottoSetting';
import { BettingReducerActions } from '../../../../../../redux/reducer/BettingReducer';
import HKBallsView from '../HKBallsView';
import HKSBItemView from '../HKSBItemView';
import HKNormalItemView from '../HKNormalItemView';

const TMPlayView = () => {
  const { selectedShengXiao, shengXiaoValue } = UGStore.globalProps.BettingReducer;
  const [label, setLabel] = useState<"特码A" | "特码B">("特码A")
  return <View style={{ flex: 1 }}>
    <View style={{ height: 40 }}>
      <View style={{ height: 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={1} onPress={() => {
          setLabel("特码A")
        }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: label == "特码A" ? "blue" : "black", fontWeight: label == "特码A" ? "bold" : "normal" }}>特码A</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => {
          setLabel("特码B")
        }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: label == "特码B" ? "blue" : "black", fontWeight: label == "特码B" ? "bold" : "normal" }}>特码B</Text>
        </TouchableOpacity>
      </View>
      <FlatList style={{ height: 40 }} keyExtractor={(item, index) => item + index} horizontal={true} data={ShengXiaoTitle} renderItem={({ item }) => {
        return (
          <TouchableWithoutFeedback onPress={() => {
            UGStore.dispatch({ type: BettingReducerActions.shengXiaoPress, value: item })
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 20, height: 40 }}>
              <Image style={{ width: 20, height: 20 }} source={{ uri: selectedShengXiao?.[item] == shengXiaoValue[item].length ? "RadioButton-Selected" : "RadioButton-Unselected" }} />
              <Text>{item}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
      }} />
    </View>
    <GameGroup label={label} />
  </View>
}
const itemSize = 40
const GameGroup = ({ label = "特码A" }: { label?: "特码A" | "特码B" }) => {
  const { currentPlayOdd } = UGStore.globalProps.BettingReducer;
  const { width } = useDimensions().screen
  return (
    <ScrollView style={{ flex: 1, }}>
      {currentPlayOdd?.playGroups?.filter((res) => res?.alias?.includes(label))?.map((res, index) => {
        switch (index) {
          case 0:
            return (<HKBallsView key={res.id + index} data={res} />
            )
            break;
          case 1:
            return <HKNormalItemView key={res.id + index} data={res} />
          case 2:
            return (
              <HKSBItemView key={res.id + index} data={res} />
            )
          default:
            break;
        }
      })}
      <View style={{ height: 10 }}></View>
    </ScrollView>
  )
}

export default TMPlayView 