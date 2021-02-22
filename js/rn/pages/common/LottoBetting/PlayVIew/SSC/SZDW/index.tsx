import {FlatList, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native"
import * as React from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKWXItemView from "../../LHT/HKWXItemView"
import HKNormalItemView from "../../LHT/HKNormalItemView";
import {useEffect, useState} from "react";
import {useDimensions} from "@react-native-community/hooks";
import {BettingReducerActions} from "../../../../../../redux/reducer/BettingReducer";
import {getHKballColor} from "../../lottoSetting";
import {scale} from "../../../../../../public/tools/Scale";
import {BALL_NUMBERS_0_9} from "../../comm/LotteryElements";
import {BALL_STYLES, TAG_COLOR} from "../../comm/LotteryStyles";
import BallItem from "../../comm/widgets/BallItem";
import { UGText } from '../../../../../../../doy/public/Button之类的基础组件/DoyButton'

export const SZDW_DATA = JSON.parse('{ "code": "SZDW", "name": "三字定位", "playGroups": [ { "id": "45", "name": "三字定位", "code": "SZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "前三", "plays": [ { "id": "145001", "name": "前三", "alias": null, "rebate": "0.0000", "code": "QSDW", "played_groupid": "45", "odds": "700.0000", "offlineOdds": "700.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "45", "name": "三字定位", "code": "SZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "中三", "plays": [ { "id": "145002", "name": "中三", "alias": null, "rebate": "0.0000", "code": "ZSDW", "played_groupid": "45", "odds": "700.0000", "offlineOdds": "700.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "45", "name": "三字定位", "code": "SZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "后三", "plays": [ { "id": "145003", "name": "后三", "alias": null, "rebate": "0.0000", "code": "HSDW", "played_groupid": "45", "odds": "700.0000", "offlineOdds": "700.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] } ] }')

const SZDWContainer = ({setProps}) => {
  // const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  //Todo arc
  const currentPlayOdd = SZDW_DATA;
  const [plays, setPlays] = useState([])
  const [currentFilter, setCurrentFilter] = useState("")
  const [tabIndex, setTabIndex] = useState(0)
  const {width} = useDimensions().screen
  const [currentOdd, setCurrentOdd] = useState("")
  useEffect(() => {
    const playsStringArray = []
    currentPlayOdd.playGroups.map((res) => {
      playsStringArray.push(res.alias)
    })

    setPlays(playsStringArray.filter((res, index) => playsStringArray.indexOf(res) === index))
    setCurrentFilter(playsStringArray[0])
  }, [currentPlayOdd])

  useEffect(() => {
    const result = currentPlayOdd.playGroups.filter((res) => res.alias == currentFilter)
    if (result.length > 0) {
      setCurrentOdd(result[0]?.plays?.[0]?.odds ?? "")
    }
    UGStore.dispatch({type: BettingReducerActions.cleanBetGroupResult})
  }, [currentFilter])

  //球格区域大小
  const BALL_GRID_WIDTH = (width * 3 / 4) - 1

  //玩法列表
  return (
    <ScrollView style={{flex: 1}}>
      <View style={BALL_STYLES.tab_container}>
        <FlatList showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={{}}
                  keyExtractor={item => item}
                  data={plays ?? []}
                  renderItem={({item, index}) => {
                    return <TouchableWithoutFeedback onPress={() => {
                      setCurrentFilter(item)
                      setTabIndex(index)
                    }}>
                      <UGText style={[BALL_STYLES.tab, {
                        backgroundColor: TAG_COLOR(currentFilter, item),
                      }]}>{item}</UGText>
                    </TouchableWithoutFeedback>
                  }}/>
      </View>
      <UGText style={BALL_STYLES.ball_title_odds}>{currentOdd}</UGText>
      {
        BALL_TITLE[tabIndex].map(((value, index) => {
          return <View>
            <UGText style={BALL_STYLES.ball_title}>{value}</UGText>
            <View style={BALL_STYLES.ball_grid}>
              {
                BALL_NUMBERS_0_9.map((res, index) => {
                  return (
                    <TouchableWithoutFeedback onPress={() => {
                      UGStore.dispatch({type: BettingReducerActions.itemPress, value: res})
                      setProps && setProps()
                    }}>
                      <View key={index} style={[BALL_STYLES.grid_item,
                        {width: BALL_GRID_WIDTH / 3}]}>
                        <BallItem text={res.toString()}/>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })
              }
            </View>
          </View>
        }))
      }
    </ScrollView>
  );
}

const BALL_TITLE = [['万定位', '千定位', '百定位'],
  ['千定位', '百定位', '十定位'],
  ['百定位', '十定位', '个定位']
];

export default SZDWContainer
