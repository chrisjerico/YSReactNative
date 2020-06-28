import React from 'react'
import { View, StyleSheet } from 'react-native'
import UGProgressCircle from '../public/widget/progress/UGProgressCircle'

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

export default ProgressCircle
