import * as React from 'react'
import { View } from 'react-native'
import { MonthlyBonus } from '../MonthlyBonus'
import { RecommendLoveView } from './RecommendLoveView'
import { RecommendMustPlayView } from './RecommendMustPlayView'
import { List } from '../../../../../../public/network/Model/HomeGamesModel'

export const RecommendTabView = ({ list, onPress }: { list: List[]; onPress: (list: List) => void }) => {
  return (
    <View style={{ paddingHorizontal: 8, borderTopColor: '#c7c7c7', borderTopWidth: 1 }}>
      <View style={{ paddingTop: 8 }}>
        <RecommendMustPlayView onPress={onPress} list={list.slice(0, 3)} />
      </View>
      <MonthlyBonus />
      <RecommendLoveView onPress={onPress} list={list.slice(3, list.length)} />
    </View>
  )
}
