import { View, Text } from "react-native"
import React from 'react'
import { PlayGroup } from "../../../../../public/network/Model/PlayOddDataModel"
import { useDimensions } from "@react-native-community/hooks"
import LMItem from "./balls/LMItem"
const itemSize = 40
const HKSBItemView = ({ data }: { data: PlayGroup }) => {
  const { width } = useDimensions().screen
  return (
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
      <Text style={{ textAlign: 'center', marginBottom: 10, marginTop: 10 }}>{data.alias}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          data.plays.map((data, index) => {
            return <View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{ width: ((width / 4 * 3) - 5) / 3, borderWidth: 1, borderColor: '#444', height: itemSize }}>
              <LMItem fix={1} data={data} />
            </View>
          })
        }
      </View>
    </View>
  )
}
export default HKSBItemView