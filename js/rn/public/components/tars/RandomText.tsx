import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import useRandomString from '../../hooks/useRandomString'

interface RandomTextProps {
  style?: StyleProp<TextStyle>
}
const RandomText = ({ style }: RandomTextProps) => {
  const value = useRandomString('200000000', 2000000000, 2999999999)
  return <Text style={style}>{value}</Text>
}

export default RandomText
