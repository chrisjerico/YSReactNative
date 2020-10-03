import {FlatList, ScrollView, Text, TouchableWithoutFeedback, View} from "react-native"
import * as React from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKWXItemView from "../../LHT/HKWXItemView"
import HKNormalItemView from "../../LHT/HKNormalItemView";
import {useEffect, useState} from "react";
import {useDimensions} from "@react-native-community/hooks";
import {BettingReducerActions} from "../../../../../../redux/reducer/BettingReducer";
import {getHKballColor} from "../../lottoSetting";
import {BALL_STYLES, TAG_COLOR} from "../../comm/LotteryStyles";
import {BALL_NUMBERS_0_9} from "../../comm/LotteryElements";

export const DWD_DATA = JSON.parse('{ "code": "DWD", "name": "定位胆", "playGroups": [ { "id": "48", "name": "定位胆", "code": "DWD", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "万", "plays": [ { "id": "148001", "name": "万", "alias": "", "rebate": "0.0000", "code": "DWDW", "played_groupid": "48", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "1000000", "maxTurnMoney": "50000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "48", "name": "定位胆", "code": "DWD", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "千", "plays": [ { "id": "148002", "name": "千", "alias": "", "rebate": "0.0000", "code": "DWDQ", "played_groupid": "48", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "1000000", "maxTurnMoney": "50000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "48", "name": "定位胆", "code": "DWD", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "百", "plays": [ { "id": "148003", "name": "百", "alias": "", "rebate": "0.0000", "code": "DWDB", "played_groupid": "48", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "1000000", "maxTurnMoney": "50000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "48", "name": "定位胆", "code": "DWD", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "十", "plays": [ { "id": "148004", "name": "十", "alias": "", "rebate": "0.0000", "code": "DWDS", "played_groupid": "48", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "1000000", "maxTurnMoney": "50000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "48", "name": "定位胆", "code": "DWD", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "个", "plays": [ { "id": "148005", "name": "个", "alias": "", "rebate": "0.0000", "code": "DWDG", "played_groupid": "48", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "1000000", "maxTurnMoney": "50000000", "isBan": "0", "enable": "1", "from_id": "0" } ] } ] }')
// export const YZDW_playGroups = JSON.parse('[ { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "万定位", "plays": [ { "id": "143001", "name": "万定位", "alias": null, "rebate": "0.0000", "code": "WDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "千定位", "plays": [ { "id": "143002", "name": "千定位", "alias": null, "rebate": "0.0000", "code": "QDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "百定位", "plays": [ { "id": "143003", "name": "百定位", "alias": null, "rebate": "0.0000", "code": "BDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "十定位", "plays": [ { "id": "143004", "name": "十定位", "alias": null, "rebate": "0.0000", "code": "SDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "个定位", "plays": [ { "id": "143005", "name": "个定位", "alias": null, "rebate": "0.0000", "code": "GDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] } ]')

const NUMBER_OF_COLUMNS = 5;//多少列

const DWDContainer = ({setProps}) => {
  // const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  //Todo arc
  const currentPlayOdd = DWD_DATA;
  const [plays, setPlays] = useState([])
  const [currentFilter, setCurrentFilter] = useState("")
  const {width} = useDimensions().screen
  const [currentOdd, setCurrentOdd] = useState("")

  //球格区域大小
  const BALL_GRID_WIDTH = (width * 3 / 4) - 1

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
      {
        plays.map((item, index) => {
          return <View>
            <Text style={BALL_STYLES.ball_title}>{item}</Text>
            <View style={BALL_STYLES.ball_grid}>
              {
                BALL_NUMBERS_0_9.map((res, index) => {
                  return (
                    <TouchableWithoutFeedback onPress={() => {
                      UGStore.dispatch({type: BettingReducerActions.itemPress, value: res})
                      setProps && setProps()
                    }}>
                      <View key={index} style={[BALL_STYLES.grid_item,
                        {width: BALL_GRID_WIDTH / NUMBER_OF_COLUMNS}]}>
                        <View style={[BALL_STYLES.grid_ball,
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
          </View>
        })
      }


    </ScrollView>
  )
}
export default DWDContainer
