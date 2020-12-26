import { FlatList, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useDimensions } from '@react-native-community/hooks'
import { UGStore } from '../../../../../../redux/store/UGStore'
import { getHKballColor } from '../../lottoSetting'
import { BettingReducerActions } from '../../../../../../redux/reducer/BettingReducer'

const itemSize = 40
const LMAContainer = ({ setProps }) => {
  const { currentPlayOdd, subPlay } = UGStore.globalProps.BettingReducer
  const [plays, setPlays] = useState([])
  const [currentFilter, setCurrentFilter] = useState('')
  const { width } = useDimensions().screen
  const [currentOdd, setCurrentOdd] = useState('')
  const {bettingResult} = UGStore.globalProps.BettingReducer;
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
      setCurrentOdd(result[0]?.plays?.[0]?.odds.replace('00', '').replace('.00', '') ?? '')
    }
    UGStore.dispatch({ type: BettingReducerActions.cleanBetGroupResult })
  }, [currentFilter])
  //玩法列表
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <FlatList showsHorizontalScrollIndicator={false} horizontal={true} style={{}}
                  keyExtractor={item => item} data={plays ?? []}
                  renderItem={({ item }) => {
                    return <TouchableWithoutFeedback onPress={() => {
                      UGStore.dispatch({type: BettingReducerActions.subPlayPress, value: currentFilter})
                      setProps()
                      setCurrentFilter(item)
                    }}>
                      <Text style={{
                        paddingHorizontal: 12,
                        paddingTop: 20,
                        paddingBottom: 10,
                        fontSize: 14,
                        backgroundColor: currentFilter == item ? '#e6e6e6' : '#dbdbdb',
                      }}>{item}</Text>
                    </TouchableWithoutFeedback>
                  }} />
      </View>
      <Text style={{
        textAlign: 'center',
        paddingVertical: 10,
        color: '#c8222f',
        backgroundColor: '#eee',
      }}>{currentFilter}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Array.from({ length: 49 }).map((res, index) => index + 1).map((res, index) => {
          if (index < 45) {
            return (
              <TouchableWithoutFeedback onPress={() => {
                UGStore.dispatch({type: BettingReducerActions.itemPress, value: res})
                setProps && setProps()
              }}>
                <View key={index} style={{
                  width: ((width / 4 * 3) - 5) / 3,
                  height: itemSize,
                }}>
                  <View style={{
                    flex: 1,
                    borderWidth: 0.5,
                    borderColor: '#444',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: bettingResult[res] ? '#aaa' : "white",
                  }}>
                    <View style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      borderColor: getHKballColor(res < 10 ? '0' + res : res.toString()),
                      backgroundColor: bettingResult[res] ? getHKballColor(res < 10 ? '0' + res : res.toString()) : "#FFFFFF",
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 5,
                    }}>
                      <Text style={{color: bettingResult[res] ? "white" : "black"}}>{res < 10 ? '0' + res : res.toString()}</Text>
                    </View>
                    <Text>{currentOdd}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          } else {
            return (
              <TouchableWithoutFeedback onPress={() => {
                UGStore.dispatch({ type: BettingReducerActions.itemGroupPress, value: res })
                setProps && setProps()
              }}>
                <View key={index} style={{
                  width: ((width / 4 * 3) - 5) / 2,
                  height: itemSize,
                }}>
                  <View style={{
                    flex: 1,
                    borderWidth: 0.5,
                    borderColor: '#444',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#00000000',
                  }}>
                    <View style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      borderColor: getHKballColor(res < 10 ? '0' + res : res.toString()),
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 5,
                    }}>
                      <Text>{res < 10 ? '0' + res : res.toString()}</Text>
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
