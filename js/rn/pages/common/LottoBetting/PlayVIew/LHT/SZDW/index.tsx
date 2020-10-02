import {FlatList, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native"
import * as React from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKWXItemView from "../HKWXItemView"
import HKNormalItemView from "../HKNormalItemView";
import {useEffect, useState} from "react";
import {useDimensions} from "@react-native-community/hooks";
import {BettingReducerActions} from "../../../../../../redux/reducer/BettingReducer";
import {getHKballColor} from "../../lottoSetting";
import {scale} from "../../../../../../public/tools/Scale";

export const SZDW_DATA = JSON.parse('{ "code": "SZDW", "name": "三字定位", "playGroups": [ { "id": "45", "name": "三字定位", "code": "SZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "前三", "plays": [ { "id": "145001", "name": "前三", "alias": null, "rebate": "0.0000", "code": "QSDW", "played_groupid": "45", "odds": "700.0000", "offlineOdds": "700.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "45", "name": "三字定位", "code": "SZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "中三", "plays": [ { "id": "145002", "name": "中三", "alias": null, "rebate": "0.0000", "code": "ZSDW", "played_groupid": "45", "odds": "700.0000", "offlineOdds": "700.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "45", "name": "三字定位", "code": "SZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "后三", "plays": [ { "id": "145003", "name": "后三", "alias": null, "rebate": "0.0000", "code": "HSDW", "played_groupid": "45", "odds": "700.0000", "offlineOdds": "700.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] } ] }')

const itemSize = scale(60)
const SZDWContainer = ({setProps}) => {
  // const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  //Todo arc
  const currentPlayOdd = SZDW_DATA;
  const [plays, setPlays] = useState([])
  const [currentFilter, setCurrentFilter] = useState("")
  const {width} = useDimensions().screen
  const [currentOdd, setCurrentOdd] = useState("")
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
    UGStore.dispatch({type: BettingReducerActions.cleanBetGroupResult})
  }, [currentFilter])

  //玩法列表
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
        <FlatList showsHorizontalScrollIndicator={false} horizontal={true} style={{}}
                  keyExtractor={item => item} data={plays ?? []}
                  renderItem={({item}) => {
                    return <TouchableWithoutFeedback onPress={() => {
                      setCurrentFilter(item)
                    }}>
                      <Text style={[_styles.tab, {
                        backgroundColor: currentFilter == item ? "#e6e6e6" : "#dbdbdb",
                      }]}>{item}</Text>
                    </TouchableWithoutFeedback>
                  }}/>
      </View>
      <Text style={_styles.ball_title}>{'万定位'}</Text>
      <View style={_styles.ball_grid}>
        {
          Array.from({length: 10}).map((res, index) => index + 1).map((res, index) => {
            return (
              <TouchableWithoutFeedback onPress={() => {
                UGStore.dispatch({type: BettingReducerActions.itemPress, value: res})
                setProps && setProps()
              }}>
                <View key={index} style={[_styles.grid_item,
                  {width: ((width / 4 * 3) - 1) / 3}]}>
                  <View style={[_styles.grid_ball,
                    {borderColor: getHKballColor(res < 10 ? "0" + res : res.toString()),}]}>
                    <Text>{res < 10 ? "0" + res : res.toString()}</Text>
                  </View>
                  <Text>{currentOdd}</Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </View>
      <Text style={_styles.ball_title}>{'千定位'}</Text>
      <View style={_styles.ball_grid}>
        {
          Array.from({length: 10}).map((res, index) => index + 1).map((res, index) => {
            return (
              <TouchableWithoutFeedback onPress={() => {
                UGStore.dispatch({type: BettingReducerActions.itemPress, value: res})
                setProps && setProps()
              }}>
                <View key={index} style={[_styles.grid_item,
                  {width: (((width * 3) / 4) - 1) / 3}]}>
                  <View style={[_styles.grid_ball,
                    {borderColor: getHKballColor(res < 10 ? "0" + res : res.toString()),}]}>
                    <Text>{res < 10 ? "0" + res : res.toString()}</Text>
                  </View>
                  <Text>{currentOdd}</Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </View>
      <Text style={_styles.ball_title}>{'百定位'}</Text>
      <View style={_styles.ball_grid}>
        {
          Array.from({length: 10}).map((res, index) => index + 1).map((res, index) => {
            return (
              <TouchableWithoutFeedback onPress={() => {
                UGStore.dispatch({type: BettingReducerActions.itemPress, value: res})
                setProps && setProps()
              }}>
                <View key={index} style={[_styles.grid_item,
                  {width: ((width / 4 * 3) - 1) / 3}]}>
                  <View style={[_styles.grid_ball,
                    {borderColor: getHKballColor(res < 10 ? "0" + res : res.toString()),}]}>
                    <Text>{res < 10 ? "0" + res : res.toString()}</Text>
                  </View>
                  <Text>{currentOdd}</Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </View>
    </ScrollView>
  )
}

const _styles = StyleSheet.create({
    tab: {
      paddingHorizontal: scale(18),
      paddingTop: scale(30),
      paddingBottom: scale(15),
      fontSize: scale(22),
    },
    ball_title: {
      textAlign: 'center',
      paddingVertical: scale(15),
      color: "#c8222f",
      backgroundColor: "#eee"
    },
    ball_grid: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    grid_item: {
      borderBottomWidth: scale(1),
      borderRightWidth: scale(1),
      borderColor: 'grey',
      height: itemSize,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    grid_ball: {
      width: scale(45),
      height: scale(45),
      borderRadius: 999,
      borderWidth: scale(2),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5
    }
  }
)
export default SZDWContainer
