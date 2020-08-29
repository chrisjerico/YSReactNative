import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from '../../../public/tools/Scale'

const MineHeader = ({ showBackBtn, onPressGoBack }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {showBackBtn ? (
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <AntDesign
            name={'left'}
            color={'#ffffff'}
            size={scale(25)}
            onPress={onPressGoBack}
          />
        </View>
      ) : (
          <View style={{ flex: 1 }} />
        )}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.headerTitle}>{'会员中心'}</Text>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
})

export default MineHeader