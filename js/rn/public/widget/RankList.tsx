import { View, Animated, Text } from "react-native"
import { RankListModel } from "../network/Model/RankListModel"
import { useEffect, useState } from "react"
import React from 'react'
import { useLanguageContext } from "../context/LanguageContextProvider"
const RankListCP = ({ ranks, width, height = 200, backgroundColor = 'white', textColor = "black", timing = 10000 }: { ranks: RankListModel, width: number, height?: number, backgroundColor?: string, textColor: string, timing: number }) => {
  const [currentY] = useState(new Animated.Value(200))
  const { currcentLanguagePackage } = useLanguageContext()
  useEffect(() => {
    const value = Animated.loop(
      Animated.timing(currentY, {
        toValue: -200,
        duration: timing,
        useNativeDriver: true
      }),
      {
        iterations: 1500
      }
    )
    if (ranks?.data?.list?.length > 0) {
      value.start()
    }
    return (() => {
      value.stop()
    })
  }, [ranks])
  return (
    <>
      {ranks?.data?.list?.length > 0 ? <View style={{ flexDirection: 'row', width: width, alignSelf: 'center' }}>
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

      <View style={{ width: width, height: height, overflow: 'hidden', backgroundColor: backgroundColor, alignSelf: 'center' }}>

        <Animated.View style={{
          transform: [{
            translateY: currentY,
          }]
        }}>
          {ranks?.data?.list?.map((item, index) => {
            return <View key={item.coin + index} style={{ flexDirection: 'row' }}>
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
    </>
  )
}
export default RankListCP