import { View, Text } from "react-native"
import React from 'react'
import { PlayGroup } from "../../../../../public/network/Model/PlayOddDataModel"
import { useDimensions } from "@react-native-community/hooks"
import { useLottoContext } from "../../LottoContext"
import LMItem from "./balls/LMItem"

const itemSize = 40
const HKTMTItemView = ({ data }: { data: PlayGroup }) => {
  const { width } = useDimensions().screen
  const { currentOddsData } = useLottoContext()
  return (
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
      <Text style={{ textAlign: 'center', marginVertical: 10, width: "100%" }}>{data.alias}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          data.plays.map((data, index) => {
            if (index > 1) {
              return <View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{ width: ((width / 4 * 3) - 5) / 3, borderWidth: 1, borderColor: '#444', height: itemSize }}>
                <LMItem fix={1} data={data} />
              </View>
            } else {
              return <View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{ width: ((width / 4 * 3) - 5) / 2, borderWidth: 1, borderColor: '#444', height: itemSize }}>
                <LMItem fix={1} data={data} />
              </View>
            }
          })
        }
      </View>
    </View>
  )
}
export default HKTMTItemView