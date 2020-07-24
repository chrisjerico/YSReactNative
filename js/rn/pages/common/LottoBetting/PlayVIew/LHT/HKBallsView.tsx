import { View, Text } from "react-native"
import React from 'react'
import { PlayGroup } from "../../../../../public/network/Model/PlayOddDataModel"
import { useDimensions } from "@react-native-community/hooks"
import TMItem from "./balls/TMItem"
import { useLottoContext } from "../../LottoContext"

const itemSize = 40
const HKBallsView = ({ data }: { data: PlayGroup }) => {
  const { width } = useDimensions().screen
  const { currentOddsData } = useLottoContext()
  return (
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
      <Text style={{ textAlign: 'center', marginVertical: 10, width: "100%" }}>{data.alias}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          data.plays.map((data, index) => {
            if (index < 45) {
              return <View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{ width: ((width / 4 * 3) - 5) / 3, borderWidth: 1, borderColor: '#444', height: itemSize }}>
                <TMItem data={data} />
              </View>
            } else {
              return <View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{ width: ((width / 4 * 3) - 5) / 2, borderWidth: 1, borderColor: '#444', height: itemSize }}>
                <TMItem data={data} />
              </View>
            }
          })
        }
      </View>
    </View>
  )
}
export default HKBallsView