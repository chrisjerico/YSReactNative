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
import BallItem, {BALL_TYPE} from "../../comm/widgets/BallItem";
import {ugLog} from "../../../../../../public/tools/UgLog";
import { UGText } from '../../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const GFWF_DATA = JSON.parse('{ "code": "GFWF", "name": "官方玩法", "playGroups": [ { "id": "42", "name": "官方玩法", "code": "GFWF", "isShow": "0", "enable": "1", "isBan": "0", "from_id": "0", "alias": "猜冠军", "plays": [ { "id": "5504201", "name": "猜冠军", "alias": "", "rebate": "0.0000", "code": "CGJ", "played_groupid": "42", "odds": "9.9500", "offlineOdds": "9.9500", "minMoney": "1", "maxMoney": "100000", "maxTurnMoney": "5000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "42", "name": "官方玩法", "code": "GFWF", "isShow": "0", "enable": "1", "isBan": "0", "from_id": "0", "alias": "猜前二", "plays": [ { "id": "5504202", "name": "猜前二", "alias": "", "rebate": "0.0000", "code": "CQE", "played_groupid": "42", "odds": "89.9500", "offlineOdds": "89.9500", "minMoney": "1", "maxMoney": "10000", "maxTurnMoney": "500000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "42", "name": "官方玩法", "code": "GFWF", "isShow": "0", "enable": "1", "isBan": "0", "from_id": "0", "alias": "猜前三", "plays": [ { "id": "5504203", "name": "猜前三", "alias": "", "rebate": "0.0000", "code": "CQS", "played_groupid": "42", "odds": "710.9500", "offlineOdds": "710.9500", "minMoney": "1", "maxMoney": "100", "maxTurnMoney": "500", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "42", "name": "官方玩法", "code": "GFWF", "isShow": "0", "enable": "1", "isBan": "0", "from_id": "0", "alias": "猜前四", "plays": [ { "id": "5504204", "name": "猜前四", "alias": "", "rebate": "0.0000", "code": "CQSI", "played_groupid": "42", "odds": "4958.9500", "offlineOdds": "4958.9500", "minMoney": "1", "maxMoney": "10", "maxTurnMoney": "50", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "42", "name": "官方玩法", "code": "GFWF", "isShow": "0", "enable": "1", "isBan": "0", "from_id": "0", "alias": "猜前五", "plays": [ { "id": "5504205", "name": "猜前五", "alias": "", "rebate": "0.0000", "code": "CQW", "played_groupid": "42", "odds": "29708.9500", "offlineOdds": "29708.9500", "minMoney": "1", "maxMoney": "1", "maxTurnMoney": "5", "isBan": "0", "enable": "1", "from_id": "0" } ] } ] }')

const GFWFContainer = ({setProps}) => {
  // const { currentPlayOdd, bettingResult } = UGStore.globalProps.BettingReducer;
  const selectedBalls = UGStore.globalProps.BettingReducer?.bettingResult ?? {};
  //Todo arc
  const currentPlayOdd = GFWF_DATA;
  const [plays, setPlays] = useState([])
  const [currentFilter, setCurrentFilter] = useState("")
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
                  renderItem={({item}) => {
                    return <TouchableWithoutFeedback onPress={() => {
                      setCurrentFilter(item)
                    }}>
                      <UGText style={[BALL_STYLES.tab, {
                        backgroundColor: TAG_COLOR(currentFilter, item),
                      }]}>{item}</UGText>
                    </TouchableWithoutFeedback>
                  }}/>
      </View>
      <UGText style={BALL_STYLES.ball_title_odds}>{currentOdd}</UGText>
      <UGText style={BALL_STYLES.ball_title}>{currentFilter}</UGText>
      <View style={BALL_STYLES.ball_grid}>
        {
          BALL_NUMBERS_0_9.map((res, index) => {
            return (
              <TouchableWithoutFeedback onPress={() => {
                UGStore.dispatch({type: BettingReducerActions.ballPress, value: res.toString()})
                setProps && setProps()
              }}>
                <View key={index} style={[BALL_STYLES.grid_item,
                  {width: BALL_GRID_WIDTH / 3,
                    backgroundColor: selectedBalls[res.toString()] > -1 ? 'grey' : 'transparent',
                  }]}>
                  <BallItem text={res.toString()}
                            ballStyle={BALL_TYPE.SQUARE_FILLED}/>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </View>

    </ScrollView>
  )
}
export default GFWFContainer
