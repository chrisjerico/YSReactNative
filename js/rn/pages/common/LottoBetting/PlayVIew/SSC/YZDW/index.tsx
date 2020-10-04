import {FlatList, ScrollView, Text, TouchableWithoutFeedback, View} from "react-native"
import * as React from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKWXItemView from "../../LHT/HKWXItemView"
import HKNormalItemView from "../../LHT/HKNormalItemView";
import {useEffect, useState} from "react";
import {useDimensions} from "@react-native-community/hooks";
import {BettingReducerActions} from "../../../../../../redux/reducer/BettingReducer";
import {getHKballColor} from "../../lottoSetting";
import {BALL_NUMBERS_0_9} from "../../comm/LotteryElements";
import {BALL_STYLES, TAG_COLOR} from "../../comm/LotteryStyles";
import BallItem from "../../comm/widgets/BallItem";

export const YZDW_DATA = JSON.parse('{ "code": "YZDW", "name": "一字定位", "playGroups": [ { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "万定位", "plays": [ { "id": "143001", "name": "万定位", "alias": null, "rebate": "0.0000", "code": "WDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "千定位", "plays": [ { "id": "143002", "name": "千定位", "alias": null, "rebate": "0.0000", "code": "QDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "百定位", "plays": [ { "id": "143003", "name": "百定位", "alias": null, "rebate": "0.0000", "code": "BDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "十定位", "plays": [ { "id": "143004", "name": "十定位", "alias": null, "rebate": "0.0000", "code": "SDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "个定位", "plays": [ { "id": "143005", "name": "个定位", "alias": null, "rebate": "0.0000", "code": "GDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] } ] }')

const YZDWContainer = ({setProps}) => {
  // const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  //Todo arc
  const currentPlayOdd = YZDW_DATA;
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
                  renderItem={({item}) => {
                    return <TouchableWithoutFeedback onPress={() => {
                      setCurrentFilter(item)
                    }}>
                      <Text style={[BALL_STYLES.tab, {
                        backgroundColor: TAG_COLOR(currentFilter, item),
                      }]}>{item}</Text>
                    </TouchableWithoutFeedback>
                  }}/>
      </View>
      <Text style={BALL_STYLES.ball_title_odds}>{currentOdd}</Text>
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

    </ScrollView>
  )
}
export default YZDWContainer
