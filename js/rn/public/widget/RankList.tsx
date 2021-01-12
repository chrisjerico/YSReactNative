import {View, Animated, Text, Image, TextStyle} from "react-native"
import {RankListModel} from "../network/Model/RankListModel"
import {useEffect, useState} from "react"
import * as React from 'react'
import {UGStore} from "../../redux/store/UGStore"

const RankListCP = ({ranks, width, height = 200, titleVisible = true, backgroundColor = 'white', textColor = "black", timing = 10000, titleTextStyle}:
                        { ranks: any[], width: number, height?: number, titleVisible?: boolean, backgroundColor?: string, textColor: string, timing: number, titleTextStyle?: TextStyle }) => {
  const [currentY] = useState(new Animated.Value(height))
  const {rankingListSwitch} = UGStore.globalProps.sysConf;
  useEffect(() => {
    const value = Animated.loop(
        Animated.timing(currentY, {
          toValue: -1 *  (ranks?.length + 5) ?? 0,
          duration: timing,
          useNativeDriver: true
        })
    )
    if (ranks?.length > 0) {
      value.start()
    }
    return (() => {
      value.stop()
    })
  }, [ranks])
  if (rankingListSwitch == 0)
    return null
  return (
      <>
        <View style={{flexDirection: 'column'}}>
          {titleVisible && <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
            <Image style={{width: 15, height: 15, tintColor: 'white', marginRight: 5}}
                   source={{uri: "outline_analytics_black_18dp"}}/>
            <Text style={{
              color: textColor,
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: -7, ...titleTextStyle
            }}>投注排行榜</Text>
          </View>}
          <View style={{backgroundColor: backgroundColor, alignSelf: 'center', borderRadius: 8}}>
            {ranks?.length > 0 ?
                <View style={{flexDirection: 'row', width: width, alignSelf: 'center',}}>

                  <Text style={{
                    flex: 1,
                    color: textColor,
                    textAlign: "center",
                    paddingVertical: 6,
                    fontWeight: "bold",

                  }}>用户名称</Text>
                  <Text style={{
                    flex: 1,
                    color: textColor,
                    textAlign: "center",
                    paddingVertical: 6,
                    fontWeight: "bold"
                  }}>游戏名称</Text>
                  <Text style={{
                    flex: 1,
                    color: textColor,
                    textAlign: "center",
                    paddingVertical: 6,
                    fontWeight: "bold"
                  }}>中奖金额</Text>
                </View> : null}
            <View style={{width: width, height: height, overflow: "hidden"}}>
              <Animated.View style={{
                transform: [{
                  translateY: currentY,
                }]
              }}>
              {ranks?.map && ranks?.map((item, index) => {
                  return <View key={item.coin + index} style={{flexDirection: 'row'}}>
                    <Text style={{
                      flex: 1,
                      color: textColor,
                      textAlign: "center",
                      paddingVertical: 6,
                      fontWeight: "bold",
                      marginRight: 10
                    }}>{item.username}</Text>
                    <Text style={{
                      flex: 1,
                      color: textColor,
                      textAlign: "center",
                      paddingVertical: 6,
                      fontWeight: "bold"
                    }}>{item.type}</Text>
                    <Text style={{
                      flex: 1,
                      color: textColor,
                      textAlign: "center",
                      paddingVertical: 6,
                      fontWeight: "bold"
                    }}>{item.coin}</Text></View>
                })}
              </Animated.View>
            </View>
          </View>
        </View>

      </>
  )
}
export default RankListCP
