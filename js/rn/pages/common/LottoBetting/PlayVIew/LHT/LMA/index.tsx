import { View, ScrollView, Text, FlatList, TouchableWithoutFeedback } from "react-native"
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useDimensions } from "@react-native-community/hooks"
import { IGlobalState } from "../../../../../../redux/store/UGStore"
import { getHKballColor } from "../../lottoSetting"
import { BettingReducerActions } from "../../../../../../redux/reducer/BettingReducer"
const itemSize = 40
const LMAContainer = () => {
  const { currentPlayOdd, } = useSelector((state: IGlobalState) => state.BettingReducer)
  const [plays, setPlays] = useState([])
  const [currentFilter, setCurrentFilter] = useState("")
  const { width } = useDimensions().screen
  const [currentOdd, setCurrentOdd] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    const playsStringArray = []
    currentPlayOdd.playGroups.map((res) => {
      playsStringArray.push(res.alias.slice(0, 3))
    })

    setPlays(playsStringArray.filter((res, index) => playsStringArray.indexOf(res) === index))
    setCurrentFilter(playsStringArray[0])
  }, [currentPlayOdd])
  useEffect(() => {
    const result = currentPlayOdd.playGroups.filter((res) => res.alias.slice(0, 3) == currentFilter)
    if (result.length > 0) {
      setCurrentOdd(result[0]?.plays?.[0]?.odds.replace("00", "").replace(".00", "") ?? "")
    }
    dispatch({ type: BettingReducerActions.cleanBetGroupResult })
  }, [currentFilter])
  //玩法列表
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <FlatList horizontal={true} style={{}} keyExtractor={item => item} data={plays ?? []} renderItem={({ item }) => {
          return <TouchableWithoutFeedback onPress={() => {
            setCurrentFilter(item)
          }}>
            <Text style={{ marginLeft: 27, marginTop: 20, marginBottom: 10, fontSize: 14, color: currentFilter == item ? "blue" : "black" }}>{item}</Text>
          </TouchableWithoutFeedback>
        }} />
      </View>
      <Text style={{ textAlign: 'center', marginVertical: 10 }}>{currentFilter}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Array.from({ length: 49 }).map((res, index) => index + 1).map((res, index) => {
          if (index < 45) {
            return (
              <TouchableWithoutFeedback onPress={() => {
                dispatch({ type: BettingReducerActions.itemGroupPress, value: res })
              }}>
                <View key={index} style={{ width: ((width / 4 * 3) - 5) / 3, borderWidth: 1, borderColor: '#444', height: itemSize }}>
                  <View style={{ flex: 1, borderWidth: 1, borderColor: '#444', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', backgroundColor: "#00000000" }}>
                    <View style={{ width: 30, height: 30, borderRadius: 15, borderColor: getHKballColor(res < 10 ? "0" + res : res.toString()), borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                      <Text>{res < 10 ? "0" + res : res.toString()}</Text>
                    </View>
                    <Text>{currentOdd}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          } else {
            return (
              <TouchableWithoutFeedback onPress={() => {
                dispatch({ type: BettingReducerActions.itemGroupPress, value: res })
              }}>
                <View key={index} style={{ width: ((width / 4 * 3) - 5) / 2, borderWidth: 1, borderColor: '#444', height: itemSize }}>
                  <View style={{ flex: 1, borderWidth: 1, borderColor: '#444', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', backgroundColor: "#00000000" }}>
                    <View style={{ width: 30, height: 30, borderRadius: 15, borderColor: getHKballColor(res < 10 ? "0" + res : res.toString()), borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                      <Text>{res < 10 ? "0" + res : res.toString()}</Text>
                    </View>
                    <Text>{currentOdd}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          }
        })
        }
      </View>
    </ScrollView>
  )
}
export default LMAContainer