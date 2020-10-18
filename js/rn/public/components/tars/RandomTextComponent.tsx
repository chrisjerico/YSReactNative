import React, { memo } from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import useRandomString from '../../hooks/useRandomString'

interface RandomTextComponentProps {
  style?: StyleProp<TextStyle>
}
const RandomTextComponent = ({ style }: RandomTextComponentProps) => {
  const value = useRandomString('200000000', 2000000000, 2999999999)
  return <Text style={style}>{value}</Text>
}

export default memo(RandomTextComponent)
