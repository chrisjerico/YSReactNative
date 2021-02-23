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
import { UGText } from '../../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

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
      {
        [0, 1].map(((value, index) => {
          return <View>
            <UGText style={BALL_STYLES.ball_title}>{currentFilter.slice(index, index + 1) + '定位'}</UGText>
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
  )
}

export default EZDWContainer
