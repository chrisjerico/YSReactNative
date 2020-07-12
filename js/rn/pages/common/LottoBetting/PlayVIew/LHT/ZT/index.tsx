import { View, Text, ScrollView, FlatList, TouchableWithoutFeedback } from "react-native"
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { IGlobalState } from "../../../../../../redux/store/UGStore"
import HKBallsView from "../HKBallsView"
import HKNormalWithSBView from "../HKNormalWithSBView"
const ZTContainer = () => {
  const { currentPlayOdd, } = useSelector((state: IGlobalState) => state.BettingReducer)
  useEffect(() => {
    const playsStringArray = []
    currentPlayOdd.playGroups.map((res) => {
      playsStringArray.push(res.alias.slice(0, 3))
    })

    setPlays(playsStringArray.filter((res, index) => playsStringArray.indexOf(res) === index))
    setCurrentFilter(playsStringArray[0])
  }, [currentPlayOdd])
  //玩法列表
  const [plays, setPlays] = useState([])
  const [currentFilter, setCurrentFilter] = useState("")
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <FlatList horizontal={true} style={{}} keyExtractor={item => item} data={plays} renderItem={({ item }) => {
          return <TouchableWithoutFeedback onPress={() => {
            setCurrentFilter(item)
          }}>
            <Text style={{ marginLeft: 27, marginTop: 20, marginBottom: 10, fontSize: 14, color: currentFilter == item ? "blue" : "black" }}>{item}</Text>
          </TouchableWithoutFeedback>
        }} />
      </View>
      {currentPlayOdd.playGroups.filter((res) => res.alias.includes(currentFilter)).map((res, index) => {
        if (index == 0) {
          return <HKBallsView key={res.id + index} data={res} />
        } else {
          return <HKNormalWithSBView key={res.id + index} data={res} />
        }

      })}
    </ScrollView>
  )
}
export default ZTContainer