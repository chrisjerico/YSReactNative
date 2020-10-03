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

export const EZDW_DATA = JSON.parse('{ "code": "EZDW", "name": "二字定位", "playGroups": [ { "id": "44", "name": "二字定位", "code": "EZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "万千", "plays": [ { "id": "144001", "name": "万千", "alias": null, "rebate": "0.0000", "code": "WQDW", "played_groupid": "44", "odds": "83.0000", "offlineOdds": "83.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "44", "name": "二字定位", "code": "EZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "万百", "plays": [ { "id": "144002", "name": "万百", "alias": null, "rebate": "0.0000", "code": "WBDW", "played_groupid": "44", "odds": "83.0000", "offlineOdds": "83.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "44", "name": "二字定位", "code": "EZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "万十", "plays": [ { "id": "144003", "name": "万十", "alias": null, "rebate": "0.0000", "code": "WSDW", "played_groupid": "44", "odds": "83.0000", "offlineOdds": "83.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "44", "name": "二字定位", "code": "EZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "万个", "plays": [ { "id": "144004", "name": "万个", "alias": null, "rebate": "0.0000", "code": "WGDW", "played_groupid": "44", "odds": "83.0000", "offlineOdds": "83.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "44", "name": "二字定位", "code": "EZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "千百", "plays": [ { "id": "144005", "name": "千百", "alias": null, "rebate": "0.0000", "code": "QBDW", "played_groupid": "44", "odds": "83.0000", "offlineOdds": "83.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "44", "name": "二字定位", "code": "EZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "千十", "plays": [ { "id": "144006", "name": "千十", "alias": null, "rebate": "0.0000", "code": "QSDW", "played_groupid": "44", "odds": "83.0000", "offlineOdds": "83.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "44", "name": "二字定位", "code": "EZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "千个", "plays": [ { "id": "144007", "name": "千个", "alias": null, "rebate": "0.0000", "code": "QGDW", "played_groupid": "44", "odds": "83.0000", "offlineOdds": "83.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "44", "name": "二字定位", "code": "EZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "百十", "plays": [ { "id": "144008", "name": "百十", "alias": null, "rebate": "0.0000", "code": "BSDW", "played_groupid": "44", "odds": "83.0000", "offlineOdds": "83.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "44", "name": "二字定位", "code": "EZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "百个", "plays": [ { "id": "144009", "name": "百个", "alias": null, "rebate": "0.0000", "code": "BGDW", "played_groupid": "44", "odds": "83.0000", "offlineOdds": "83.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] }, { "id": "44", "name": "二字定位", "code": "EZDW", "isShow": "1", "enable": "1", "isBan": "0", "from_id": "0", "alias": "十个", "plays": [ { "id": "144010", "name": "十个", "alias": null, "rebate": "0.0000", "code": "SGDW", "played_groupid": "44", "odds": "83.0000", "offlineOdds": "83.0000", "minMoney": "1", "maxMoney": "500000", "maxTurnMoney": "1000000", "isBan": "0", "enable": "1", "from_id": "0" } ] } ] }')

const EZDWContainer = ({setProps}) => {
  // const { currentPlayOdd, } = UGStore.globalProps.BettingReducer;
  //Todo arc
  const currentPlayOdd = EZDW_DATA;
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
                      <Text style={[_styles.tab, {
                        backgroundColor: currentFilter == item ? "#e6e6e6" : "#dbdbdb",
                      }]}>{item}</Text>
                    </TouchableWithoutFeedback>
                  }}/>
      </View>
      {
        [0, 1].map(((value, index) => {
          return <View>
            <Text style={_styles.ball_title}>{currentFilter.slice(index, index + 1) + '定位'}</Text>
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
          </View>
        }))
      }
    </ScrollView>
  )
}

const itemSize = scale(60)

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
      borderColor: '#444',
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
export default EZDWContainer
