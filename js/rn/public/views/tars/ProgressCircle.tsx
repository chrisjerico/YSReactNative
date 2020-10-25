import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Progress from 'react-native-progress'
import { Skin1 } from '../../theme/UGSkinManagers'

const ProgressCircle = () => (
  <View style={[styles.container, { backgroundColor: Skin1?.progress?.bgColor }]}>
    <Progress.Circle borderWidth={4} size={45} indeterminate={true} borderColor={Skin1?.progress?.tintColor} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default memo(ProgressCircle)
