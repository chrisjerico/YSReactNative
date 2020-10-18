import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import UGProgressCircle from '../../widget/progress/UGProgressCircle'

const ProgressCircle = () => (
  <View style={styles.container}>
    <UGProgressCircle />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default memo(ProgressCircle)
