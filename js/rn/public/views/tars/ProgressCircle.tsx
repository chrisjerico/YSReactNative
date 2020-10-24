import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Progress from 'react-native-progress';
import {Skin1} from '../../theme/UGSkinManagers';

const ProgressCircle = () => (
  <View style={styles.container}>
     <Progress.Circle borderWidth={4} size={45} indeterminate={true} borderColor={Skin1.progressColor}/>
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
