import {FlatList, ScrollView, Text, TouchableWithoutFeedback, View} from "react-native"
import * as React from 'react'
import {useEffect, useState} from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKBallsView from "../HKBallsView"
import HKNormalWithSBView from "../HKNormalWithSBView"

const ZTContainer = ({setProps}) => {
    const {currentPlayOdd,} = UGStore.globalProps.BettingReducer;
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
        <ScrollView style={{flex: 1}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FlatList horizontal={true} style={{}} keyExtractor={item => item} data={plays}
                          renderItem={({item}) => {
                              return <TouchableWithoutFeedback onPress={() => {
                                  setCurrentFilter(item)
                              }}>
                                  <View style={{
                                      backgroundColor: currentFilter == item ? "#e6e6e6" : "#dedede",
                                      justifyContent: "center",
                                      alignContent: "center",
                                      borderRightWidth: 0.5,
                                      borderRightColor: "white",
                                  }}>
                                      <Text style={{
                                          marginHorizontal: 27,
                                          marginVertical: 16,
                                          fontSize: 14,
                                          color: currentFilter == item ? "blue" : "black"
                                      }}>{item}</Text>
                                  </View>
                              </TouchableWithoutFeedback>
                          }}/>
            </View>
            {currentPlayOdd.playGroups.filter((res) => res.alias.includes(currentFilter)).map((res, index) => {
                if (index == 0) {
                    return <HKBallsView setProps={setProps} key={res.id + index} data={res}/>
                } else {
                    return <HKNormalWithSBView setProps={setProps} key={res.id + index} data={res}/>
                }

            })}
        </ScrollView>
    )
}
export default ZTContainer
