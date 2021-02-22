import React, { memo } from 'react'
import { StyleProp, TextStyle, Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import useRandomString from '../../hooks/useRandomString'
import MaskedView from '@react-native-community/masked-view'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface RandomTextComponentProps {
  style?: StyleProp<TextStyle>
}

const GradientText = (props) => (
  <MaskedView maskElement={<UGText {...props} />}>
    <LinearGradient colors={['#f00', '#0f0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
      <UGText {...props} style={[props.style, { opacity: 0 }]} />
    </LinearGradient>
  </MaskedView>
)

const RandomTextComponent = ({ style }: RandomTextComponentProps) => {
  const value = useRandomString('200000000', 2000000000, 2999999999)

  return <GradientText style={style}>HelloAAAAA</GradientText>
  // return (
  //   <>
  //     <UGText style={style}>{value}</UGText>
  //     <LinearGradient
  //       start={{ x: 0.0, y: 0.0 }}
  //       end={{ x: 0.0, y: 1.0 }}
  //       locations={[0.0, 1.0]}
  //       colors={['#ffffff40', '#fffffff5']} //<-- last 2 chars from color control the opacity
  //       // useViewFrame={false}
  //       style={styles.gradient}
  //     />
  //   </>
  // )
}

// const styles = StyleSheet.create({
//   text: {
//     color: 'black',
//     fontSize: 14,
//   },
//   gradient: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// })

export default memo(RandomTextComponent)
