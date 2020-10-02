import {FlatList, ScrollView, Text, TouchableWithoutFeedback, View} from "react-native"
import * as React from 'react'
import {UGStore} from "../../../../../../redux/store/UGStore"
import HKWXItemView from "../HKWXItemView"
import HKNormalItemView from "../HKNormalItemView";
import {useEffect, useState} from "react";
import {useDimensions} from "@react-native-community/hooks";
import {BettingReducerActions} from "../../../../../../redux/reducer/BettingReducer";
import {getHKballColor} from "../../lottoSetting";

export const YZDW_DATA = JSON.parse('{ "code": "YZDW", "name": "一字定位", "playGroups": [ { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "万定位", "plays": [ { "id": "143001", "name": "万定位", "alias": null, "rebate": "0.0000", "code": "WDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "千定位", "plays": [ { "id": "143002", "name": "千定位", "alias": null, "rebate": "0.0000", "code": "QDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "百定位", "plays": [ { "id": "143003", "name": "百定位", "alias": null, "rebate": "0.0000", "code": "BDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "十定位", "plays": [ { "id": "143004", "name": "十定位", "alias": null, "rebate": "0.0000", "code": "SDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "个定位", "plays": [ { "id": "143005", "name": "个定位", "alias": null, "rebate": "0.0000", "code": "GDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] } ] }')
// export const YZDW_playGroups = JSON.parse('[ { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "万定位", "plays": [ { "id": "143001", "name": "万定位", "alias": null, "rebate": "0.0000", "code": "WDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "千定位", "plays": [ { "id": "143002", "name": "千定位", "alias": null, "rebate": "0.0000", "code": "QDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "百定位", "plays": [ { "id": "143003", "name": "百定位", "alias": null, "rebate": "0.0000", "code": "BDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "十定位", "plays": [ { "id": "143004", "name": "十定位", "alias": null, "rebate": "0.0000", "code": "SDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "43", "name": "一字定位", "code": "YZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "个定位", "plays": [ { "id": "143005", "name": "个定位", "alias": null, "rebate": "0.0000", "code": "GDW", "played_groupid": "43", "odds": "9.8000", "offlineOdds": "9.8000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] } ]')

const itemSize = 40
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
      setCurrentOdd(result[0]?.plays?.[0]?.odds.replace("00", "").replace(".00", "") ?? "")
    }
    UGStore.dispatch({type: BettingReducerActions.cleanBetGroupResult})
  }, [currentFilter])
  //玩法列表
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList showsHorizontalScrollIndicator={false} horizontal={true} style={{}}
                  keyExtractor={item => item} data={plays ?? []}
                  renderItem={({item}) => {
                    return <TouchableWithoutFeedback onPress={() => {
                      setCurrentFilter(item)
                    }}>
                      <Text style={{
                        paddingHorizontal: 12,
                        paddingTop: 20,
                        paddingBottom: 10,
                        fontSize: 14,
                        backgroundColor: currentFilter == item ? "#e6e6e6" : "#dbdbdb",
                      }}>{item}</Text>
                    </TouchableWithoutFeedback>
                  }}/>
      </View>
      <Text style={{
        textAlign: 'center',
        paddingVertical: 10,
        color: "#c8222f",
        backgroundColor: "#eee"
      }}>{currentFilter}</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {Array.from({length: 10}).map((res, index) => index + 1).map((res, index) => {
          return (
            <TouchableWithoutFeedback onPress={() => {
              UGStore.dispatch({type: BettingReducerActions.itemPress, value: res})
              setProps && setProps()
            }}>
              <View key={index} style={{
                width: ((width / 4 * 3) - 5) / 3,
                borderWidth: 1,
                borderColor: '#444',
                height: itemSize
              }}>
                <View style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#444',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: "#00000000"
                }}>
                  <View style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    borderColor: getHKballColor(res < 10 ? "0" + res : res.toString()),
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 5
                  }}>
                    <Text>{res < 10 ? "0" + res : res.toString()}</Text>
                  </View>
                  <Text>{currentOdd}</Text>
                </View>
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
