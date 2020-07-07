import React, { useEffect, useState, useContext } from 'react'
import { View, Image, Text, TouchableWithoutFeedback, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { ShengXiaoTitle, } from '../config'
import { DataProvider, } from "recyclerlistview";
import { useDimensions } from '@react-native-community/hooks';
import { PlayGroup, Play } from '../../../../../public/network/Model/PlayOddDataModel';
import { useDispatch, useSelector } from 'react-redux';
import { BettingReducerActions } from '../../../../../redux/reducer/BettingReducer';
import { UGStore, IGlobalState } from '../../../../../redux/store/UGStore';
import TMItem from './TMItem';
import LMItem from './LMItem';
const TMPlayView = () => {
  const { selectedShengXiao, shengXiaoValue } = useSelector((state: IGlobalState) => state.BettingReducer)
  const dispatch = useDispatch()
  const [label, setLabel] = useState<"特码A" | "特码B">("特码A")
  return <View style={{ flex: 1 }}>
    <View style={{ height: 40 }}>
      <View style={{ height: 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={1} onPress={() => {
          setLabel("特码A")
        }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>特码A</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => {
          setLabel("特码B")
        }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>特码B</Text>
        </TouchableOpacity>
      </View>
      <FlatList style={{ height: 40 }} keyExtractor={(item, index) => item + index} horizontal={true} data={ShengXiaoTitle} renderItem={({ item }) => {
        return (
          <TouchableWithoutFeedback onPress={() => {
            dispatch({ type: BettingReducerActions.shengXiaoPress, value: item })
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
  const { currentPlayOdd } = useSelector((state: IGlobalState) => state.BettingReducer)
  const { width } = useDimensions().screen
  return (
    <ScrollView style={{ flex: 1, }}>
      {currentPlayOdd?.playGroups?.filter((res) => res?.alias?.includes(label))?.map((res, index) => {
        switch (index) {
          case 0:
            return (
              <View key={res.alias + index} style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center', marginBottom: 10 }}>{res.alias}</Text>
                <View style={{ flex: 1, flexWrap: "wrap", flexDirection: 'row', }}>
                  {
                    res.plays.map((data, index) => {
                      if (index < 45) {
                        return <View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{ width: ((width / 4 * 3) - 5) / 3, borderWidth: 1, borderColor: '#444', height: itemSize }}>
                          <TMItem data={data} />
                        </View>
                      } else {
                        return <View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{ width: ((width / 4 * 3) - 5) / 2, borderWidth: 1, borderColor: '#444', height: itemSize }}>
                          <TMItem data={data} />
                        </View>
                      }
                    })
                  }
                </View>
              </View>
            )
            break;
          case 1:
            return <View key={res.alias + index} style={{ flex: 1 }}>
              <Text style={{ textAlign: 'center', marginBottom: 10, marginTop: 10 }}>{res.alias}</Text>
              <View style={{ flex: 1, flexWrap: "wrap", flexDirection: 'row', }}>
                {
                  res.plays.map((data, index) => {
                    return <View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{ width: ((width / 4 * 3) - 5) / 2, borderWidth: 1, borderColor: '#444', height: itemSize }}>
                      <LMItem data={data} />
                    </View>
                  })
                }
              </View>
            </View>
          case 2:
            return (
              <View key={res.alias + index} style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center', marginBottom: 10, marginTop: 10 }}>{res.alias}</Text>
                <View style={{ flex: 1, flexWrap: "wrap", flexDirection: 'row', }}>
                  {
                    res.plays.map((data, index) => {
                      return <View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{ width: ((width / 4 * 3) - 5) / 3, borderWidth: 1, borderColor: '#444', height: itemSize }}>
                        <LMItem data={data} />
                      </View>
                    })
                  }
                </View>
              </View>
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